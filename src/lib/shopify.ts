import { ShopifyProduct, ShopifyCollection } from '@/types/shopify';

export const FALLBACK_PRODUCTS: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/1',
    title: 'Minimalist Leather Backpack',
    handle: 'minimalist-leather-backpack',
    description: 'Изготовлен из премиальной итальянской зернистой кожи. Вмещает ноутбук до 16 дюймов, водоотталкивающая подкладка, удобные анатомические лямки и потайной карман для ценных вещей.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
      altText: 'Minimalist Leather Backpack',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
            altText: 'Leather backpack front',
          },
        },
        {
          node: {
            url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
            altText: 'Backpack detail',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '189.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '189.00', currencyCode: 'USD' },
    },
    tags: ['Аксессуары', 'Кожа', 'Хит продаж'],
    productType: 'Рюкзаки',
    vendor: 'Nordic Craft',
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/101',
            title: 'Black / One Size',
            availableForSale: true,
            price: { amount: '189.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/102',
            title: 'Cognac Brown / One Size',
            availableForSale: true,
            price: { amount: '199.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/2',
    title: 'Oversized Organic Cotton Hoodie',
    handle: 'oversized-organic-cotton-hoodie',
    description: 'Плотный 100% органический хлопок плотностью 460 г/м². Идеальная свободная посадка, двойной капюшон без шнурков, мягкий начес внутри для максимального комфорта каждый день.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
      altText: 'Organic Cotton Hoodie',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
            altText: 'Hoodie front view',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '89.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '89.00', currencyCode: 'USD' },
    },
    tags: ['Одежда', 'Органика', 'New'],
    productType: 'Худи',
    vendor: 'Studio Wear',
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/201',
            title: 'S / Sand',
            availableForSale: true,
            price: { amount: '89.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/202',
            title: 'M / Sand',
            availableForSale: true,
            price: { amount: '89.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/203',
            title: 'L / Charcoal',
            availableForSale: true,
            price: { amount: '89.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/3',
    title: 'Wireless Active Noise-Cancelling Headphones',
    handle: 'wireless-anc-headphones',
    description: 'Пространственный звук Hi-Res Audio, 40 часов автономной работы с включенным шумоподавлением. Амбушюры с эффектом памяти и быстрая зарядка за 15 минут на 5 часов воспроизведения.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      altText: 'Wireless ANC Headphones',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
            altText: 'Headphones angled',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '249.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '249.00', currencyCode: 'USD' },
    },
    tags: ['Гаджеты', 'Аудио', 'Хит'],
    productType: 'Наушники',
    vendor: 'Aura Sound',
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/301',
            title: 'Matte Black',
            availableForSale: true,
            price: { amount: '249.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/302',
            title: 'Silver White',
            availableForSale: true,
            price: { amount: '249.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/4',
    title: 'Ceramic Pour-Over Coffee Maker',
    handle: 'ceramic-pour-over-coffee-maker',
    description: 'Ручная керамика ручной работы для приготовления спешелти кофе методом пуровер. Оптимизированные желобки для равномерной экстракции и термостойкая подставка из орехового дерева.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
      altText: 'Ceramic Pour-Over Coffee Maker',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
            altText: 'Coffee maker setup',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '54.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '54.00', currencyCode: 'USD' },
    },
    tags: ['Дом', 'Кофе', 'Ручная работа'],
    productType: 'Посуда',
    vendor: 'Ceramica Studio',
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/401',
            title: 'Stone Grey',
            availableForSale: true,
            price: { amount: '54.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/402',
            title: 'Terracotta',
            availableForSale: true,
            price: { amount: '54.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/5',
    title: 'Titanium Chronograph Watch',
    handle: 'titanium-chronograph-watch',
    description: 'Легкий титановый корпус аэрокосмического класса 42 мм, сапфировое стекло с антибликовым покрытием, водонепроницаемость 10 ATM и точный кварцевый механизм.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop',
      altText: 'Titanium Chronograph Watch',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop',
            altText: 'Watch macro shot',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '320.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '320.00', currencyCode: 'USD' },
    },
    tags: ['Аксессуары', 'Часы', 'Премиум'],
    productType: 'Часы',
    vendor: 'Chronos Lab',
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/501',
            title: 'Brushed Titanium / Black Dial',
            availableForSale: true,
            price: { amount: '320.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/6',
    title: 'Merino Wool Beanie',
    handle: 'merino-wool-beanie',
    description: '100% ультратонкая мериносовая шерсть без колкости. Отличная терморегуляция: согревает в мороз и дышит в тепле. Рельефная вязка в рубчик и плотный отворот.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop',
      altText: 'Merino Wool Beanie',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop',
            altText: 'Beanie knit view',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '38.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '38.00', currencyCode: 'USD' },
    },
    tags: ['Одежда', 'Шерсть'],
    productType: 'Головные уборы',
    vendor: 'Nordic Craft',
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/601',
            title: 'Olive Green',
            availableForSale: true,
            price: { amount: '38.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/602',
            title: 'Deep Navy',
            availableForSale: true,
            price: { amount: '38.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
];

export const FALLBACK_COLLECTIONS: ShopifyCollection[] = [
  { id: 'all', title: 'Все товары', handle: 'all' },
  { id: 'clothing', title: 'Одежда', handle: 'clothing' },
  { id: 'accessories', title: 'Аксессуары', handle: 'accessories' },
  { id: 'gadgets', title: 'Гаджеты', handle: 'gadgets' },
  { id: 'home', title: 'Дом и декор', handle: 'home' },
];

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

  let endpoint = 'https://mock.shop/api';
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (domain && token) {
    endpoint = `https://${domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}/api/2024-01/graphql.json`;
    headers['X-Shopify-Storefront-Access-Token'] = token;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`Shopify API responded with status ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.warn('Shopify GraphQL errors:', json.errors);
      return null;
    }

    return json.data as T;
  } catch (error) {
    console.warn('Shopify fetch network error, using fallback:', error);
    return null;
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

  const data = await shopifyFetch<{
    products: {
      edges: { node: ShopifyProduct }[];
    };
  }>({ query, credentials });

  if (data?.products?.edges && data.products.edges.length > 0) {
    return data.products.edges.map((edge) => edge.node);
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

  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query,
    variables: { handle },
    credentials,
  });

  if (data?.product) {
    return data.product;
  }

  // Fallback match
  const found = FALLBACK_PRODUCTS.find((p) => p.handle === handle);
  return found || null;
}

export async function getRelatedProducts(currentHandle: string, credentials?: ShopifyCredentials): Promise<ShopifyProduct[]> {
  const all = await getShopifyProducts(credentials);
  return all.filter((p) => p.handle !== currentHandle).slice(0, 3);
}

