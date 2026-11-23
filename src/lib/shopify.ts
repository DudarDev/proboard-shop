import { ShopifyProduct, ShopifyCollection, ShopifyCartUserError } from '@/types/shopify';
import {
  FALLBACK_PRODUCTS,
  FALLBACK_BRANDS,
  FALLBACK_COLLECTIONS,
} from '@/data/mockProducts';

export { FALLBACK_PRODUCTS, FALLBACK_BRANDS, FALLBACK_COLLECTIONS };

export const SHOPIFY_API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2026-10';

export interface ShopifyCredentials {
  domain?: string;
  storefrontToken?: string;
}

export async function shopifyFetch<T>({
  query,
  variables = {},
  credentials,
}: {
  query: string;
  variables?: Record<string, unknown>;
  credentials?: ShopifyCredentials;
}): Promise<T | null> {
  const domain = credentials?.domain || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = credentials?.storefrontToken || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  // Only connect to remote Shopify if domain and token are provided
  if (!domain || !token) {
    return null;
  }

  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const endpoint = `https://${cleanDomain}/api/${SHOPIFY_API_VERSION}/graphql.json`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorMsg = `Shopify API error HTTP ${res.status}: ${res.statusText}`;
      console.warn(errorMsg);
      if (credentials?.domain && credentials?.storefrontToken) {
        throw new Error(errorMsg);
      }
      return null;
    }

    const json = await res.json();
    if (json.errors && json.errors.length > 0) {
      const gqlErrors = json.errors.map((e: any) => e.message).join('; ');
      console.warn('Shopify GraphQL errors:', gqlErrors);
      if (credentials?.domain && credentials?.storefrontToken) {
        throw new Error(`Shopify GraphQL: ${gqlErrors}`);
      }
      return null;
    }

    return json.data as T;
  } catch (error: any) {
    console.warn('Shopify fetch network/api error:', error?.message || error);
    if (credentials?.domain && credentials?.storefrontToken) {
      throw error;
    }
    return null;
  }
}

/**
 * Validates domain and Storefront Access Token against live Shopify API
 */
export async function testShopifyConnection(credentials: ShopifyCredentials): Promise<{
  ok: boolean;
  error?: string;
  shopName?: string;
}> {
  const domain = credentials.domain?.trim();
  const token = credentials.storefrontToken?.trim();

  if (!domain) {
    return { ok: false, error: 'Домен магазину є обов’язковим' };
  }
  if (!token) {
    return { ok: false, error: 'Storefront Access Token є обов’язковим' };
  }

  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const endpoint = `https://${cleanDomain}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  const query = `
    query testShopConnection {
      shop {
        name
        description
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        return { ok: false, error: `Помилка авторизації (${res.status}): недійсний Storefront Access Token` };
      }
      if (res.status === 404) {
        return { ok: false, error: `Магазин не знайдено (${res.status}): перевірте правильність домену ${cleanDomain}` };
      }
      return { ok: false, error: `Shopify повернув HTTP статус ${res.status} (${res.statusText})` };
    }

    const json = await res.json();
    if (json.errors && json.errors.length > 0) {
      const msg = json.errors.map((e: any) => e.message).join('; ');
      return { ok: false, error: `Помилка GraphQL: ${msg}` };
    }

    const shopName = json.data?.shop?.name || cleanDomain;
    return { ok: true, shopName };
  } catch (err: any) {
    return { ok: false, error: `Помилка з'єднання: ${err.message || 'Не вдалося зв’язатися із сервером'}` };
  }
}

/**
 * Creates a Shopify Cart via Storefront cartCreate mutation and returns checkout URL
 */
export async function createShopifyCart(
  lines: { merchandiseId: string; quantity: number }[],
  credentials?: ShopifyCredentials
): Promise<{
  cartId?: string;
  checkoutUrl?: string;
  userErrors?: ShopifyCartUserError[];
}> {
  const mutation = `
    mutation createCart($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: lines.map((l) => ({
        merchandiseId: l.merchandiseId,
        quantity: l.quantity,
      })),
    },
  };

  try {
    const data = await shopifyFetch<{
      cartCreate: {
        cart: {
          id: string;
          checkoutUrl: string;
          totalQuantity: number;
        } | null;
        userErrors: ShopifyCartUserError[];
      };
    }>({
      query: mutation,
      variables,
      credentials,
    });

    if (data?.cartCreate?.userErrors && data.cartCreate.userErrors.length > 0) {
      return {
        userErrors: data.cartCreate.userErrors,
      };
    }

    if (data?.cartCreate?.cart) {
      return {
        cartId: data.cartCreate.cart.id,
        checkoutUrl: data.cartCreate.cart.checkoutUrl,
        userErrors: [],
      };
    }

    return {
      userErrors: [{ field: ['cart'], message: 'Не вдалося створити кошик у Shopify API' }],
    };
  } catch (err: any) {
    return {
      userErrors: [{ field: ['cart'], message: err?.message || 'Помилка мережі при створенні кошика' }],
    };
  }
}

export async function getShopifyProducts(credentials?: ShopifyCredentials): Promise<ShopifyProduct[]> {
  const query = `
    query getProducts {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            availableForSale
            vendor
            productType
            tags
            featuredImage {
              id
              url
              altText
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      products: {
        edges: { node: ShopifyProduct }[];
      };
    }>({ query, credentials });

    if (data?.products?.edges && data.products.edges.length > 0) {
      return data.products.edges.map((edge) => edge.node);
    }
  } catch (err) {
    if (credentials?.domain && credentials?.storefrontToken) {
      throw err;
    }
  }

  return FALLBACK_PRODUCTS;
}

export async function getProductByHandle(handle: string, credentials?: ShopifyCredentials): Promise<ShopifyProduct | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        availableForSale
        vendor
        productType
        tags
        featuredImage {
          id
          url
          altText
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
      query,
      variables: { handle },
      credentials,
    });

    if (data?.product) {
      return data.product;
    }
  } catch (err) {
    if (credentials?.domain && credentials?.storefrontToken) {
      throw err;
    }
  }

  const found = FALLBACK_PRODUCTS.find((p) => p.handle === handle);
  return found || null;
}

export async function getRelatedProducts(currentHandle: string, credentials?: ShopifyCredentials): Promise<ShopifyProduct[]> {
  const all = await getShopifyProducts(credentials);
  return all.filter((p) => p.handle !== currentHandle).slice(0, 4);
}
