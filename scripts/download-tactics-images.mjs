import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const crawled = JSON.parse(fs.readFileSync('scripts/tactics-crawled.json', 'utf8'));

// Curate 22 products across all categories
const selected = [
  // Snowboards (8 items)
  { handle: 'lib-tech-lib-rig-camber-snowboard', search: 'Lib Rig Camber', type: 'Сноуборди', flex: '7/10', flexNum: 7, profile: 'C3 Camber (Aggressive All-Mountain)', camberType: 'camber', shape: 'Directional', terrain: 'All-Mountain / Freeride' },
  { handle: 'burton-family-tree-sketch-artist-camber-snowboard', search: 'Sketch Artist', type: 'Сноуборди', flex: '6/10', flexNum: 6, profile: 'Directional Camber (Carving & Powder)', camberType: 'camber', shape: 'Directional Freeride', terrain: 'All-Mountain / Deep Snow' },
  { handle: 'gnu-airblaster-snarf-camber-snowboard', search: 'Airblaster SNARF', type: 'Сноуборди', flex: '6.5/10', flexNum: 6.5, profile: 'C3 Camber (Dominant Pop & Edge Hold)', camberType: 'camber', shape: 'Directional Twin', terrain: 'All-Mountain Freestyle' },
  { handle: 'sims-uap-snowboard', search: 'SIMS UAP', type: 'Сноуборди', flex: '5/10', flexNum: 5, profile: 'Traditional Camber', camberType: 'camber', shape: 'True Twin', terrain: 'Park & Street' },
  { handle: 'arbor-jared-elston-el-camino-snowboard', search: 'El Camino', type: 'Сноуборди', flex: '7.5/10', flexNum: 7.5, profile: 'Camber System with Grip Tech', camberType: 'camber', shape: 'Directional Twin', terrain: 'Big Mountain / Freestyle' },
  { handle: 'jones-mind-expander-splitboard', search: 'Mind Expander Splitboard', type: 'Сноуборди', flex: '6/10', flexNum: 6, profile: 'Surf Rocker (Maximum Float)', camberType: 'hybrid', shape: 'Directional Surf', terrain: 'Backcountry Powder' },
  { handle: 'ride-deep-fake-snowboard', search: 'Deep Fake', type: 'Сноуборди', flex: '8/10', flexNum: 8, profile: 'Directional Hybrid Camber', camberType: 'hybrid', shape: 'Tapered Directional', terrain: 'All-Mountain Steeps' },
  { handle: 'salomon-jetstream-snowboard', search: 'Salomon Jetstream', type: 'Сноуборди', flex: '6/10', flexNum: 6, profile: 'Quad Camber (Speed & Precision)', camberType: 'camber', shape: 'Directional Twin', terrain: 'Resort Carving & Park' },
  { handle: 'gnu-gremlin-c3-snowboard', search: 'Gremlin C3', type: 'Сноуборди', flex: '7/10', flexNum: 7, profile: 'C3 Camber + Magne-Traction', camberType: 'camber', shape: 'Directional Tapered', terrain: 'All-Terrain Predator' },

  // Boots (4 items)
  { handle: 'burton-step-on-snowboard-boots', search: 'Waverange Step On', type: 'Взуття', flex: '6/10', flexNum: 6, profile: 'Step On Compatible', camberType: 'hybrid', shape: 'Ergonomic', terrain: 'All-Mountain Comfort' },
  { handle: 'thirtytwo-lashed-snowboard-boots', search: 'Thirtytwo Lashed', type: 'Взуття', flex: '6/10', flexNum: 6, profile: 'Team Fit Dual BOA', camberType: 'camber', shape: 'Articulated Cuff', terrain: 'Freestyle / All-Mountain' },
  { handle: 'vans-invado-pro-snowboard-boots', search: 'Vans Invado Pro', type: 'Взуття', flex: '5-7/10', flexNum: 6, profile: 'Hybrid BOA + Traditional Lace', camberType: 'hybrid', shape: 'V2 Waffle Pro', terrain: 'Park & Resort' },
  { handle: 'salomon-launch-boa-snowboard-boots', search: 'Salomon Launch Boa', type: 'Взуття', flex: '5/10', flexNum: 5, profile: 'Fit To Ride SJ Boa', camberType: 'hybrid', shape: 'Compact Footprint', terrain: 'Freestyle Progression' },

  // Bindings (2 items)
  { handle: 'burton-step-on-cartel-x-bindings', search: 'Cartel X', type: 'Кріплення', flex: '8/10', flexNum: 8, profile: 'Step On System', camberType: 'camber', shape: 'FullBED Cushioning', terrain: 'Aggressive All-Mountain' },
  { handle: 'bent-metal-logic-snowboard-bindings', search: 'Bent Metal', type: 'Кріплення', flex: '4/10', flexNum: 4, profile: 'Flex Control Drive Plate', camberType: 'hybrid', shape: 'Urethane Highback', terrain: 'Freestyle Jibbing' },

  // Goggles (2 items)
  { handle: 'smith-squad-s-goggles', search: 'Smith Squad', type: 'Оптика', flex: 'Responsive', flexNum: 5, profile: 'ChromaPop Cylindrical', camberType: 'hybrid', shape: 'Medium/Large Fit', terrain: 'All Conditions' },
  { handle: 'anon-m5-toric-goggles', search: 'Anon M5', type: 'Оптика', flex: 'Toric Lens', flexNum: 6, profile: 'Magna-Tech Quick Change', camberType: 'camber', shape: 'Toric Curvature', terrain: 'Bright Sun & Low Light' },

  // Helmets & Protection (1 item)
  { handle: 'smith-scout-mips-snowboard-helmet', search: 'Smith Scout MIPS', type: 'Захист', flex: 'Impact Shell', flexNum: 8, profile: 'MIPS Brain Protection', camberType: 'camber', shape: 'Low Profile', terrain: 'All-Mountain Safety' },

  // Apparel & Outerwear (1 item)
  { handle: 'volcom-rain-gore-tex-bib-pants', search: 'Volcom Rain GORE-TEX', type: 'Одяг', flex: 'Relaxed Fit', flexNum: 5, profile: 'GORE-TEX 2-Layer Waterproof', camberType: 'hybrid', shape: 'Bib Overalls', terrain: 'Deep Powder & Storm' },

  // Skateboards (2 items)
  { handle: 'santa-cruz-stranger-things-deck', search: 'Stranger Things', type: 'Скейтборди', flex: '7-Ply Maple', flexNum: 7, profile: 'Medium Concave', camberType: 'camber', shape: 'Shaped 9.0" Deck', terrain: 'Street / Transition' },
  { handle: 'tactics-oval-logo-skateboard-deck', search: 'Oval Logo Skateboard Deck', type: 'Скейтборди', flex: 'Hard Rock Maple', flexNum: 6.5, profile: 'Standard Popsicle', camberType: 'camber', shape: '8.25" Width', terrain: 'Street / Park Skate' },

  // Accessories (1 item)
  { handle: 'dakine-goggle-stash-case', search: 'Goggle Stash Case', type: 'Аксесуари', flex: 'Padded Protection', flexNum: 5, profile: 'Fleece Lined', camberType: 'hybrid', shape: 'Molded Case', terrain: 'Travel & Gear Care' },
];

