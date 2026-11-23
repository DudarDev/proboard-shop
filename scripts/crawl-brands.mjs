import { execSync } from 'child_process';
import fs from 'fs';

const brandUrls = [
  'https://www.tactics.com/capita',
  'https://www.tactics.com/burton',
  'https://www.tactics.com/lib-tech',
  'https://www.tactics.com/union-binding-company',
  'https://www.tactics.com/thirtytwo',
  'https://www.tactics.com/vans',
  'https://www.tactics.com/salomon',
  'https://www.tactics.com/gnu',
  'https://www.tactics.com/anon',
  'https://www.tactics.com/smith',
  'https://www.tactics.com/volcom',
  'https://www.tactics.com/dakine'
];

function fetchWithCurl(url) {
  try {
    const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${url}"`;
    return execSync(cmd, { maxBuffer: 15 * 1024 * 1024, encoding: 'utf8' });
  } catch (e) {
    return '';
  }
}

function parseItems(html) {
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

      let title = alt || `${brand} Product`;
      title = title.replace(/\s+202[0-9]/, '').trim();

      items.push({
        brand,
        title,
        price,
        compareAt,
        img,
        link,
      });
    }
  }
  return items;
}

const existing = JSON.parse(fs.readFileSync('scripts/tactics-crawled.json', 'utf8'));

for (const bUrl of brandUrls) {
  console.log('Crawling brand:', bUrl);
  const html = fetchWithCurl(bUrl);
  const items = parseItems(html);
  console.log(`Found ${items.length} for ${bUrl}`);
  for (const it of items) {
    if (!existing.some(e => e.img === it.img)) {
      existing.push({ ...it, type: 'Бренди' });
    }
  }
}

console.log('Total items now:', existing.length);
fs.writeFileSync('scripts/tactics-crawled.json', JSON.stringify(existing, null, 2), 'utf8');
