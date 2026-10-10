// Crops a region of an image, scales it up and overlays a labelled pixel grid in the image's own coordinates.
// node grid.mjs <image> <out.png> <x> <y> <w> <h> <scale> <step> [marks as x,y;x,y]
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(process.env.PLAYWRIGHT_DIR + '/');
const { chromium } = require('playwright');
const [img, out, X, Y, Wd, Ht, SC, STEP, marks = ''] = process.argv.slice(2); const [x, y, w, h, sc, step] = [X, Y, Wd, Ht, SC, STEP].map(Number);
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const p = await b.newPage({ viewport: { width: Math.round(w * sc), height: Math.round(h * sc) } });
await p.setContent(`<body style="margin:0;background:#000"><canvas id="c" width="${w * sc}" height="${h * sc}"></canvas>`);
await p.evaluate(async ({ src, x, y, w, h, sc, step, marks }) => {
  const i = new Image(); i.src = src; await i.decode();
  const g = document.getElementById('c').getContext('2d'); g.drawImage(i, x, y, w, h, 0, 0, w * sc, h * sc);
  g.font = '13px monospace'; g.lineWidth = 1;
  for (let gx = Math.ceil(x / step) * step; gx < x + w; gx += step) { g.strokeStyle = 'rgba(0,255,255,.55)'; g.beginPath(); g.moveTo((gx - x) * sc, 0); g.lineTo((gx - x) * sc, h * sc); g.stroke(); g.fillStyle = '#0ff'; g.fillText(gx, (gx - x) * sc + 3, 13); }
  for (let gy = Math.ceil(y / step) * step; gy < y + h; gy += step) { g.strokeStyle = 'rgba(255,255,0,.55)'; g.beginPath(); g.moveTo(0, (gy - y) * sc); g.lineTo(w * sc, (gy - y) * sc); g.stroke(); g.fillStyle = '#ff0'; g.fillText(gy, 3, (gy - y) * sc - 3); }
  marks.split(';').filter(Boolean).forEach((m, n) => { const [mx, my] = m.split(',').map(Number); g.strokeStyle = '#0f0'; g.lineWidth = 3; g.beginPath(); g.arc((mx - x) * sc, (my - y) * sc, 14, 0, 7); g.stroke(); g.fillStyle = '#0f0'; g.font = 'bold 16px monospace'; g.fillText(n + 1, (mx - x) * sc + 16, (my - y) * sc - 10); });
}, { src: 'data:image/png;base64,' + readFileSync(img).toString('base64'), x, y, w, h, sc, step, marks });
await p.screenshot({ path: out }); await b.close();
