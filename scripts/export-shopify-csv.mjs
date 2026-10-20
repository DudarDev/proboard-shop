import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standard Shopify CSV Header
const CSV_HEADERS = [
  'Handle',
  'Title',
  'Body (HTML)',
  'Vendor',
  'Product Category',
  'Type',
  'Tags',
  'Published',
  'Option1 Name',
  'Option1 Value',
  'Option2 Name',
  'Option2 Value',
  'Variant SKU',
  'Variant Grams',
  'Variant Inventory Tracker',
  'Variant Inventory Qty',
  'Variant Inventory Policy',
  'Variant Fulfillment Service',
  'Variant Price',
  'Variant Compare At Price',
  'Variant Requires Shipping',
  'Variant Taxable',
  'Image Src',
  'Image Position',
  'Status'
];

const PRODUCTS_DATA = [
  {
    handle: 'minimalist-leather-backpack',
    title: 'Minimalist Leather Backpack',
    body: '<p>Преміальна італійська зерниста шкіра. Вміщує ноутбук до 16 дюймів, водостійка підкладка, анатомічні лямки.</p>',
    vendor: 'Nordic Craft',
    type: 'Рюкзаки',
    tags: 'Аксесуари, Шкіра, Хіт',
    variants: [
      { option1: 'Black / One Size', price: '189.00', sku: 'BP-BLK-01', qty: 15 },
      { option1: 'Cognac Brown / One Size', price: '199.00', sku: 'BP-BRN-02', qty: 8 }
    ],
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'
  },
  {
    handle: 'oversized-organic-cotton-hoodie',
    title: 'Oversized Organic Cotton Hoodie',
    body: '<p>100% органічна бавовна щільністю 460 г/м². Подвійний капюшон, м’який начіс всередині.</p>',
    vendor: 'Studio Wear',
    type: 'Худі',
    tags: 'Одяг, Органіка, New',
    variants: [
      { option1: 'S / Sand', price: '89.00', sku: 'HD-SND-S', qty: 20 },
      { option1: 'M / Sand', price: '89.00', sku: 'HD-SND-M', qty: 25 },
      { option1: 'L / Charcoal', price: '89.00', sku: 'HD-CHR-L', qty: 18 }
    ],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop'
  },
  {
    handle: 'wireless-anc-headphones',
    title: 'Wireless Active Noise-Cancelling Headphones',
    body: '<p>Просторовий звук Hi-Res Audio, 40 годин автономної роботи з активним шумозаглушенням.</p>',
    vendor: 'Aura Sound',
    type: 'Навушники',
    tags: 'Гаджети, Аудіо, Топ',
    variants: [
      { option1: 'Matte Black', price: '249.00', sku: 'HP-ANC-BLK', qty: 12 },
      { option1: 'Silver White', price: '249.00', sku: 'HP-ANC-SLV', qty: 7 }
    ],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    handle: 'ceramic-pour-over-coffee-maker',
    title: 'Ceramic Pour-Over Coffee Maker',
    body: '<p>Крафтова кераміка ручної роботи для фільтр-кави методом пуровер. Підставка з горіхового дерева.</p>',
    vendor: 'Ceramica Studio',
    type: 'Посуд',
    tags: 'Дім, Кава, Ручна робота',
    variants: [
      { option1: 'Stone Grey', price: '54.00', sku: 'CF-STR-GRY', qty: 30 },
      { option1: 'Terracotta', price: '54.00', sku: 'CF-STR-TER', qty: 22 }
    ],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop'
  },
  {
    handle: 'titanium-chronograph-watch',
    title: 'Titanium Chronograph Watch',
    body: '<p>Титановий корпус аерокосмічного класу 42 мм, сапфірове скло, водозахист 10 ATM.</p>',
    vendor: 'Chronos Lab',
    type: 'Годинники',
    tags: 'Аксесуари, Годинники, Преміум',
    variants: [
      { option1: 'Brushed Titanium / Black Dial', price: '320.00', sku: 'WT-TI-BLK', qty: 5 }
    ],
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    handle: 'merino-wool-beanie',
    title: 'Merino Wool Beanie',
    body: '<p>100% ультратонка мериносова вовна без колючості. Природна терморегуляція та комфорт.</p>',
    vendor: 'Nordic Craft',
    type: 'Головні убори',
    tags: 'Одяг, Вовна',
    variants: [
      { option1: 'Olive Green', price: '38.00', sku: 'BN-MRN-OLV', qty: 40 },
      { option1: 'Deep Navy', price: '38.00', sku: 'BN-MRN-NVY', qty: 35 }
    ],
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop'
  }
];

function escapeCsv(val) {
  if (val === undefined || val === null) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const rows = [CSV_HEADERS.join(',')];

for (const prod of PRODUCTS_DATA) {
  let isFirst = true;
  for (const v of prod.variants) {
    const row = [
      escapeCsv(prod.handle),
      escapeCsv(isFirst ? prod.title : ''),
      escapeCsv(isFirst ? prod.body : ''),
      escapeCsv(isFirst ? prod.vendor : ''),
      escapeCsv(''),
      escapeCsv(isFirst ? prod.type : ''),
      escapeCsv(isFirst ? prod.tags : ''),
      'TRUE',
      'Size / Color',
      escapeCsv(v.option1),
      '',
      '',
      escapeCsv(v.sku),
      '500',
      'shopify',
      escapeCsv(v.qty),
      'deny',
      'manual',
      escapeCsv(v.price),
      '',
      'TRUE',
      'TRUE',
      escapeCsv(isFirst ? prod.image : ''),
      isFirst ? '1' : '',
      'active'
    ];
    rows.push(row.join(','));
    isFirst = false;
  }
}

const outputPath = path.join(process.cwd(), 'shopify-products-import.csv');
fs.writeFileSync(outputPath, rows.join('\n'), 'utf8');
console.log(`✅ CSV-файл для імпорту в Shopify успішно створено: ${outputPath}`);
