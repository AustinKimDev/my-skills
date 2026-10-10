/* Procedural soundtrack: 140 BPM kawaii future bass in C major, rendered offline with Web Audio.
   Every time comes from window.TIMELINE; all noise is seeded so renders are identical. */
(() => {
  const T = window.TIMELINE, SR = 48000, DUR = T.DURATION, { BEAT, BAR, at, cues } = T;
  // Gain staging knobs (linear). Tune these, not the instruments.
  const G = { master: 0.74, drums: 0.9, pad: 1.3, bass: 0.11, melody: 1.3, sfx: 0.5, reverb: 0.6, fx: 0.6 };

  const mtof = m => 440 * 2 ** ((m - 69) / 12);
  const mulberry = seed => () => {
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };

  // Chords: pad voicing + bass root (MIDI). Loop is IV-V-iii-vi; intro/outro use F then G.
  const F = { pad: [53, 57, 60, 64], root: 41 }, Gc = { pad: [55, 59, 62, 67], root: 43 };
  // A second harmony and tune over the same cues, for a sibling reel: ?tune=b turns the loop to vi-IV-I-V (A min, F, C, G).
  const TUNE_B = new URLSearchParams(location.search).get('tune') === 'b';
  const Am = { pad: [57, 60, 64, 67], root: 45 }, Cc = { pad: [55, 60, 64, 67], root: 36 };
  const LOOP = TUNE_B ? [Am, F, Cc, Gc] : [F, Gc, { pad: [52, 55, 59, 62], root: 40 }, { pad: [57, 60, 64, 69], root: 45 }];
  const EDGE = TUNE_B ? [Am, F] : [F, Gc]; // intro and outro bars
  const chordOf = b => b < 2 ? EDGE[b] : b >= 14 ? EDGE[b - 14] : LOOP[(b - 2) % 4];
  // Melody per chord, 8 eighth-note slots (0 = rest), chord tones + C pentatonic.
  const MEL = TUNE_B ? [
    [76, 72, 0, 69, 72, 0, 76, 0],
    [77, 0, 72, 69, 0, 72, 0, 77],
    [79, 76, 0, 72, 76, 0, 79, 0],
    [74, 0, 79, 0, 74, 71, 0, 74]
  ] : [
    [81, 0, 76, 72, 0, 76, 77, 0],
    [79, 0, 74, 0, 71, 74, 0, 79],
    [76, 0, 79, 83, 0, 79, 76, 0],
    [81, 0, 76, 0, 72, 76, 81, 0]
  ];
  const PENT = [0, 2, 4, 7, 9];

  async function renderSoundtrack() {
    const ctx = new OfflineAudioContext(2, Math.round(SR * DUR), SR);
    const rnd = mulberry(20261010);

    // ---- buffers (seeded) ----
    const noiseBuf = ctx.createBuffer(1, SR * 2, SR);
    { const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = rnd() * 2 - 1; }
    let noiseN = 0;
    const noise = (t, dur) => { // mono noise voice starting at a different offset each call
      const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
      s.start(t, (noiseN++ * 0.317) % 1.5); s.stop(t + dur); return s;
    };
    const irLen = Math.round(SR * 2.4), ir = ctx.createBuffer(2, irLen, SR);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < irLen; i++) {
        const x = i / irLen;
        d[i] = (rnd() * 2 - 1) * Math.exp(-5.5 * x) * Math.min(1, i / (SR * 0.012)) * (1 - x * 0.4);
      }
    }

    // ---- master chain ----
    const master = ctx.createGain(); master.gain.value = G.master;
    const dcBlock = ctx.createBiquadFilter(); dcBlock.type = 'highpass'; dcBlock.frequency.value = 28;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -9; comp.knee.value = 10; comp.ratio.value = 10; comp.attack.value = 0.004; comp.release.value = 0.14;
    const fade = ctx.createGain();
    fade.gain.setValueAtTime(1, DUR - 0.6); fade.gain.linearRampToValueAtTime(0, DUR);
    master.connect(dcBlock); dcBlock.connect(comp); comp.connect(fade); fade.connect(ctx.destination);

    const conv = ctx.createConvolver(); conv.buffer = ir;
    const revIn = ctx.createGain(), revLP = ctx.createBiquadFilter(), revOut = ctx.createGain();
    revLP.type = 'lowpass'; revLP.frequency.value = 7000; revOut.gain.value = G.reverb;
    revIn.connect(conv); conv.connect(revLP); revLP.connect(revOut); revOut.connect(master);

    const bus = (gain) => { const g = ctx.createGain(); g.gain.value = gain; g.connect(master); return g; };
    const drumBus = bus(G.drums), fxBus = bus(G.fx), sfxBus = bus(G.sfx);
    const duck = ctx.createGain(); duck.connect(master); // sidechain target for pad/bass/melody
    const padBus = ctx.createGain(); padBus.gain.value = G.pad; padBus.connect(duck);
    const bassBus = ctx.createGain(); bassBus.gain.value = G.bass; bassBus.connect(duck);
    const melBus = ctx.createGain(); melBus.gain.value = G.melody; melBus.connect(duck);

    // Channel strip: optional pan and reverb send. Returns the input node.
    const chan = (dest, pan = 0, send = 0) => {
      const g = ctx.createGain(); let n = g;
      if (pan) { const p = ctx.createStereoPanner(); p.pan.value = pan; g.connect(p); n = p; }
      n.connect(dest);
      if (send) { const s = ctx.createGain(); s.gain.value = send; g.connect(s); s.connect(revIn); }
      return g;
    };
    // Attack/exponential-decay envelope on a gain param.
    const env = (p, t, a, peak, d) => {
      p.setValueAtTime(0, t); p.linearRampToValueAtTime(peak, t + a); p.exponentialRampToValueAtTime(0.0001, t + a + d);
    };
    // Oscillator with optional exponential pitch glide f -> f2 over `glide` seconds.
    const tone = (type, f, t, a, d, peak, out, f2, glide = 0.05) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.setValueAtTime(f, t);
      if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + glide);
      env(g.gain, t, a, peak, d);
      o.connect(g); g.connect(out); o.start(t); o.stop(t + a + d + 0.05);
      return o;
    };
    // Filtered noise burst with a fast attack and exponential decay.
    const burst = (t, a, d, peak, type, f, q, out, f2) => {
      const n = noise(t, a + d + 0.05), fl = ctx.createBiquadFilter(), g = ctx.createGain();
      fl.type = type; fl.frequency.setValueAtTime(f, t); fl.Q.value = q;
      if (f2) fl.frequency.exponentialRampToValueAtTime(f2, t + a + d);
      env(g.gain, t, a, peak, d);
      n.connect(fl); fl.connect(g); g.connect(out);
    };

    // ---- music instruments ----
    // Supersaw: 3 detuned saws per note, panned left/centre/right, low-passed.
    const supersaw = (midis, t, dur, level, cut0, cut1, out, rel = 0.12, decay = 0) => {
      [[-12, -0.5], [0, 0], [12, 0.5]].forEach(([det, pan]) => {
        const lp = ctx.createBiquadFilter(), g = ctx.createGain(), strip = chan(out, pan);
        lp.type = 'lowpass'; lp.Q.value = 0.4;
        lp.frequency.setValueAtTime(cut0, t); lp.frequency.exponentialRampToValueAtTime(cut1, t + dur);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(level, t + 0.05);
        if (decay) g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05 + decay);
        else { g.gain.setValueAtTime(level, t + dur - 0.02); g.gain.linearRampToValueAtTime(0, t + dur + rel); }
        lp.connect(g); g.connect(strip);
        midis.forEach(m => {
          const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m); o.detune.value = det;
          o.connect(lp); o.start(t); o.stop(t + (decay ? decay + 0.1 : dur + rel + 0.02));
        });
      });
    };
    const bass = (m, t, dur) => {
      [['sine', 0.7], ['triangle', 0.25]].forEach(([type, lv]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type; o.frequency.value = mtof(m);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(lv, t + 0.012);
        g.gain.setValueAtTime(lv, t + dur - 0.03); g.gain.linearRampToValueAtTime(0, t + dur + 0.04);
        o.connect(g); g.connect(bassBus); o.start(t); o.stop(t + dur + 0.1);
      });
    };
    const bell = (m, t, vel, pan, out = melBus, send = 0.4, d = 0.5) => {
      const strip = chan(out, pan, send), f = mtof(m);
      tone('triangle', f, t, 0.003, d, 0.38 * vel, strip);
      tone('sine', f * 2, t, 0.002, d * 0.5, 0.16 * vel, strip);
      tone('sine', f * 3, t, 0.002, d * 0.25, 0.07 * vel, strip);
    };

    // ---- drums ----
    const kick = t => {
      const out = chan(drumBus);
      tone('sine', 150, t, 0.002, 0.3, 0.95, out, 45, 0.2);
      tone('triangle', 900, t, 0.001, 0.012, 0.15, out);
    };
    const clap = t => {
      const out = chan(drumBus, 0, 0.3);
      [0, 0.011, 0.022].forEach((o, i) => burst(t + o, 0.001, i < 2 ? 0.012 : 0.16, 0.5, 'bandpass', 1700, 0.9, out));
      tone('sine', 200, t, 0.002, 0.06, 0.2, out, 150, 0.04);
    };
    const hat = (t, vel, pan, open = false) =>
      burst(t, 0.001, open ? 0.12 : 0.035, 0.5 * vel, 'highpass', 7500, 0.7, chan(drumBus, pan));
    const duckAt = (t) => { duck.gain.setValueAtTime(0.3, t); duck.gain.linearRampToValueAtTime(1, t + 0.25); };

    // ---- risers / impacts ----
    const riser = (t0, t1) => {
      const len = t1 - t0, out = chan(fxBus, 0, 0.2);
      const n = noise(t0, len + 0.05), bp = ctx.createBiquadFilter(), g = ctx.createGain();
      bp.type = 'bandpass'; bp.Q.value = 0.8;
      bp.frequency.setValueAtTime(400, t0); bp.frequency.exponentialRampToValueAtTime(9000, t1);
      g.gain.setValueAtTime(0, t0); g.gain.exponentialRampToValueAtTime(0.35, t1 - 0.01); g.gain.setValueAtTime(0, t1);
      n.connect(bp); bp.connect(g); g.connect(out);
      const o = ctx.createOscillator(), lp = ctx.createBiquadFilter(), og = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(220, t0); o.frequency.exponentialRampToValueAtTime(1760, t1);
      lp.type = 'lowpass'; lp.frequency.value = 2200;
      og.gain.setValueAtTime(0, t0); og.gain.linearRampToValueAtTime(0.09, t1 - 0.01); og.gain.setValueAtTime(0, t1);
      o.connect(lp); lp.connect(og); og.connect(out); o.start(t0); o.stop(t1 + 0.02);
    };
    const impact = t => {
      const out = chan(fxBus);
      tone('sine', 90, t, 0.003, 1.4, 0.9, out, 32, 0.9);
      [-0.5, 0.5].forEach(p => burst(t, 0.002, 2.4, 0.3, 'highpass', 4500, 0.7, chan(fxBus, p, 0.4)));
    };

    // ---- sound effects (all into sfxBus) ----
    const whoosh = (cut, dir) => {
      const t0 = cut - 0.25, t1 = cut + 0.1;
      const n = noise(t0, t1 - t0 + 0.05), bp = ctx.createBiquadFilter(), g = ctx.createGain();
      const p = ctx.createStereoPanner();
      bp.type = 'bandpass'; bp.Q.value = 1.1;
      bp.frequency.setValueAtTime(500, t0); bp.frequency.exponentialRampToValueAtTime(3800, t1);
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.5, cut - 0.03); g.gain.linearRampToValueAtTime(0, t1);
      p.pan.setValueAtTime(-0.5 * dir, t0); p.pan.linearRampToValueAtTime(0.5 * dir, t1);
      const s = ctx.createGain(); s.gain.value = 0.35; p.connect(s); s.connect(revIn);
      n.connect(bp); bp.connect(g); g.connect(p); p.connect(sfxBus);
    };
    const pop = (t, m, pan) => tone('sine', mtof(m) * 0.8, t, 0.002, 0.07, 0.5, chan(sfxBus, pan, 0.15), mtof(m), 0.03);
    const plop = (t, pan) => {
      const out = chan(sfxBus, pan, 0.15);
      tone('sine', 700, t, 0.003, 0.12, 0.5, out, 260, 0.09);
      tone('triangle', 5200, t + 0.01, 0.001, 0.02, 0.1, out);
    };
    const tick = (t, f, vel = 0.3, pan = 0) => tone('sine', f, t, 0.001, 0.025, vel, chan(sfxBus, pan));
    const chime = (t, ms, pan = 0) => ms.forEach((m, i) => bell(m, t + i * 0.07, 0.8, pan, sfxBus, 0.5, 0.9));
    const shutter = t => {
      const out = chan(sfxBus, 0.1);
      burst(t, 0.001, 0.012, 0.6, 'bandpass', 2800, 1.2, out);
      burst(t + 0.035, 0.001, 0.02, 0.5, 'bandpass', 2200, 1.2, out);
      tone('sine', 220, t, 0.001, 0.025, 0.3, out, 120, 0.02);
    };
    const glitch = (t, seed) => {
      const r = mulberry(seed), len = Math.round(SR * 0.09), buf = ctx.createBuffer(1, len, SR), d = buf.getChannelData(0);
      for (let i = 0; i < len; i += 5) { const v = (Math.floor(r() * 4) / 3) * 2 - 1; for (let k = 0; k < 5 && i + k < len; k++) d[i + k] = v; }
      const s = ctx.createBufferSource(), g = ctx.createGain(), out = chan(sfxBus, seed % 2 ? 0.3 : -0.3);
      s.buffer = buf; g.gain.setValueAtTime(0, t);
      for (let i = 0; i < 8; i++) { g.gain.setValueAtTime(i % 2 ? 0 : 0.25, t + i * 0.011); }
      g.gain.setValueAtTime(0, t + 0.09);
      s.connect(g); g.connect(out); s.start(t);
      const o = ctx.createOscillator(), og = ctx.createGain();
      o.type = 'square'; o.frequency.setValueAtTime(1320, t); o.frequency.setValueAtTime(880, t + 0.045);
      og.gain.setValueAtTime(0.07, t); og.gain.setValueAtTime(0, t + 0.07);
      o.connect(og); og.connect(out); o.start(t); o.stop(t + 0.1);
    };
    const lockIn = t => { // glide up into a clean note
      const out = chan(sfxBus, 0, 0.3);
      tone('sine', 200, t - 0.4, 0.05, 0.4, 0.4, out, 659, 0.4);
      tone('triangle', 400, t - 0.4, 0.05, 0.4, 0.15, out, 1318, 0.4);
      chime(t, [76, 83]);
    };
    const ping = (t, m, pan) => {
      const out = chan(sfxBus, pan, 0.6);
      tone('sine', mtof(m), t, 0.004, 0.4, 0.45, out);
      tone('sine', mtof(m) * 2, t, 0.004, 0.15, 0.08, out);
    };
    const recap = (t, k) => {
      const out = chan(sfxBus, (k - 2.5) * 0.08);
      burst(t, 0.001, 0.03, 0.45, 'bandpass', 3200, 1.5, out);
      tone('sine', 900 * 1.09 ** k, t, 0.001, 0.045, 0.3, out);
    };

    // ================= SCORE =================
    // Intro (bars 0-1): filtered pad, hats, riser. No bass, so the drop has somewhere to land.
    for (let b = 0; b < 2; b++) {
      supersaw(chordOf(b).pad, at(b), BAR, 0.032, b ? 1500 : 500, b ? 3500 : 1500, padBus, 0.15);
      for (let s = 0; s < 8; s++) {
        const dense = b === 1 && s >= 4 ? 2 : 1, tt = at(b, s / 2), vel = 0.25 + (b * 8 + s) * 0.03;
        if (b === 0 && s % 2) continue;
        hat(tt, vel, s % 2 ? 0.25 : -0.25);
        if (dense === 2) hat(tt + BEAT / 4, vel * 0.8, 0.3);
      }
    }
    riser(cues.riser[0], cues.riser[1]);
    impact(cues.drop);

    // Groove (bars 2-13) plus outro (14-15) share chord/drum code; outro bar 15 builds.
    const kicks = [];
    for (let b = 2; b < 16; b++) {
      const ch = chordOf(b), outro = b >= 14;
      supersaw(ch.pad, at(b), BAR, 0.05, 3000, 4800, padBus, 0.12);
      bass(ch.root, at(b), BEAT * 1.5); bass(ch.root, at(b, 1.5), BEAT * 2.5 - 0.02);
      if (b === 15) [0, 1, 2, 3].forEach(k => kicks.push(at(b, k))); else kicks.push(at(b), at(b, 1.5));
      if (b !== 15) clap(at(b, 2));
      else { clap(at(b, 3)); clap(at(b, 3.5)); }
      for (let s = 0; s < 8; s++) {
        const tt = at(b, s / 2), pan = s % 2 ? 0.3 : -0.2;
        if (b === 15) { for (let q = 0; q < 2; q++) hat(tt + q * BEAT / 4, (0.45 + (s * 2 + q) * 0.03), q ? 0.3 : -0.3); continue; }
        hat(tt, s % 2 ? 0.8 : 0.45, pan, s === 7 && b % 4 === 3);
        if ((b % 2 === 1 && s === 7) || (b % 4 === 3 && s === 3)) hat(tt + BEAT / 4, 0.4, -pan);
      }
    }
    kicks.forEach(t => { kick(t); duckAt(t); });

    // Melody: 3 passes of the 4-bar loop; pass 3 goes an octave up with an answer phrase.
    for (let b = 2; b < 14; b++) {
      const k = (b - 2) % 4, pass = Math.floor((b - 2) / 4), pat = MEL[k];
      pat.forEach((m, s) => {
        const tt = at(b, s / 2), pan = s % 2 ? 0.3 : -0.3, vel = s % 2 ? 0.7 : 1;
        if (m) bell(pass === 2 ? m + 12 : m, tt, vel * (pass === 0 ? 0.8 : 1), pan);
        else if (pass === 2 && (s === 3 || s === 7)) bell(pat[0], tt, 0.55, -pan, melBus, 0.5, 0.4);
      });
    }

    // Outro risers.
    riser(cues.outroRiser[0], cues.outroRiser[1]);

    // Logo hit: C maj9 stab, rising bell arpeggio, soft boom, reverb tail.
    const L = cues.logoHit;
    supersaw([48, 60, 64, 67, 71, 74], L, 2.2, 0.08, 4200, 1000, padBus, 0.1, 2.2);
    tone('sine', 62, L, 0.004, 0.9, 0.5, chan(fxBus), 38, 0.5);
    [72, 76, 79, 83, 86, 91].forEach((m, i) => bell(m, L + i * BEAT / 4, 0.9, (i % 2 ? 0.35 : -0.35), fxBus, 0.6, 1.4 + i * 0.1));

    // ---- SFX ----
    cues.cuts.forEach((c, i) => whoosh(c, i % 2 ? -1 : 1));
    cues.giftPops.forEach((t, i) => {
      const idx = Math.round(i * 9 / 14);
      pop(t, 72 + PENT[idx % 5] + 12 * Math.floor(idx / 5), (i % 2 ? 0.3 : -0.3));
    });
    cues.albumDrops.forEach((t, i) => plop(t, (i - 2) * 0.15));
    { const step = BEAT / 4, n = Math.round((cues.countEnd - cues.countStart) / step);
      for (let i = 0; i < n; i++) tick(cues.countStart + i * step, 1400 * 1.045 ** i, 0.2, i % 2 ? 0.15 : -0.15);
      chime(cues.countEnd, [79, 86]); }
    chime(cues.playBlip, [83, 91]);
    [88, 95].forEach((m, i) => tone('sine', mtof(m), cues.playBlip + 0.03 + i * 0.05, 0.003, 0.3, 0.06, chan(sfxBus, i ? 0.5 : -0.5, 0.5)));
    shutter(cues.shutter);
    cues.filterSteps.forEach((t, i) => tick(t, 2000 + i * 300, 0.25, 0.1));
    cues.glitches.forEach((t, i) => glitch(t, 7 + i));
    lockIn(cues.lockIn);
    cues.pings.forEach((t, i) => ping(t, i ? 88 : 81, i ? 0.3 : -0.3));
    cues.recapHits.forEach((t, k) => recap(t, k));
    [84, 88, 91].forEach((m, i) => bell(m, cues.introArt + i * 0.08, 0.6, (i - 1) * 0.4, sfxBus, 0.5, 0.7));

    return ctx.startRendering();
  }

  function wavBase64(buf) {
    const n = buf.length, bytes = new Uint8Array(44 + n * 4), dv = new DataView(bytes.buffer);
    const str = (o, s) => [...s].forEach((c, i) => dv.setUint8(o + i, c.charCodeAt(0)));
    str(0, 'RIFF'); dv.setUint32(4, 36 + n * 4, true); str(8, 'WAVEfmt ');
    dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 2, true);
    dv.setUint32(24, buf.sampleRate, true); dv.setUint32(28, buf.sampleRate * 4, true);
    dv.setUint16(32, 4, true); dv.setUint16(34, 16, true); str(36, 'data'); dv.setUint32(40, n * 4, true);
    const L = buf.getChannelData(0), R = buf.getChannelData(1);
    const q = x => Math.round(Math.max(-1, Math.min(1, x)) * 32767);
    for (let i = 0; i < n; i++) { dv.setInt16(44 + i * 4, q(L[i]), true); dv.setInt16(46 + i * 4, q(R[i]), true); }
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }

  window.renderSoundtrack = renderSoundtrack;
  window.soundtrackWavBase64 = async () => wavBase64(await renderSoundtrack());
})();
