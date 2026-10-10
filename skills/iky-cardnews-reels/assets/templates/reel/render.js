/* Reel template: every frame is a pure function of time, cut to the beat grid in timeline.js.
   Backgrounds are generated scenes; every gauge, wave, chip, counter and frame is an explanatory graphic, not a captured app screen.
   Replace the deck, colours and VERSION; put scenes in scene/, product icons in icons/ and the brand mark at logo.png. */
const TL = window.TIMELINE, { BEAT, BAR, at, cues } = TL;
const W = 1080, H = 1920, FPS = TL.FPS, DURATION = TL.DURATION;
const C = { bg0: '#17111d', bg1: '#09080c', ink: '#f7f3f6', pink: '#ff2d8e', rose: '#e8a2bd', lav: '#b79cff', lime: '#c6f432', dark: '#1b0f17' };
const rgba = (hex, a) => `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)},${a})`;

/* Type system for the 1080px frame. Two families, six sizes, nothing set outside them.
   Headlines and numbers are Gmarket Sans (D): a Medium lead line sets the headline up, a Bold display line lands it.
   Sentences and labels are Pretendard (P). Tracking tightens as size grows (track is in em); labels open up slightly.
   Gmarket Sans draws about 0.11em below its baseline, so its lines are placed with that in mind. */
const TYPE = {
  hero: { family: 'D', size: 280, weight: 700, track: -.04 },    // the version number
  display: { family: 'D', size: 156, weight: 700, track: -.04 }, // key line of a headline
  lead: { family: 'D', size: 88, weight: 500, track: -.03 },     // line that sets the key line up
  title: { family: 'D', size: 60, weight: 500, track: -.03 },    // units, closing line
  body: { family: 'P', size: 44, weight: 500, track: -.01 },     // chips and short notes
  label: { family: 'P', size: 32, weight: 700, track: .03 }      // pills, counters
};
const MARGIN = 72, COLUMN = 936;
// The headline pair sits at the foot of the frame, over the scene's dark floor and above the Reels interface.
const LEAD_Y = 1300, KEY_Y = 1470, NOTE_Y = 500;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, p) => a + (b - a) * p;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const eOut = p => 1 - Math.pow(1 - p, 3);
const eInOut = p => (p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const eBack = p => { const c1 = 1.7, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); };
const eBounce = p => { const n = 7.5625, d = 2.75; if (p < 1 / d) return n * p * p; if (p < 2 / d) return n * (p -= 1.5 / d) * p + .75; if (p < 2.5 / d) return n * (p -= 2.25 / d) * p + .9375; return n * (p -= 2.625 / d) * p + .984375; };
const rnd = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const mod = (a, n) => ((a % n) + n) % n;

// Product icons (transparent PNGs in icons/<id>.png). The `shelves` and `frames` choreographies show the first 15,
// `drops` uses DROP_ICONS. Leave empty when a reel uses neither.
const ICONS = [];
const DROP_ICONS = [];

/* Each reel: an intro, six feature slots and a closing line. The six slots ride the same music cues in timeline.js
   (pops, drops, count-up, blip, steps, lock), so a slot's `fx` picks the choreography and the rest is copy and placement.
   Copy is one plain sentence split over the lead and display lines. Coordinates inside a slot are in the scene image's
   own pixels (1024x1536). Replace this placeholder deck; add more decks and pick one with ?set=<name>.
   Sibling reels should not be twins. `style` changes how a reel speaks: 'stage' sets the headline as kinetic type, wipes
   with diagonal stripes and floats hearts; 'bubbles' sets it as a chat exchange (an incoming line, a typing indicator,
   then the reply), wipes with an iris and floats small message bubbles. audio.js has a second tune (?tune=b).
   fx options: shelves {shelves:[[surface y, left x, right x, icon size]...], note} | frames {frames:[[cx, cy, size]...]}
   | drops {targets:[[x, y]...], icon, absorb?} | count {to, unit} (third slot) | charge {gauge:[before, after]} (third or fourth slot)
   | looks {looks:[[chip, css filter]...], shutter?} | lock {rings?:[x, y], trace?, panels?} */
const VERSION = '1.0.0';
const DECKS = {
  main: {
    style: 'stage', badge: 'NEW', closing: '달라진 점을 만나 보세요',
    intro: { scene: 'scene/01-cover.png', lead: '이번 업데이트로', key: '달라졌어요' },
    slots: [
      { name: '첫째', scene: 'scene/02.png', lead: '기능 하나를', key: '써 보세요', fx: 'looks', looks: [] },
      { name: '둘째', scene: 'scene/03.png', lead: '기능 둘도', key: '써 보세요', fx: 'looks', looks: [] },
      { name: '셋째', scene: 'scene/04.png', lead: '원하는 만큼', fx: 'count', to: 1000, unit: '부터' },
      { name: '넷째', scene: 'scene/05.png', lead: '끊기지 않고', key: '이어져요', fx: 'charge', gauge: ['연결 중', '연결 완료'] },
      { name: '다섯째', scene: 'scene/06.png', lead: '화면을', key: '바꿔 보세요', fx: 'looks', looks: [['밝게', 'brightness(1.2) saturate(1.2)'], ['선명하게', 'contrast(1.3)']] },
      { name: '여섯째', scene: 'scene/07.png', lead: '불안정하던 부분을', key: '손봤어요', fx: 'lock', trace: true }
    ]
  }
};
const SET = new URLSearchParams(location.search).get('set') in DECKS ? new URLSearchParams(location.search).get('set') : Object.keys(DECKS)[0];
const DECK = DECKS[SET];
const SLOT_IDS = ['gifts', 'gallery', 'candy', 'signature', 'filter', 'stability']; // timeline scene ids, in slot order

