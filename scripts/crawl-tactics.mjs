import { execSync } from 'child_process';
import fs from 'fs';

const categories = [
  { url: 'https://www.tactics.com/snowboards', type: 'Сноуборди' },
  { url: 'https://www.tactics.com/snowboard-boots', type: 'Взуття' },
  { url: 'https://www.tactics.com/snowboard-bindings', type: 'Кріплення' },
  { url: 'https://www.tactics.com/snowboard-goggles', type: 'Оптика' },
  { url: 'https://www.tactics.com/snowboard-helmets', type: 'Захист' },
  { url: 'https://www.tactics.com/mens-snowboard-jackets', type: 'Одяг' },
  { url: 'https://www.tactics.com/skateboards', type: 'Скейтборди' },
  { url: 'https://www.tactics.com/snowboard-accessories', type: 'Аксесуари' },
];

function fetchWithCurl(url) {
  try {
    const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${url}"`;
    return execSync(cmd, { maxBuffer: 10 * 1024 * 1024, encoding: 'utf8' });
  } catch (e) {
    console.error(`Curl error for ${url}:`, e.message);
    return '';
  }
}

function crawlCategory(cat) {
  const html = fetchWithCurl(cat.url);
  if (!html) return [];

  const items = [];
  const itemRegex = /<div class="browse-grid-item">([\s\S]*?)<\/div>/g;
  let match;
  while ((match = itemRegex.exec(html)) !== null) {
    const block = match[1];

    const linkMatch = block.match(/<a href="([^"]+)">/);
    const imgMatch = block.match(/<img src="([^"]+)"/);
    const altMatch = block.match(/alt="([^"]+)"/);
    const brandMatch = block.match(/class="browse-grid-item-brand">([^<]+)<\/span>/);
    const priceMatch = block.match(/class="browse-grid-item-(?:sale-)?price">\$([0-9.]+)/);
    const originalPriceMatch =
      block.match(/<del>\$([0-9.]+)<\/del>/) ||
      block.match(/class="browse-grid-item-original-price">\$([0-9.]+)/);

    if (imgMatch && brandMatch) {
      const brand = brandMatch[1].trim();
      const alt = altMatch ? altMatch[1].trim() : '';
      const img = imgMatch[1].startsWith('http') ? imgMatch[1] : `https://www.tactics.com${imgMatch[1]}`;
      const price = priceMatch ? parseFloat(priceMatch[1]) : 299;
      const compareAt = originalPriceMatch ? parseFloat(originalPriceMatch[1]) : Math.round(price * 1.25);
      const link = linkMatch ? linkMatch[1] : '';

      let title = alt || `${brand} Gear`;
      title = title.replace(/\s+202[0-9]/, '').trim();

      items.push({
        brand,
        title,
        price,
        compareAt,
        img,
        link,
        type: cat.type,
      });
    }
  }
  return items;
}

function main() {
  const allProducts = [];
  for (const cat of categories) {
    console.log(`Crawling ${cat.type} from ${cat.url}...`);
    const items = crawlCategory(cat);
    console.log(`Found ${items.length} items for ${cat.type}`);
    allProducts.push(...items);
  }

  console.log(`Total collected: ${allProducts.length}`);
  fs.writeFileSync('scripts/tactics-crawled.json', JSON.stringify(allProducts, null, 2), 'utf8');
}

main();
