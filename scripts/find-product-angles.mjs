import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const curated = JSON.parse(fs.readFileSync('scripts/tactics-curated-final.json', 'utf8'));
const productsDir = path.resolve('public/products');

console.log('Fetching alternate angles for top products...');

const updatedCurated = [];

for (const item of curated) {
  const localBase = path.basename(item.localImage, '.jpg');
  // Extract tactics code and base slug
  // item.tacticsImage: https://www.tactics.com/a/g698/o/lib-tech-lib-rig-camber-snowboard.jpg
  const m = item.tacticsImage.match(/https:\/\/www\.tactics\.com\/a\/([a-z0-9]+)\/o\/([^.]+)\.jpg/);
  
  const additionalImages = [];

  if (m) {
    const code = m[1];
    const slug = m[2];

    // Try common alternate suffixes
    const variants = [
      { suffix: '-angle', name: `${localBase}-angle.jpg` },
      { suffix: '-profile', name: `${localBase}-profile.jpg` },
      { suffix: '-bottom', name: `${localBase}-bottom.jpg` },
      { suffix: '-base', name: `${localBase}-base.jpg` },
      { suffix: '-lifestyle-1', name: `${localBase}-lifestyle-1.jpg` },
      { suffix: '-detail', name: `${localBase}-detail.jpg` },
    ];

    for (const v of variants) {
      // Test URL with /1b/
      // Try with both same code and adjacent letters if applicable
      const testUrl = `https://www.tactics.com/a/${code}/1b/${slug}${v.suffix}.jpg`;
      const localDest = path.join(productsDir, v.name);
      
      try {
        const headCheck = execSync(`curl.exe -s -I -A "Mozilla/5.0" "${testUrl}"`, { encoding: 'utf8' });
        if (headCheck.includes('200 OK')) {
          execSync(`curl.exe -s -L -A "Mozilla/5.0" -o "${localDest}" "${testUrl}"`);
          const sz = (fs.statSync(localDest).size / 1024).toFixed(1);
          console.log(`  + Found alternate: ${v.name} (${sz} KB)`);
          additionalImages.push(`/products/${v.name}`);
        }
      } catch (e) {
        // ignore
      }
    }
  }

  item.additionalImages = additionalImages;
  updatedCurated.push(item);
}

fs.writeFileSync('scripts/tactics-curated-with-galleries.json', JSON.stringify(updatedCurated, null, 2), 'utf8');
console.log('Done searching for product galleries!');