const assets = { scene: {}, gifts: {} };
const loadImage = src => new Promise((resolve, reject) => { const i = new Image(); i.onload = () => resolve(i); i.onerror = () => reject(new Error('image failed: ' + src)); i.src = src; });
async function loadAssets() {
  await Promise.all([...new Set(Object.values(TYPE).map(s => `${s.weight} 88px ${s.family}`)), '600 88px P'].map(f => document.fonts.load(f, '가0A')));
  assets.logo = await loadImage('logo.png').catch(() => null);
  await Promise.all([DECK.intro.scene, ...DECK.slots.map(s => s.scene)].map(async name => { assets.scene[name] = await loadImage(name).catch(() => null); })); // a missing scene leaves the lit backdrop
  await Promise.all([...ICONS, ...DROP_ICONS].map(async id => { assets.gifts[id] = await loadImage(`icons/${id}.png`); }));
}

// Kick pattern of the groove (beat 1 and the "and" of beat 2), used to make light and scale breathe with the music.
function pulse(t) {
  if (t >= cues.logoHit) return Math.exp(-(t - cues.logoHit) * 4);
  if (t < cues.drop) return 0;
  const pos = ((t - cues.drop) / BEAT) % 4, since = pos >= 1.5 ? pos - 1.5 : pos;
  return Math.exp(-since * BEAT * 7);
}

