const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://findarticles-striking-partners-control.trycloudflare.com', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'C:\\Users\\666de\\.gemini\antigravity\\brain\\9c54ec93-6d64-47f6-b1f9-ef3967ff45d5\\catalog_scrolled.png' });
  await browser.close();
})();
