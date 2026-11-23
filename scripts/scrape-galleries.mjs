import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const curatedPath = path.resolve('scripts/tactics-curated-final.json');
const crawledPath = path.resolve('scripts/tactics-crawled.json');
const productsDir = path.resolve('public/products');

const curated = JSON.parse(fs.readFileSync(curatedPath, 'utf8'));
const crawled = JSON.parse(fs.readFileSync(crawledPath, 'utf8'));

console.log(`Extracting authentic multi-angle galleries for ${curated.length} products...`);

for (let i = 0; i < curated.length; i++) {
  const item = curated[i];
  const crawledMatch = crawled.find(cr => cr.img === item.tacticsImage);
  if (!crawledMatch || !crawledMatch.link) continue;

  const url = `https://www.tactics.com${crawledMatch.link}`;
  console.log(`\n[${i+1}/${curated.length}] Fetching ${item.title}...`);

  try {
    const html = execSync(
      `curl.exe -s -L --max-time 15 -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${url}"`,
      { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
    );

    // Look for all <a href="/a/.../1b/...jpg" data-asset-id=...>
    const matches = [...html.matchAll(/href="(\/a\/[a-z0-9]+\/1b\/[^"]+\.jpg)"/g)];
    const urls = [...new Set(matches.map(m => `https://www.tactics.com${m[1]}`))];

    console.log(`  Found ${urls.length} gallery images`);
    item.gallery = [];

    // Always include the main photo as view 1
    item.gallery.push({
      url: item.localImage,
      alt: `${item.title} - Main View`,
    });

    let count = 1;
    for (const imgUrl of urls) {
      if (imgUrl.includes(path.basename(item.localImage, '.jpg')) && !imgUrl.includes('-')) {
        continue;
      }
      count++;
      if (count > 4) break; // Keep 3-4 clean high-res views per item

      const suffixMatch = imgUrl.match(/1b\/[^-]+-(.+)\.jpg/);
      const suffix = suffixMatch ? suffixMatch[1] : `angle-${count}`;
      const filename = `${item.handle}-${suffix}.jpg`;
      const dest = path.join(productsDir, filename);

      try {
        execSync(
          `curl.exe -s -L --max-time 15 -A "Mozilla/5.0" -o "${dest}" "${imgUrl}"`
        );
        const sz = fs.statSync(dest).size;
        if (sz > 5000) {
          console.log(`    + View ${count}: ${filename} (${Math.round(sz / 1024)} KB)`);
          item.gallery.push({
            url: `/products/${filename}`,
            alt: `${item.title} - ${suffix}`,
          });
        }
      } catch (err) {
        // ignore
      }
    }
  } catch (e) {
    console.error(`  Error scraping ${url}:`, e.message);
  }
}

fs.writeFileSync('scripts/tactics-curated-galleries.json', JSON.stringify(curated, null, 2), 'utf8');
console.log('\nAll galleries finished!');
