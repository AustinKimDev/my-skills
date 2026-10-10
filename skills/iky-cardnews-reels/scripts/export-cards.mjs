// Exports every card and a contact sheet for each set through headless Chromium.
// Usage: PLAYWRIGHT_DIR=... CHROMIUM_PATH=... node export-cards.mjs [set1,set2] (default: the template's default set)
// Needs export-server.mjs serving the folder that contains cards/. Override the page with CARDS_URL.
import { createRequire } from 'node:module';
const require = createRequire(process.env.PLAYWRIGHT_DIR + '/');
const { chromium } = require('playwright');
const base = process.env.CARDS_URL || 'http://127.0.0.1:4795/cards/index.html';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
for (const set of (process.argv[2] || '').split(',')) {
  const page = await browser.newPage(); page.on('pageerror', e => console.log('pageerror', e.message));
  await page.goto(set ? `${base}?set=${set}` : base);
  await page.waitForFunction(() => /rendered|failed/.test(document.getElementById('status').textContent), null, { timeout: 60000 });
  // A silent font fallback is the usual defect, so the title face is reported with every export.
  console.log(set || 'default', '|', await page.evaluate(() => document.getElementById('status').textContent + ' | title face loaded: ' + document.fonts.check('700 88px D', '가')));
  console.log((await page.evaluate(() => exportAll())).map(l => '  ' + l).join('\n'));
  await page.close();
}
await browser.close();
