// Renders the soundtrack in headless Chromium and prints measurements. Usage: node audio.mjs <out.wav>
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
const require = createRequire(process.env.PLAYWRIGHT_DIR + '/');
const { chromium } = require('playwright');
const out = process.argv[2] || 'soundtrack.wav';
const URL_AUDIO = process.env.AUDIO_URL || 'http://127.0.0.1:4795/reel/audio.html';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage();
await page.goto(URL_AUDIO);
const b64 = await page.evaluate(() => window.soundtrackWavBase64());
const BAR = await page.evaluate(() => window.TIMELINE.BAR);
await browser.close();
const wav = Buffer.from(b64, 'base64');
writeFileSync(out, wav);

const sr = wav.readUInt32LE(24), ch = wav.readUInt16LE(22), n = (wav.length - 44) / (2 * ch);
const smp = [0, 1].map(c => { const a = new Float64Array(n); for (let i = 0; i < n; i++) a[i] = wav.readInt16LE(44 + (i * ch + c) * 2) / 32768; return a; });
const db = x => x > 0 ? (20 * Math.log10(x)).toFixed(2) : '-inf';
const rms = (arrs, a, b) => { let s = 0; for (const x of arrs) for (let i = a; i < b; i++) s += x[i] * x[i]; return Math.sqrt(s / (arrs.length * Math.max(1, b - a))); };
const peak = x => x.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
const clipped = smp.reduce((c, x) => c + x.reduce((k, v) => k + (Math.abs(v) >= 32767 / 32768 ? 1 : 0), 0), 0);
const mean = x => x.reduce((s, v) => s + v, 0) / x.length;
const [L, R] = smp, mL = mean(L), mR = mean(R);
let sLR = 0, sLL = 0, sRR = 0;
for (let i = 0; i < n; i++) { sLR += (L[i] - mL) * (R[i] - mR); sLL += (L[i] - mL) ** 2; sRR += (R[i] - mR) ** 2; }
console.log(`duration ${(n / sr).toFixed(3)} s  rate ${sr}  channels ${ch}`);
console.log(`peak dBFS L ${db(peak(L))}  R ${db(peak(R))}  clipped ${clipped}`);
console.log(`overall RMS dBFS ${db(rms(smp, 0, n))}  bars 2-13 RMS ${db(rms(smp, Math.round(2 * BAR * sr), Math.round(14 * BAR * sr)))}`);
console.log(`DC offset L ${mL.toExponential(2)} R ${mR.toExponential(2)}  L/R correlation ${(sLR / Math.sqrt(sLL * sRR)).toFixed(3)}`);
const rows = [];
for (let b = 0; b < 18; b++) rows.push(db(rms(smp, Math.min(n, Math.round(b * BAR * sr)), Math.min(n, Math.round((b + 1) * BAR * sr)))));
console.log(`per-bar RMS dBFS: ${rows.map((r, b) => `${b}:${r}`).join('  ')}`);