const targetDir = path.resolve('public/products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const finalProducts = [];

for (const p of selected) {
  const found = crawled.find(c => c.title.toLowerCase().includes(p.search.toLowerCase()) || c.link.toLowerCase().includes(p.search.toLowerCase().replace(/ /g, '-')));
  if (!found) {
    console.warn('NOT FOUND for search:', p.search);
    continue;
  }

  const filename = `${p.handle}.jpg`;
  const filePath = path.join(targetDir, filename);

  console.log(`Downloading real photo for ${found.title}...`);
  try {
    execSync(`curl.exe -s -L -A "Mozilla/5.0" -o "${filePath}" "${found.img}"`);
    const stats = fs.statSync(filePath);
    console.log(`Saved ${filename} (${stats.size} bytes)`);

    finalProducts.push({
      ...p,
      title: found.title,
      vendor: found.brand,
      price: found.price || 399,
      compareAtPrice: found.compareAt || Math.round(found.price * 1.25),
      localImage: `/products/${filename}`,
      tacticsImage: found.img,
      description: `${found.title} — професійне спорядження з офіційного каталогу провідного бордшопу. Висока якість збірки, офіційна гарантія бренду ${found.brand} та перевірена надійність на схилах і в парку.`,
    });
  } catch (err) {
    console.error(`Failed downloading ${found.img}:`, err.message);
  }
}

console.log(`Successfully curated and downloaded ${finalProducts.length} authentic Tactics products!`);
fs.writeFileSync('scripts/tactics-curated-final.json', JSON.stringify(finalProducts, null, 2), 'utf8');
