// Automated Endpoint Healthcheck
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const endpoints = [
  '/',
  '/about',
  '/contact',
  '/admin',
  '/track-order',
  '/api/orders',
  '/products/minimalist-leather-backpack',
  '/products/oversized-organic-cotton-hoodie',
  '/products/wireless-anc-headphones',
  '/checkout/success',
  '/sitemap.xml',
  '/robots.txt',
];

async function runTests() {
  console.log(`\n🧪 Запуск тестування всіх маршрутів: ${BASE_URL}\n`);
  let passed = 0;

  for (const path of endpoints) {
    const url = `${BASE_URL}${path}`;
    try {
      const start = Date.now();
      const res = await fetch(url);
      const elapsed = Date.now() - start;

      if (res.status === 200) {
        console.log(`✅ [200 OK] ${path} (${elapsed}ms)`);
        passed++;
      } else {
        console.error(`❌ [${res.status}] ${path}`);
      }
    } catch (err) {
      console.error(`❌ [Error] ${path}: ${err.message}`);
    }
  }

  console.log(`\n📊 Підсумок: ${passed}/${endpoints.length} маршрутів протестовано успішно.\n`);
  if (passed === endpoints.length) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
