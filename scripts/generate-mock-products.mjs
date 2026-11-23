import fs from 'fs';

const curated = JSON.parse(fs.readFileSync('scripts/tactics-curated-final.json', 'utf8'));

const products = curated.map((item, idx) => {
  const idNum = idx + 1;
  const isSnowboard = item.type === 'Сноуборди';
  const isBoot = item.type === 'Взуття';
  const isBinding = item.type === 'Кріплення';
  const isSkate = item.type === 'Скейтборди';
  
  const variantSizes = isSnowboard 
    ? ['154', '156', '158', '160W'] 
    : isBoot 
    ? ['41 EU (8.5 US)', '42 EU (9 US)', '43 EU (10 US)', '44 EU (11 US)']
    : isBinding 
    ? ['M (EU 40-43)', 'L (EU 43-46)']
    : isSkate
    ? ['8.0"', '8.25"', '8.5"']
    : ['One Size (Універсальний)'];

  const variants = variantSizes.map((size, vIdx) => ({
    node: {
      id: `gid://shopify/ProductVariant/${idNum * 100 + vIdx + 1}`,
      title: size,
      availableForSale: true,
      price: { amount: String(item.price), currencyCode: 'USD' },
      compareAtPrice: { amount: String(item.compareAtPrice), currencyCode: 'USD' },
      selectedOptions: [{ name: 'Розмір / Опція', value: size }],
    }
  }));

  return {
    id: `gid://shopify/Product/${idNum}`,
    title: item.title,
    handle: item.handle,
    description: `${item.title} — 100% оригінальне спорядження від офіційного дистриб'ютора. Перевірено про-райдерами та відібрано з каталогу Tactics Boardshop. Поставляється в фірмовому пакуванні виробника ${item.vendor} з повною офіційною гарантією.`,
    availableForSale: true,
    vendor: item.vendor,
    productType: item.type,
    isStaffPick: idx < 4 || idx === 9 || idx === 13,
    rating: Number((4.7 + (idx % 4) * 0.1).toFixed(1)),
    reviewCount: 35 + (idx * 11) % 90,
    featuredImage: {
      url: item.localImage,
      altText: item.title,
    },
    images: {
      edges: [
        {
          node: {
            url: item.localImage,
            altText: item.title,
          },
        },
        {
          node: {
            url: item.tacticsImage,
            altText: `${item.title} alternate view`,
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: String(item.price), currencyCode: 'USD' },
      maxVariantPrice: { amount: String(item.price), currencyCode: 'USD' },
    },
    compareAtPrice: { amount: String(item.compareAtPrice), currencyCode: 'USD' },
    tags: [item.type, item.vendor, 'Tactics Gear', '2026/2027', item.camberType === 'camber' ? 'Класичний кембер' : 'Гібрид / Рокер'],
    specs: {
      flex: item.flex,
      flexRating: item.flexNum,
      profile: item.profile,
      camberType: item.camberType,
      shape: item.shape,
      terrain: item.terrain,
      level: 'Intermediate – Advanced Pro',
      gender: 'unisex',
      subCategory: item.type,
      origin: `${item.vendor} Authorized Pro Shop`,
      warranty: 'Офіційна гарантія бренду (1-2 роки)',
      waistWidth: isSnowboard ? '250 – 256 мм' : 'N/A',
      features: [
        `Преміальні матеріали ${item.vendor}`,
        'Висока зносостійкість при інтенсивному катанні',
        'Оригінальний серійний номер та заводське пакування',
        'Швидка доставка по Україні Новою Поштою (1-3 дні)'
      ],
    },
    variants: {
      edges: variants,
    },
  };
});

const brands = [...new Set(products.map(p => p.vendor))];

const collections = [
  { id: 'all', title: 'Все спорядження', handle: 'all' },
  { id: 'Сноуборди', title: 'Сноуборди', handle: 'snowboards' },
  { id: 'Взуття', title: 'Черевики (Boots)', handle: 'boots' },
  { id: 'Кріплення', title: 'Кріплення (Bindings)', handle: 'bindings' },
  { id: 'Оптика', title: 'Оптика & Маски', handle: 'optics' },
  { id: 'Захист', title: 'Шоломи & Захист', handle: 'helmets' },
  { id: 'Одяг', title: 'Куртки & Одяг', handle: 'apparel' },
  { id: 'Скейтборди', title: 'Скейтборди', handle: 'skate' },
  { id: 'Аксесуари', title: 'Догляд & Сервіс', handle: 'accessories' },
];

const fileContent = `import { ShopifyProduct, ShopifyCollection } from '@/types/shopify';

export const FALLBACK_PRODUCTS: ShopifyProduct[] = ${JSON.stringify(products, null, 2)};

export const FALLBACK_BRANDS: string[] = ${JSON.stringify(brands, null, 2)};

export const TACTICS_BRANDS = FALLBACK_BRANDS;

export const FALLBACK_COLLECTIONS: ShopifyCollection[] = ${JSON.stringify(collections, null, 2)};
`;

fs.writeFileSync('src/data/mockProducts.ts', fileContent, 'utf8');
console.log(`Generated src/data/mockProducts.ts with ${products.length} authentic Tactics products!`);
