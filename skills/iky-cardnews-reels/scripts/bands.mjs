// Band energy and kick-presence check for a soundtrack WAV (16-bit PCM stereo), by section of the template timeline.
// Usage: node bands.mjs <soundtrack.wav> [bpm=140]
import { readFileSync } from 'node:fs';
const b = readFileSync(process.argv[2]); const sr = b.readUInt32LE(24); let off = 12;
while (b.toString('ascii', off, off + 4) !== 'data') off += 8 + b.readUInt32LE(off + 4);
const n = b.readUInt32LE(off + 4) / 4; off += 8;
const m = new Float32Array(n); for (let i = 0; i < n; i++) m[i] = (b.readInt16LE(off + i * 4) + b.readInt16LE(off + i * 4 + 2)) / 65536;
const lp = (x, fc) => { const a = 1 - Math.exp(-2 * Math.PI * fc / sr), y = new Float32Array(x.length); let s1 = 0, s2 = 0; for (let i = 0; i < x.length; i++) { s1 += a * (x[i] - s1); s2 += a * (s1 - s2); y[i] = s2; } return y; };
const sub = (x, y) => x.map((v, i) => v - y[i]);
const l120 = lp(m, 120), l500 = lp(m, 500), l4k = lp(m, 4000), l9k = lp(m, 9000);
const bands = { 'sub<120': l120, '120-500': sub(l500, l120), '500-4k': sub(l4k, l500), '4k-9k': sub(l9k, l4k), '>9k': sub(m, l9k) };
const db = (x, a, z) => { let e = 0; for (let i = a; i < z; i++) e += x[i] * x[i]; return (10 * Math.log10(e / (z - a) + 1e-12)).toFixed(1); };
const BPM = Number(process.argv[3] || 140), BAR = 240 / BPM, seg = (a, z) => [Math.round(a * BAR * sr), Math.min(n, Math.round(z * BAR * sr))];
for (const [name, r] of [['intro 0-2', seg(0, 2)], ['groove 2-14', seg(2, 14)], ['outro 14-16', seg(14, 16)], ['end 16-17.5', seg(16, 17.5)]])
  console.log(name.padEnd(12), Object.entries(bands).map(([k, x]) => `${k} ${db(x, ...r)}`).join('  '), ' full', db(m, ...r));
// crest factor in the groove and kick presence: sub-band RMS in 60 ms after each expected kick vs the 60 ms before it
const [ga, gz] = seg(2, 14); let pk = 0; for (let i = ga; i < gz; i++) pk = Math.max(pk, Math.abs(m[i]));
console.log('groove crest dB', (20 * Math.log10(pk) - db(m, ga, gz)).toFixed(1));
let on = 0, pre = 0, c = 0; const BEAT = 60 / BPM, w = Math.round(.06 * sr);
for (let bar = 2; bar < 14; bar++) for (const beat of [0, 1.5]) { const i = Math.round((bar * BAR + beat * BEAT) * sr); on += Number(db(l120, i, i + w)); pre += Number(db(l120, i - w, i)); c++; }
console.log('kick sub-band: after', (on / c).toFixed(1), 'dB  before', (pre / c).toFixed(1), 'dB');
