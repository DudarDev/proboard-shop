import { ShopifyProduct, ShopifyCollection, ShopifyCartUserError, ShopifyMetafield, BoardSpecs } from '@/types/shopify';
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

/**
 * Maps a raw Shopify product node (with optional metafields) to the unified ShopifyProduct interface.
 * Safely defaults specs so catalog filtering and UI detail pages never crash.
 */
export function mapShopifyProduct(node: any): ShopifyProduct {
  if (!node) return node;

  const metafieldsList: (ShopifyMetafield | null)[] = Array.isArray(node.metafields)
    ? node.metafields
    : [];

  const getMeta = (key: string) => {
    const found = metafieldsList.find((m) => m && m.key === key);
    return found ? found.value : undefined;
  };

  const rawFlex = getMeta('flex_rating');
  let flexRating = rawFlex ? parseInt(rawFlex, 10) : undefined;
  if (isNaN(flexRating as number) || (flexRating as number) < 1 || (flexRating as number) > 10) {
    flexRating = undefined;
  }

  const rawCamber = getMeta('camber_type')?.toLowerCase();
  let camberType: 'camber' | 'rocker' | 'hybrid' | 'flat' | undefined;
  if (rawCamber && ['camber', 'rocker', 'hybrid', 'flat'].includes(rawCamber)) {
    camberType = rawCamber as any;
  } else if (node.title?.toLowerCase().includes('camber')) {
    camberType = 'camber';
  } else if (node.title?.toLowerCase().includes('rocker')) {
    camberType = 'rocker';
  }

  const ridingStyle = getMeta('riding_style');
  const terrain = getMeta('terrain') || (
    node.tags?.find((t: string) =>
      t.toLowerCase().includes('mountain') ||
      t.toLowerCase().includes('park') ||
      t.toLowerCase().includes('freeride')
    ) || 'All-Mountain / Resort'
  );

  const existingSpecs: Partial<BoardSpecs> = node.specs || {};

  const specs: BoardSpecs = {
    flex: rawFlex ? `${rawFlex}/10` : (existingSpecs.flex || '6/10'),
    flexRating: flexRating || existingSpecs.flexRating || 6,
    camberType: camberType || existingSpecs.camberType || 'camber',
    profile: existingSpecs.profile || (camberType === 'camber' ? 'Traditional Camber' : 'All-Mountain Hybrid'),
    shape: ridingStyle || existingSpecs.shape || 'Directional Twin',
    terrain: terrain || existingSpecs.terrain || 'All-Mountain / Resort',
    level: existingSpecs.level || 'Intermediate – Advanced Pro',
    gender: existingSpecs.gender || 'unisex',
    subCategory: node.productType || existingSpecs.subCategory || 'Сноуборди',
    origin: existingSpecs.origin || `${node.vendor || 'Brand'} Authorized Pro Shop`,
    warranty: existingSpecs.warranty || 'Офіційна гарантія бренду (1-2 роки)',
    waistWidth: existingSpecs.waistWidth || '250 – 256 мм',
    features: existingSpecs.features || [
      `Оригінальна продукція ${node.vendor || 'Proboard'}`,
      'Фірмове пакування виробника',
      'Офіційна гарантія та серійний номер',
      'Швидка доставка Новою Поштою по Україні (1-3 дні)'
    ],
  };

  return {
    ...node,
    specs,
  };
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
    return { ok: false, error: `Помилка з'єднання: ${err.message || 'Не вдалося підключитися'}` };
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
  // Validate merchandiseId format (must be gid://shopify/ProductVariant/...)
  const invalidItems = lines.filter(
    (l) => !l.merchandiseId || !l.merchandiseId.startsWith('gid://shopify/ProductVariant/')
  );

  if (invalidItems.length > 0) {
    return {
      userErrors: [
        {
          code: 'INVALID_MERCHANDISE_ID',
          field: ['lines'],
          message:
            'У кошику виявлено товари з Demo-режиму або некоректні ID. Будь ласка, очистіть кошик перед оформленням замовлення через реальний Shopify.',
        },
      ],
    };
  }

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
            metafields(identifiers: [
              { namespace: "custom", key: "flex_rating" },
              { namespace: "custom", key: "camber_type" },
              { namespace: "custom", key: "riding_style" },
              { namespace: "custom", key: "terrain" }
            ]) {
              key
              value
              namespace
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      products: {
        edges: { node: any }[];
      };
    }>({ query, credentials });

    if (data?.products?.edges && data.products.edges.length > 0) {
      return data.products.edges.map((edge) => mapShopifyProduct(edge.node));
    }
  } catch (err) {
    if (credentials?.domain && credentials?.storefrontToken) {
      throw err;
    }
  }

  return FALLBACK_PRODUCTS.map(mapShopifyProduct);
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
        metafields(identifiers: [
          { namespace: "custom", key: "flex_rating" },
          { namespace: "custom", key: "camber_type" },
          { namespace: "custom", key: "riding_style" },
          { namespace: "custom", key: "terrain" }
        ]) {
          key
          value
          namespace
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ product: any | null }>({
      query,
      variables: { handle },
      credentials,
    });

    if (data?.product) {
      return mapShopifyProduct(data.product);
    }
  } catch (err) {
    if (credentials?.domain && credentials?.storefrontToken) {
      throw err;
    }
  }

  const found = FALLBACK_PRODUCTS.find((p) => p.handle === handle);
  return found ? mapShopifyProduct(found) : null;
}

export async function getRelatedProducts(currentHandle: string, credentials?: ShopifyCredentials): Promise<ShopifyProduct[]> {
  const all = await getShopifyProducts(credentials);
  return all.filter((p) => p.handle !== currentHandle).slice(0, 4);
}
