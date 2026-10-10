// Builds a labeled contact sheet from PNG stills: node sheet.mjs out.png cols img1 img2 ...
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
const require = createRequire(process.env.PLAYWRIGHT_DIR + '/');
const { chromium } = require('playwright');
const [out, cols, ...imgs] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const p = await b.newPage({ viewport: { width: 360 * cols + 20, height: 400 } });
const cells = imgs.map(f => `<figure><img src="data:image/png;base64,${readFileSync(f).toString('base64')}"><figcaption>${basename(f)}</figcaption></figure>`).join('');
await p.setContent(`<style>body{margin:0;padding:10px;background:#000;display:grid;grid-template-columns:repeat(${cols},350px);gap:10px;font:14px sans-serif;color:#fff}img{width:350px;display:block}figure{margin:0}</style>${cells}`);
await p.screenshot({ path: out, fullPage: true });
await b.close();
