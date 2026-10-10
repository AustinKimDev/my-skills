// Renders motion frames through headless Chromium. Usage:
//   node capture.mjs <outDir> stills 1.5 6.8 ...   |   node capture.mjs <outDir> all [workers]
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
const require = createRequire(process.env.PLAYWRIGHT_DIR + '/');
const { chromium } = require('playwright');
const [outDir, mode, ...rest] = process.argv.slice(2);
const URL_BASE = process.env.MOTION_URL || 'http://127.0.0.1:4795/reel/index.html?t=0';
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
async function page() {
  const p = await browser.newPage({ viewport: { width: 600, height: 1100 } });
  await p.goto(URL_BASE); await p.evaluate(() => window.motionReady);
  return p;
}
const grab = (p, t) => p.evaluate(t => { renderAt(t); return document.getElementById('c').toDataURL('image/png'); }, t)
  .then(d => Buffer.from(d.split(',')[1], 'base64'));
if (mode === 'stills') {
  const p = await page();
  for (const s of rest) writeFileSync(`${outDir}/still-${s}.png`, await grab(p, Number(s)));
} else {
  const workers = Number(rest[0] || 4);
  const total = await (await page()).evaluate(() => motion.FRAMES);
  let next = 0, done = 0;
  await Promise.all(Array.from({ length: workers }, async () => {
    const p = await page();
    while (next < total) {
      const f = next++;
      writeFileSync(`${outDir}/${String(f).padStart(5, '0')}.png`, await grab(p, f / 30));
      if (++done % 100 === 0) console.log(`${done}/${total}`);
    }
  }));
  console.log(`frames=${total}`);
}
await browser.close();
