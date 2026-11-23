import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const curatedPath = path.resolve('scripts/tactics-curated-final.json');
const productsDir = path.resolve('public/products');

const data = JSON.parse(fs.readFileSync(curatedPath, 'utf8'));

console.log(`Starting download for ${data.length} products...`);

for (const item of data) {
  const localFileName = path.basename(item.localImage);
  const targetPath = path.join(productsDir, localFileName);
  
  // Try /1b/ first (High-Res zoom photo)
  const url1b = item.tacticsImage.replace('/o/', '/1b/');
  const urlO = item.tacticsImage; // fallback standard photo
  
  let downloaded = false;
  
  // Check /1b/
  try {
    const headCheck = execSync(`curl.exe -s -I -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${url1b}"`, { encoding: 'utf8' });
    if (headCheck.includes('200 OK')) {
      execSync(`curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -o "${targetPath}" "${url1b}"`);
      const stat = fs.statSync(targetPath);
      console.log(`[1b HD] ${localFileName} -> ${(stat.size / 1024).toFixed(1)} KB`);
      downloaded = true;
    }
  } catch (err) {
    // fallback
  }

  // Fallback to /o/ if /1b/ wasn't 200 OK
  if (!downloaded) {
    try {
      execSync(`curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -o "${targetPath}" "${urlO}"`);
      const stat = fs.statSync(targetPath);
      console.log(`[o Standard] ${localFileName} -> ${(stat.size / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`Failed ${localFileName}:`, err.message);
    }
  }
}

console.log('All downloads finished!');