function drawFrame(x, t) {
  const A = (alpha, fn) => { if (alpha <= 0) return; x.save(); x.globalAlpha *= clamp(alpha); fn(); x.restore(); };
  const round = (a, b, w, h, r, fill) => { x.beginPath(); x.roundRect(a, b, w, h, r); x.fillStyle = fill; x.fill(); };
  const glow = (cx, cy, r, color, alpha) => { if (alpha <= 0) return; const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, rgba(color, alpha)); g.addColorStop(1, rgba(color, 0)); x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2); };
  const ring = (cx, cy, r, color, width, alpha) => { if (alpha <= 0 || r <= 0) return; x.save(); x.globalAlpha *= clamp(alpha); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.strokeStyle = color; x.lineWidth = width; x.stroke(); x.restore(); };
  const heart = (cx, cy, s, rot, color) => { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s / 100, s / 100); x.beginPath(); x.moveTo(0, 38); x.bezierCurveTo(-78, -12, -38, -70, 0, -26); x.bezierCurveTo(38, -70, 78, -12, 0, 38); x.fillStyle = color; x.fill(); x.restore(); };
  const sparkle = (cx, cy, r, rot, color) => {
    if (r <= 0) return;
    x.beginPath();
    for (let n = 0; n <= 4; n++) {
      const a = rot + n * Math.PI / 2, px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
      if (!n) { x.moveTo(px, py); continue; }
      const m = a - Math.PI / 4; x.quadraticCurveTo(cx + Math.cos(m) * r * .16, cy + Math.sin(m) * r * .16, px, py);
    }
    x.fillStyle = color; x.fill();
  };
  const gift = (id, cx, cy, s, rot = 0) => { if (s <= 0) return; x.save(); x.translate(cx, cy); x.rotate(rot); x.drawImage(assets.gifts[id], -s / 2, -s / 2, s, s); x.restore(); };
  const lit = fn => { x.globalCompositeOperation = 'lighter'; fn(); x.globalCompositeOperation = 'source-over'; };
  const BUBBLES = DECK.style === 'bubbles', ACCENT = BUBBLES ? C.lav : C.rose;
  // A small message bubble with three dots: the chat reel's floating motif.
  const miniBubble = (cx, cy, s, color) => {
    x.save(); x.translate(cx, cy); x.beginPath(); x.roundRect(-s * .6, -s * .4, s * 1.2, s * .8, [s * .36, s * .36, s * .36, s * .1]); x.fillStyle = color; x.fill();
    x.fillStyle = 'rgba(27,15,23,.5)'; for (let d = -1; d <= 1; d++) { x.beginPath(); x.arc(d * s * .28, 0, s * .085, 0, Math.PI * 2); x.fill(); }
    x.restore();
  };
  const flash = alpha => A(alpha, () => { x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); });

  const scene = TL.scenes.find(s => t >= s.a && t < s.b) || TL.scenes[TL.scenes.length - 1];
  const lt = t - scene.a, dur = scene.b - scene.a, k = pulse(t);
  const slotIndex = SLOT_IDS.indexOf(scene.id), slot = DECK.slots[slotIndex];

  /* ---------- type ---------- */
  // Glyphs are measured without tracking; tracking is added between glyphs only, never after the last one.
  const font = st => { x.font = `${st.weight} ${st.size}px ${st.family}`; x.letterSpacing = '0px'; };
  const measure = (s, st) => { font(st); const tr = st.track * st.size, ws = [...s].map(ch => x.measureText(ch).width); return { ws, tr, total: ws.reduce((a, b) => a + b, 0) + tr * (ws.length - 1) }; };
  // A style scaled down just enough to keep a line inside the column.
  const fitted = (s, st, max) => { const { total } = measure(s, st); return total > max ? { ...st, size: Math.floor(st.size * max / total) } : st; };
  // Large glyphs carry side bearing that reads as an indent; pull them back so their ink sits on the margin.
  const bearing = (ch, st) => (st.size >= 80 ? (font(st), -x.measureText(ch).actualBoundingBoxLeft) : 0);
  const bloom = (st, color) => { if (color === C.pink && st.size >= 100) { x.shadowColor = rgba(C.pink, .32); x.shadowBlur = 26; } };
  const text = (s, a, b, style, color = C.ink, align = 'left', max = COLUMN) => {
    const st = fitted(s, style, max), { tr, total } = measure(s, st), left = align === 'center' ? a - total / 2 : a - bearing(s[0], st);
    font(st); x.letterSpacing = `${tr}px`; x.fillStyle = color; x.textAlign = 'left'; x.fillText(s, left, b); x.letterSpacing = '0px';
    return total;
  };
  // Kinetic type: each character animates on its own. mode: rise (spring up) or drop (fall and bounce).
  const chars = (s, x0, y, style, color, start, { stagger = .04, mode = 'rise', align = 'left', max = COLUMN } = {}) => {
    const st = fitted(s, style, max), { ws, tr, total } = measure(s, st), f = st.size;
    let ox = align === 'center' ? x0 - total / 2 : x0 - bearing(s[0], st);
    font(st);
    [...s].forEach((ch, i) => {
      const w = ws[i], d = start + i * stagger, p = prog(lt, d, d + (mode === 'drop' ? .55 : .42));
      if (p > 0 && ch.trim()) {
        x.save(); x.globalAlpha *= clamp(p * 3);
        if (mode === 'drop') x.translate(ox + w / 2, y - (1 - eBounce(p)) * f * 1.1);
        else { const e = eBack(p); x.translate(ox + w / 2, y + (1 - e) * f * .75); x.rotate((1 - e) * .14); x.scale(lerp(.6, 1, e), lerp(.6, 1, e)); }
        bloom(st, color); x.fillStyle = color; x.textAlign = 'center'; x.fillText(ch, 0, 0); x.restore();
      }
      ox += w + tr;
    });
    return total;
  };
  // Tabular figures for values that change: every digit gets the width of a zero so a count-up does not jitter.
  // The first digit sits flush right in its cell so a leading 1 still starts on the margin. Returns the drawn width.
  const figures = (s, x0, y, st, color) => {
    font(st);
    const tr = st.track * st.size, cell = x.measureText('0').width, list = [...s], w0 = x.measureText(list[0]).width;
    let ox = x0 - (cell - w0) - bearing(list[0], st), total = 0;
    font(st); x.save(); bloom(st, color); x.fillStyle = color; x.textAlign = 'center';
    list.forEach((ch, i) => {
      const digit = ch >= '0' && ch <= '9', w = x.measureText(ch).width, adv = digit ? cell : w;
      x.fillText(ch, i ? ox + adv / 2 : ox + cell - w / 2, y);
      ox += adv + tr; total += adv + tr;
    });
    x.restore();
    return total - tr - (cell - w0);
  };

  x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; x.filter = 'none'; x.textBaseline = 'alphabetic'; x.letterSpacing = '0px';

  /* ---------- stage ---------- */
  // Plain lit backdrop for the moments without a scene (version slam, end card).
  const backdrop = () => {
    const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, C.bg0); bg.addColorStop(1, C.bg1); x.fillStyle = bg; x.fillRect(0, 0, W, H);
    lit(() => {
      glow(860 + 90 * Math.sin(t * .33), 420 + 60 * Math.cos(t * .27), 760, C.pink, .13 + .07 * k);
      glow(160 + 80 * Math.cos(t * .29), 1500 + 70 * Math.sin(t * .37), 700, C.lav, .10 + .05 * k);
      for (let i = 0; i < 46; i++) {
        const speed = 22 + rnd(i + .3) * 56, py = H + 60 - mod(rnd(i + .7) * (H + 120) + t * speed, H + 120), r = 3 + rnd(i + .1) * 13;
        x.beginPath(); x.arc(rnd(i) * W + 18 * Math.sin(t * .8 + i), py, r, 0, Math.PI * 2); x.fillStyle = rgba(i % 3 ? C.rose : C.lav, (.05 + .13 * rnd(i + .5)) * (.6 + .4 * Math.sin(t * 2 + i))); x.fill();
      }
    });
  };
  // A scene fills the frame by height and pushes in slowly; `view` maps its own pixels to the frame so overlays can stick to it.
  const viewOf = (z0 = 1.06, push = 1) => { const s = H / 1536 * z0 * (1 + .035 * eInOut(prog(lt, 0, dur)) * push) * (1 + .01 * k); return { s, tx: (W - 1024 * s) / 2, ty: -(1536 * s - H) * .3 }; };
  const paint = (name, v, { filter = null, x0 = 0, x1 = W, alpha = 1, dx = 0 } = {}) => {
    if (x1 <= x0 || alpha <= 0 || !assets.scene[name]) return;
    x.save(); x.beginPath(); x.rect(x0, 0, x1 - x0, H); x.clip(); x.globalAlpha *= clamp(alpha); if (filter) x.filter = filter;
    x.drawImage(assets.scene[name], v.tx + dx, v.ty, 1024 * v.s, 1536 * v.s); x.restore();
  };
  const inScene = (v, fn) => { x.save(); x.translate(v.tx, v.ty); x.scale(v.s, v.s); fn(); x.restore(); };
  const toFrame = (v, sx, sy) => [v.tx + sx * v.s, v.ty + sy * v.s];
  // Scrims: the top one swallows the scene's dark ceiling strip into a clean header zone, the bottom one carries the headline.
  const scrims = () => {
    let g = x.createLinearGradient(0, 0, 0, 480); g.addColorStop(0, 'rgba(9,8,12,1)'); g.addColorStop(.5, 'rgba(9,8,12,.97)'); g.addColorStop(1, 'rgba(9,8,12,0)'); x.fillStyle = g; x.fillRect(0, 0, W, 480);
    g = x.createLinearGradient(0, 1000, 0, H); g.addColorStop(0, 'rgba(9,8,12,0)'); g.addColorStop(.36, 'rgba(9,8,12,.82)'); g.addColorStop(1, 'rgba(9,8,12,.97)'); x.fillStyle = g; x.fillRect(0, 1000, W, H - 1000);
  };

  backdrop();
  if (scene.id === 'intro') intro();
  else if (slot) feature();
  else if (scene.id === 'outro') outro();
  else end();

  // Live-stream hearts rising along the right edge; density and start follow the scene.
  const [heartCount, heartFrom] = { intro: [12, cues.introArt], gifts: [8, scene.a], gallery: [6, scene.a], candy: [18, cues.countEnd], signature: [10, cues.playBlip], filter: [5, scene.a], stability: [8, cues.lockIn], outro: [16, at(15, 2)], end: [0, 0] }[scene.id];
  for (let j = 0; j < heartCount; j++) {
    const period = 2.1 + rnd(j) * 1.3, life = mod(t / period + rnd(j + .2), 1);
    if (t - life * period < heartFrom) continue;
    const size = (26 + rnd(j + .6) * 40) * (.5 + .5 * Math.min(1, life * 6));
    const px = 850 + rnd(j + .4) * 160 + 46 * Math.sin(life * 7 + j), py = lerp(1180, 320, Math.pow(life, .85)), color = [C.pink, C.rose, C.lav, '#ffffff'][j % 4];
    A(Math.min(1, life * 6) * (1 - prog(life, .6, 1)) * .9, () => (BUBBLES ? miniBubble(px, py, size * 1.5, color) : heart(px, py, size, .3 * Math.sin(life * 5 + j * 2), color)));
  }

  /* ---------- chrome: brand mark and the current feature's position ---------- */
  if (scene.id !== 'end') {
    if (assets.logo) x.drawImage(assets.logo, MARGIN, 228, assets.logo.width * 48 / assets.logo.height, 48);
    if (slot) { let px = 1008; for (let i = DECK.slots.length - 1; i >= 0; i--) { const w = i === slotIndex ? 44 : 12; px -= w; round(px, 246, w, 12, 6, i === slotIndex ? (BUBBLES ? C.lav : C.pink) : 'rgba(255,255,255,.28)'); px -= 10; } }
  }

  /* ---------- transitions: three-stripe diagonal wipes on every cut ---------- */
  cues.cuts.forEach((T0, i) => {
    if (t < T0 - .26 || t > T0 + .4) return;
    if (i === cues.cuts.length - 1) { // into the end card: flash through pink
      A(t < T0 ? eOut(prog(t, T0 - .2, T0)) : 1 - eOut(prog(t, T0, T0 + .38)), () => { x.fillStyle = C.pink; x.fillRect(0, 0, W, H); });
      return;
    }
    // The recap starts on a hard flash cut so its first beat is not hidden under a wipe.
    if (T0 === cues.recapHits[0]) { if (t >= T0) flash(.45 * (1 - prog(t, T0, T0 + .2))); return; }
    if (BUBBLES) { // iris from the send corner, then a pink dissolve
      if (t < T0) { const e = eInOut(prog(t, T0 - .26, T0 - .02)); [[C.lav, 1], [C.pink, .86]].forEach(([color, f]) => { x.beginPath(); x.arc(960, 1500, 2400 * e * f, 0, Math.PI * 2); x.fillStyle = color; x.fill(); }); }
      else A(1 - eOut(prog(t, T0, T0 + .32)), () => { x.fillStyle = C.pink; x.fillRect(0, 0, W, H); });
      return;
    }
    const S = 340;
    x.save(); if (i % 2) { x.translate(W, 0); x.scale(-1, 1); }
    [C.lav, C.pink, C.rose].forEach((color, n) => {
      const lead = lerp(-S - 30, W + 30, eInOut(prog(t, T0 - .26 + n * .04, T0 - .06 + n * .04)));
      const trail = lerp(-S - 30, W + 30, eInOut(prog(t, T0 + .02 + (2 - n) * .05, T0 + .26 + (2 - n) * .05)));
      if (lead <= trail) return;
      x.beginPath(); x.moveTo(trail + S, 0); x.lineTo(lead + S, 0); x.lineTo(lead, H); x.lineTo(trail, H); x.closePath(); x.fillStyle = color; x.fill();
    });
    x.restore();
    if (i === 0 && t >= T0) flash(.5 * (1 - prog(t, T0, T0 + .3))); // the drop
  });
  if (t > DURATION - .4) A(prog(t, DURATION - .4, DURATION), () => { x.fillStyle = '#000'; x.fillRect(0, 0, W, H); });

  /* ---------- shared pieces ---------- */
  // Section pill: tabular index, a hairline, then the feature name.
  function label(index, name) {
    const p = eOut(prog(lt, .06, .46)); if (p <= 0) return;
    const st = TYPE.label, wi = measure(index, st).total, wn = measure(name, st).total, w = 30 + wi + 37 + wn + 30;
    x.save(); x.beginPath(); x.rect(MARGIN, 312, w * p, 60); x.clip(); round(MARGIN, 312, w, 60, 30, ACCENT);
    text(index, MARGIN + 30, 353, st, rgba(C.dark, .62)); round(MARGIN + 30 + wi + 18, 331, 1.5, 22, 1, rgba(C.dark, .35)); text(name, MARGIN + 30 + wi + 37, 353, st, C.dark);
    x.restore();
  }
  // Chat-style headline: the lead line arrives as an incoming message, a typing indicator follows, then the key line is the reply.
  function bubbles(lead, key, { leadStart = .1, keyStart = .3, shake = 0 } = {}) {
    const ls = { ...TYPE.title, size: 62 }, ks = fitted(key || '', { ...TYPE.display, size: 108 }, 800), seed = Math.floor(t * 30);
    const jx = shake ? (rnd(seed * 5.1) - .5) * 70 * shake : 0, jy = shake ? (rnd(seed * 2.3) - .5) * 26 * shake : 0, lp = eBack(prog(lt, leadStart, leadStart + .4));
    if (lp > 0) {
      const lw = measure(lead, ls).total + 84;
      x.save(); x.translate(MARGIN + jx, 1262 + jy); x.scale(lp, lp);
      x.beginPath(); x.roundRect(0, -108, lw, 108, [44, 44, 44, 12]); x.fillStyle = 'rgba(34,27,44,.94)'; x.fill(); x.strokeStyle = 'rgba(255,255,255,.16)'; x.lineWidth = 2; x.stroke();
      text(lead, 42, -36, ls, C.ink); x.restore();
    }
    if (!key) return;
    const kp = eBack(prog(lt, keyStart, keyStart + .42)), typing = Math.max(keyStart - .55, leadStart + .25);
    if (kp <= 0 && lt > typing) {
      A(eOut(prog(lt, typing, typing + .2)), () => {
        x.save(); x.translate(1008, 1478); x.beginPath(); x.roundRect(-176, -96, 176, 96, [48, 48, 12, 48]); x.fillStyle = rgba(C.pink, .9); x.fill();
        x.fillStyle = '#fff'; for (let d = 0; d < 3; d++) { x.beginPath(); x.arc(-130 + d * 42, -48 - 12 * Math.abs(Math.sin(lt * 9 - d * .9)), 11, 0, Math.PI * 2); x.fill(); }
        x.restore();
      });
    }
    if (kp > 0) {
      const kw = measure(key, ks).total + 104;
      x.save(); x.translate(1008, 1478); x.scale(kp, kp);
      x.save(); x.shadowColor = rgba(C.pink, .45); x.shadowBlur = 40; x.beginPath(); x.roundRect(-kw, -172, kw, 172, [60, 60, 14, 60]); x.fillStyle = C.pink; x.fill(); x.restore();
      text(key, -kw + 52, -54, ks, '#fff'); x.restore();
    }
  }
  function headline(lead, key, { keyStart = .3, mode = 'rise', stagger = .04 } = {}) {
    if (BUBBLES) { bubbles(lead, key, { keyStart }); return; }
    chars(lead, MARGIN, LEAD_Y, TYPE.lead, C.ink, .1);
    if (key) chars(key, MARGIN, KEY_Y, TYPE.display, C.pink, keyStart, { mode, stagger });
  }

  /* ---------- intro: the scene lands on the beat under a badge and the headline ---------- */
  function intro() {
    const a0 = cues.introArt, p = eOut(prog(t, a0 - .1, a0 + .5)), v = viewOf(lerp(1.22, 1.06, p));
    paint(DECK.intro.scene, v, { alpha: p });
    if (t >= a0) lit(() => glow(540, 760, 700, '#ffffff', .22 * (1 - prog(t, a0, a0 + .4))));
    scrims();
    const bp = eBack(prog(lt, 0, .34)), badge = { ...TYPE.label, family: 'D', track: .06 }, bw = measure(DECK.badge, badge).total + 96;
    A(prog(lt, 0, .08), () => {
      x.save(); x.translate(MARGIN + bw / 2, 350); x.scale(bp, bp);
      round(-bw / 2, -34, bw, 68, 34, C.pink);
      x.beginPath(); x.arc(-bw / 2 + 34, 0, 9, 0, Math.PI * 2); x.fillStyle = rgba('#ffffff', .55 + .45 * Math.sin(lt * 9)); x.fill();
      text(DECK.badge, 16, 9, badge, '#fff', 'center'); x.restore();
    });
    const lp = eOut(prog(lt, .18, .6));
    A(lp, () => { x.save(); x.translate((1 - lp) * -30, 0); x.beginPath(); x.roundRect(MARGIN + bw + 18, 316, 306, 68, 34); x.strokeStyle = rgba(C.rose, .8); x.lineWidth = 2; x.stroke(); text(`${VERSION} 업데이트`, MARGIN + bw + 18 + 153, 361, { ...TYPE.label, weight: 600 }, C.rose, 'center'); x.restore(); });
    if (BUBBLES) { bubbles(DECK.intro.lead, DECK.intro.key, { leadStart: BEAT * .5, keyStart: BEAT * 2 }); return; }
    chars(DECK.intro.lead, MARGIN, LEAD_Y, TYPE.lead, C.ink, BEAT * .5);
    const w = chars(DECK.intro.key, MARGIN, KEY_Y, TYPE.display, C.pink, BEAT * 2);
    round(MARGIN, KEY_Y + 42, w * eOut(prog(lt, BEAT * 2.6, BEAT * 3.6)), 8, 4, C.lime);
  }

  /* ---------- feature slots ---------- */
  function feature() {
    const fx = { shelves, frames, drops, count, charge, looks, lock }[slot.fx];
    fx();
    label(`0${slotIndex + 1}`, slot.name);
  }

  // Gifts pop onto the display shelves on sixteenth notes, cheapest on the front shelf.
  function shelves() {
    const v = viewOf(slot.z ?? 1.06, 0);
    paint(slot.scene, v);
    inScene(v, () => slot.shelves.forEach(([sy, x0, x1, size], r) => {
      for (let c = 0; c < 5; c++) {
        const gi = r * 5 + c, tp = cues.giftPops[gi], p = prog(t, tp, tp + .36); if (p <= 0 || !ICONS[gi]) continue;
        const px = x0 + (x1 - x0) * (c + .5) / 5, s = size * eBack(p) * (1 + .04 * k), q = prog(t, tp, tp + .42);
        ring(px, sy - size * .45, lerp(30, 110, eOut(q)), '#ffffff', 3, .9 * (1 - q));
        x.save(); x.translate(px, sy - 3); x.scale(1, .22); x.beginPath(); x.arc(0, 0, s * .34, 0, Math.PI * 2); x.fillStyle = 'rgba(60,0,40,.38)'; x.fill(); x.restore();
        x.drawImage(assets.gifts[ICONS[gi]], px - s / 2, sy - s * .92, s, s);
      }
    }));
    scrims();
    const landed = cues.giftPops.filter(p => t >= p).length;
    if (landed) {
      const wide = figures(String(landed), MARGIN, NOTE_Y - 20, { ...TYPE.display, size: 96 }, C.pink);
      text(slot.note, MARGIN + wide + 20, NOTE_Y - 20, { ...TYPE.title, size: 48 });
    }
    headline(slot.lead, slot.key);
  }

  // Gifts take turns appearing inside the scene's display frames, one per sixteenth note.
  function frames() {
    const v = viewOf(slot.z ?? 1.06, 0);
    paint(slot.scene, v);
    inScene(v, () => slot.frames.forEach(([cx, cy, size], f) => {
      const shown = cues.giftPops.map((tp, i) => [tp, i]).filter(([tp, i]) => i % slot.frames.length === f && t >= tp).pop(); if (!shown) return;
      const [tp, gi] = shown, p = prog(t, tp, tp + .3), q = prog(t, tp, tp + .4); if (!ICONS[gi]) return;
      ring(cx, cy, lerp(size * .4, size * .85, eOut(q)), '#ffffff', 3, .9 * (1 - q));
      gift(ICONS[gi], cx, cy, size * eBack(p), (1 - eOut(p)) * -.5);
    }));
    scrims();
    headline(slot.lead, slot.key);
  }

  // Gifts fly into the album one beat apart and stay where they land.
  function drops() {
    const v = viewOf(slot.z ?? 1.06), ids = DROP_ICONS;
    const last = cues.albumDrops.filter(d => t >= d).pop();
    paint(slot.scene, v);
    // With `absorb` the album swallows each gift; otherwise the gift stays in its slot.
    if (!slot.absorb) inScene(v, () => cues.albumDrops.forEach((L, n) => { if (t >= L && ids[n]) gift(ids[n], slot.targets[n][0], slot.targets[n][1], slot.icon * (1 + .5 * Math.exp(-(t - L) * 12))); }));
    cues.albumDrops.forEach((L, n) => {
      if (!ids[n]) return;
      const q = prog(t, L - .55, L), [tx, ty] = toFrame(v, ...slot.targets[n]), side = n % 2 ? 1 : -1;
      if (q > 0 && q < 1) {
        const sx = side > 0 ? 1200 : -120, sy = 420 + n * 50, mx = (sx + tx) / 2, my = Math.min(sy, ty) - 300;
        for (let g = 3; g >= 0; g--) {
          const e = eInOut(clamp(q - g * .05)), u = 1 - e;
          A((g ? .22 / g : 1) * (1 - prog(q, .92, 1)), () => gift(ids[n], u * u * sx + 2 * u * e * mx + e * e * tx, u * u * sy + 2 * u * e * my + e * e * ty, lerp(230, slot.icon * v.s, e), u * 1.6 * side));
        }
      }
      const b = prog(t, L, L + .55);
      if (t >= L && b < 1) { ring(tx, ty, lerp(30, 150, eOut(b)), '#ffffff', 5, 1 - b); A(1 - prog(b, .55, 1), () => text('+1', tx + 30, ty - 60 - 70 * eOut(b), { ...TYPE.title, weight: 700 }, C.lime)); }
    });
    if (last !== undefined) lit(() => { const [ax, ay] = toFrame(v, 512, 660); glow(ax, ay, 420, '#ffffff', .16 * Math.exp(-(t - last) * 7)); });
    scrims();
    headline(slot.lead, slot.key, { keyStart: .34, mode: 'drop', stagger: .12 });
  }

  // The key line is the number itself: it counts up to 1,000 and lands on the bar.
  function count() {
    const v = viewOf(slot.z ?? 1.06);
    paint(slot.scene, v); scrims();
    chars(slot.lead, MARGIN, LEAD_Y, TYPE.lead, C.ink, .1);
    const to = slot.to ?? 1000, show = n => n.toLocaleString('en-US'), val = Math.round(to * eInOut(prog(t, cues.countStart, cues.countEnd))), done = t >= cues.countEnd;
    const sc = eBack(prog(lt, .2, .6)) * (done ? 1 + .12 * Math.exp(-(t - cues.countEnd) * 9) : 1);
    if (sc > 0) {
      const st = TYPE.display, full = figures(show(to), -9999, 0, st, C.pink); // measured off-canvas
      x.save(); x.translate(MARGIN, KEY_Y); x.scale(sc, sc); figures(show(val), 0, 0, st, C.pink); x.restore();
      A(prog(t, cues.countEnd - .05, cues.countEnd + .3), () => text(slot.unit, MARGIN + full + 20, KEY_Y, TYPE.title));
    }
    if (done) {
      const q = prog(t, cues.countEnd, cues.countEnd + .8);
      ring(330, KEY_Y - 60, lerp(120, 620, eOut(q)), C.rose, 6, 1 - q);
      for (let n = 0; n < 12; n++) { const a = n / 12 * Math.PI * 2 + .3, d = eOut(q) * (300 + rnd(n) * 220); A(1 - q, () => sparkle(330 + Math.cos(a) * d, KEY_Y - 60 + Math.sin(a) * d, 34 * (1 - q * .5), a, n % 3 ? '#ffffff' : C.lime)); }
    }
  }

  // A gauge fills, then confirms: candy topped up, or the call screen staying on.
  // In the third slot it lands with the count-up chime; in the fourth, with the blip.
  function charge() {
    const v = viewOf(slot.z ?? 1.06), blip = slotIndex === 2 ? cues.countEnd : cues.playBlip, done = t >= blip, fill = done ? 1 : eInOut(prog(t, scene.a + .2, blip)) * .92;
    paint(slot.scene, v);
    if (done) lit(() => glow(540, 760, 620, '#ffffff', .28 * (1 - prog(t, blip, blip + .4))));
    scrims();
    const p = eOut(prog(lt, .16, .56)), gw = 620, gy = NOTE_Y - 44;
    A(p, () => {
      x.save(); x.translate((1 - p) * -30, 0);
      round(MARGIN, gy, gw, 76, 38, 'rgba(255,255,255,.16)');
      x.save(); x.beginPath(); x.roundRect(MARGIN, gy, gw, 76, 38); x.clip(); round(MARGIN, gy, gw * fill, 76, 0, done ? C.lime : C.pink); x.restore();
      text(slot.gauge[done ? 1 : 0], MARGIN + 34, gy + 53, { ...TYPE.body, weight: 600, size: 38 }, done ? C.dark : '#fff');
      x.restore();
    });
    if (done) {
      const q = prog(t, blip, blip + .7), cx = MARGIN + gw, cy = gy + 38;
      ring(cx, cy, lerp(40, 260, eOut(q)), C.lime, 5, 1 - q);
      for (let n = 0; n < 8; n++) { const a = n / 8 * Math.PI * 2, d = eOut(q) * (120 + rnd(n) * 120); A(1 - q, () => sparkle(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 26 * (1 - q * .5), a, n % 2 ? '#ffffff' : C.lime)); }
    }
    headline(slot.lead, slot.key, { keyStart: blip - scene.a - .05 });
  }

  // The look of the whole scene changes as each chip lights up, wiping across like a compare slider.
  function looks() {
    const v = viewOf(slot.z ?? 1.06), steps = cues.filterSteps.slice(0, slot.looks.length), n = steps.filter(s => t >= s).length;
    const q = n ? eInOut(prog(t, steps[n - 1], steps[n - 1] + .4)) : 1, wipeX = lerp(-40, W + 40, q), look = i => (i > 0 ? slot.looks[i - 1][1] : null);
    paint(slot.scene, v, { filter: look(n), x1: wipeX }); if (n) paint(slot.scene, v, { filter: look(n - 1), x0: wipeX });
    if (n && q < 1) lit(() => { const g = x.createLinearGradient(wipeX - 60, 0, wipeX + 60, 0); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.5, 'rgba(255,255,255,.75)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(wipeX - 60, 200, 120, 960); });
    if (slot.shutter && t >= cues.shutter) flash(.42 * (1 - eOut(prog(t, cues.shutter, cues.shutter + .22))));
    scrims();
    const chip = { ...TYPE.body, weight: 600 }; let px = MARGIN;
    slot.looks.forEach(([name], i) => {
      const e = eOut(prog(lt, BEAT * 1.2 + i * .1, BEAT * 1.2 + i * .1 + .4)), on = i === n - 1;
      const cw = measure(name, chip).total + 68, sc = on ? 1 + .12 * Math.exp(-(t - steps[i]) * 10) : 1, left = px;
      A(e, () => {
        x.save(); x.translate(left + cw / 2, NOTE_Y - 14 + (1 - e) * 40); x.scale(sc, sc);
        if (on) round(-cw / 2, -44, cw, 88, 44, C.pink); else { round(-cw / 2, -44, cw, 88, 44, 'rgba(9,8,12,.5)'); x.beginPath(); x.roundRect(-cw / 2, -44, cw, 88, 44); x.strokeStyle = 'rgba(255,255,255,.4)'; x.lineWidth = 2; x.stroke(); }
        text(name, 0, 16, chip, on ? '#fff' : C.ink, 'center'); x.restore();
      });
      px += cw + 18;
    });
    headline(slot.lead, slot.key);
  }

  // Unstable until the lock: the scene and the lead line glitch, then everything settles and the key line lands.
  function lock() {
    const v = viewOf(slot.z ?? 1.06), at0 = cues.lockIn, locked = t >= at0, burst = cues.glitches.some(g => t >= g && t < g + .09), seed = Math.floor(t * 30);
    paint(slot.scene, v, { filter: locked ? null : 'saturate(.3) brightness(.8)', dx: burst ? (rnd(seed * 3.1) - .5) * 70 : 0, alpha: locked ? 1 : burst ? .65 : .9 });
    if (locked) lit(() => glow(540, 760, 640, '#ffffff', .24 * (1 - prog(t, at0, at0 + .4))));
    if (slot.rings) { const [rx, ry] = toFrame(v, ...slot.rings); [at0, ...cues.pings, at(13, 3)].forEach((rt, n) => { const q = prog(t, rt, rt + 1.2); if (t >= rt) ring(rx, ry, lerp(60, 720, eOut(q)), n % 2 ? C.lav : '#ffffff', 5, .7 * (1 - q)); }); }
    if (slot.panels) {
      // Two panels that overlap and jitter, then snap into an aligned stack and fade.
      const snap = eBack(prog(t, at0, at0 + .35)), off = (1 - snap) * (60 + (burst ? (rnd(seed * 1.7) - .5) * 80 : 0)), fade = 1 - prog(t, at0 + .9, at0 + 1.5);
      A(fade * eOut(prog(lt, .1, .4)), () => {
        x.save(); x.translate(540, 900);
        [[-off, -120 + off * .6, C.lav], [off, 120 - off * .6, C.rose]].forEach(([dx, dy, color]) => { x.beginPath(); x.roundRect(-330 + dx, dy - 96, 660, 192, 36); x.fillStyle = rgba(color, .26); x.fill(); x.strokeStyle = rgba(color, .9); x.lineWidth = 4; x.stroke(); });
        x.restore();
      });
    }
    scrims();
    if (slot.trace) {
      const calm = prog(t, at0 - .05, at0 + .3);
      x.save(); x.beginPath();
      for (let i = 0; i <= 156; i++) {
        const px = MARGIN + i * 6, noise = (rnd(Math.floor(t * 24) * 13 + i * 1.7) - .5) * 110 * (1 - calm) * (burst ? 1.5 : .7), wave = 16 * Math.sin(i * .12 - t * 7) * calm;
        if (i) x.lineTo(px, 1150 + noise + wave); else x.moveTo(px, 1150 + noise + wave);
      }
      x.strokeStyle = locked ? C.pink : 'rgba(255,255,255,.7)'; x.lineWidth = 6; x.lineJoin = 'round'; x.lineCap = 'round'; if (locked) { x.shadowColor = C.pink; x.shadowBlur = 22; } x.stroke(); x.restore();
    }
    const amt = locked ? 0 : burst ? 1 : .1;
    if (BUBBLES) { bubbles(slot.lead, slot.key, { leadStart: .03, keyStart: at0 - scene.a + .02, shake: amt }); return; }
    // The lead line glitches in slices until the lock.
    const st = fitted(slot.lead, TYPE.lead, COLUMN);
    if (lt > .03) {
      const top = LEAD_Y - st.size * .95, band = st.size * 1.3 / 6;
      for (let b = 0; b < 6; b++) {
        const off = (rnd(seed * 7.3 + b) - .5) * 110 * amt;
        x.save(); x.beginPath(); x.rect(0, top + b * band, W, band + 1); x.clip();
        if (amt > 0) { x.globalAlpha = .8 * amt; text(slot.lead, MARGIN + off + 10, LEAD_Y, st, C.pink); text(slot.lead, MARGIN + off - 10, LEAD_Y, st, C.lav); x.globalAlpha = 1; }
        text(slot.lead, MARGIN + off, LEAD_Y, st, C.ink); x.restore();
      }
    }
    chars(slot.key, MARGIN, KEY_Y, TYPE.display, C.pink, at0 - scene.a + .02);
  }

  /* ---------- outro: one feature per beat, then the version slams in ---------- */
  function outro() {
    const f0 = at(15, 2), idx = cues.recapHits.filter(h => t >= h).length - 1;
    if (t < f0 && idx >= 0) {
      const hit = cues.recapHits[idx], q = prog(t, hit, hit + BEAT), feat = DECK.slots[idx], ts = lerp(1.22, 1, eOut(prog(q, 0, .4)));
      const z = lerp(1.2, 1.06, eOut(prog(q, 0, .55))), s = H / 1536 * z, v = { s, tx: (W - 1024 * s) / 2, ty: -(1536 * s - H) * .3 };
      paint(feat.scene, v); scrims();
      text(`0${idx + 1} / 0${DECK.slots.length}`, 540, 1290, { ...TYPE.label, track: .1 }, C.rose, 'center');
      if (BUBBLES) {
        const ks = { ...TYPE.display, size: 120 }, kw = measure(feat.name, ks).total + 116, fill = idx % 2 ? C.pink : C.lav;
        x.save(); x.translate(540, KEY_Y + 14); x.scale(ts, ts); x.beginPath(); x.roundRect(-kw / 2, -186, kw, 186, [64, 64, 16, 64]); x.fillStyle = fill; x.fill(); text(feat.name, 0, -58, ks, idx % 2 ? '#fff' : C.dark, 'center'); x.restore();
      } else { x.save(); x.translate(540, KEY_Y); x.scale(ts, ts); text(feat.name, 0, 0, TYPE.display, idx % 2 ? C.pink : C.ink, 'center'); x.restore(); }
      flash(.24 * (1 - prog(q, 0, .3)));
    }
    if (t >= f0) {
      const p = eBack(prog(t, f0, f0 + .42)), hero = TYPE.hero, hw = measure(VERSION, hero).total;
      lit(() => glow(540, 800, 760, C.pink, .26 * clamp(p)));
      for (let g = 1; g <= 3; g++) {
        const s = p * (1 + g * .13 * eOut(prog(t, f0 + g * .05, f0 + .9))); if (s <= 0) continue;
        x.save(); x.translate(540, 900); x.scale(s, s); font(hero); x.letterSpacing = `${hero.track * hero.size}px`; x.textAlign = 'left'; x.lineWidth = 3; x.strokeStyle = rgba(C.rose, .34 / g); x.strokeText(VERSION, -hw / 2, 0); x.restore();
      }
      if (p > 0) { x.save(); x.translate(540, 900); x.scale(p, p); bloom(hero, C.pink); text(VERSION, 0, 0, hero, C.pink, 'center'); x.restore(); }
      chars(DECK.closing, 540, 1050, TYPE.title, C.ink, f0 - scene.a + .16, { align: 'center', stagger: .025 });
    }
  }

  /* ---------- end card: the brand mark alone (do not typeset the name unless an official wordmark asset exists) ---------- */
  function end() {
    const q = prog(lt, 0, .9), lp = eBack(prog(lt, 0, .6));
    lit(() => glow(540, 900, 820, C.pink, .34 * eOut(prog(lt, 0, .5)) * (.85 + .15 * Math.sin(lt * 2.4))));
    ring(540, 900, lerp(90, 1000, eOut(q)), C.rose, 7, 1 - q); ring(540, 900, lerp(60, 760, eOut(prog(lt, .12, 1.1))), C.lav, 4, .8 * (1 - prog(lt, .12, 1.1)));
    for (let n = 0; n < 28; n++) {
      const a = n / 28 * Math.PI * 2 + rnd(n), d = eOut(prog(lt, 0, 1.2)) * (320 + rnd(n + .3) * 460), px = 540 + Math.cos(a) * d, py = 900 + Math.sin(a) * d + 70 * lt * lt, s = 30 + rnd(n + .6) * 40;
      A(prog(lt, 0, .1) * (1 - prog(lt, .8, 1.9)), () => { if (n % 2) sparkle(px, py, s * .7, lt * 2 + n, n % 3 ? '#ffffff' : C.lime); else heart(px, py, s, Math.sin(lt * 3 + n) * .4, [C.pink, C.rose, C.lav][n % 3]); });
    }
    if (!assets.logo) return; // supply logo.png: the end card is the brand mark
    const h = 300 * lp * (1 + .02 * Math.sin(lt * 3)), w = assets.logo.width * h / assets.logo.height;
    if (h > 0) x.drawImage(assets.logo, 540 - w / 2, 900 - h / 2, w, h);
  }
}

window.motion = {
  W, H, FPS, DURATION, FRAMES: Math.round(DURATION * FPS), SCENES: TL.scenes, SET,
  ready: loadAssets(),
  draw(canvas, t) { drawFrame(canvas.getContext('2d'), t); }
};
