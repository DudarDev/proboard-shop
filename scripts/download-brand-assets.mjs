import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const publicDir = path.resolve('public');
const brandsDir = path.resolve('public/brands');
const bannersDir = path.resolve('public/banners');

fs.mkdirSync(brandsDir, { recursive: true });
fs.mkdirSync(bannersDir, { recursive: true });

console.log('Downloading authentic Tactics.com brand SVGs and banners...');

// 1. Brand SVGs
const BRANDS = [
  { name: 'burton.svg', url: 'https://www.tactics.com/a/dd8f/1/burton.svg' },
  { name: 'volcom.svg', url: 'https://www.tactics.com/a/cwt5/1/volcom.svg' },
  { name: 'vans.svg', url: 'https://www.tactics.com/a/d65i/1/vans.svg' },
  { name: 'airblaster.svg', url: 'https://www.tactics.com/a/cx8b/1/airblaster.svg' },
  { name: 'ride.svg', url: 'https://www.tactics.com/a/dxoq/1/ride.svg' },
  { name: 'crabgrab.svg', url: 'https://www.tactics.com/a/d2ln/1/crab-grab.svg' },
  { name: 'thirtytwo.svg', url: 'https://www.tactics.com/a/cx8s/1/thirtytwo.svg' },
  { name: 'smith.svg', url: 'https://www.tactics.com/a/cx8r/1/smith.svg' },
  { name: 'howl.svg', url: 'https://www.tactics.com/a/d7d7/1/howl.svg' },
  { name: 'k2.svg', url: 'https://www.tactics.com/a/d7d8/1/k2.svg' },
  { name: 'anon.svg', url: 'https://www.tactics.com/a/d7cf/1/anon.svg' },
  { name: 'dakine.svg', url: 'https://www.tactics.com/a/cx8e/1/dakine.svg' },
  { name: 'gnu.svg', url: 'https://www.tactics.com/a/d2lr/1/gnu.svg' },
  { name: 'salomon.svg', url: 'https://www.tactics.com/a/f5ed/1/salomon.svg' },
  { name: 'libtech.svg', url: 'https://www.tactics.com/a/cx8k/1/lib-tech.svg' },
];

for (const b of BRANDS) {
  const dest = path.join(brandsDir, b.name);
  try {
    execSync(`curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" -o "${dest}" "${b.url}"`);
    const size = fs.statSync(dest).size;
    console.log(`[Brand SVG] ${b.name} -> ${size} B`);
  } catch (e) {
    console.error(`Failed ${b.name}:`, e.message);
  }
}

// 2. High-Res Banners
const BANNERS = [
  { name: 'snowboard-shop-hero.jpg', url: 'https://www.tactics.com/a/fz1t/1e/snowboard-shop.jpg' },
  { name: 'clearance-banner.png', url: 'https://www.tactics.com/a/gva0/1c/black-friday.png' },
  { name: 'snow-on-sale.jpg', url: 'https://www.tactics.com/a/gv9j/13/snow-on-sale.jpg' },
  { name: 'promo-sale.jpg', url: 'https://www.tactics.com/a/gva4/13/black-friday.jpg' },
];

for (const bn of BANNERS) {
  const dest = path.join(bannersDir, bn.name);
  try {
    execSync(`curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" -o "${dest}" "${bn.url}"`);
    const size = (fs.statSync(dest).size / 1024).toFixed(1);
    console.log(`[Banner] ${bn.name} -> ${size} KB`);
  } catch (e) {
    console.error(`Failed ${bn.name}:`, e.message);
  }
}

console.log('All brand SVGs and banners downloaded!');
