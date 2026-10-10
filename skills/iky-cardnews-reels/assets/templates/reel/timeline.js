/* Shared beat grid for the reel. Picture (render.js) and sound (audio.js) both read these cues,
   so every cut and effect lands on the music. 140 BPM, 17.5 bars = 30.0s. */
(() => {
  const BPM = 140, BEAT = 60 / BPM, BAR = BEAT * 4, FPS = 30;
  // beat is 0-based inside the bar and may run past 4 into the next bar.
  const at = (bar, beat = 0) => bar * BAR + beat * BEAT;
  const scene = (id, bar, bars) => ({ id, a: at(bar), b: at(bar + bars) });
  window.TIMELINE = {
    BPM, BEAT, BAR, FPS, at,
    DURATION: at(17, 2),
    scenes: [
      scene('intro', 0, 2), scene('gifts', 2, 2), scene('gallery', 4, 2), scene('candy', 6, 2),
      scene('signature', 8, 2), scene('filter', 10, 2), scene('stability', 12, 2), scene('outro', 14, 2),
      scene('end', 16, 1.5)
    ],
    cues: {
      introArt: at(0, 3),                 // cover art lands
      riser: [at(1), at(2)],              // build into the drop
      drop: at(2),                        // full groove starts with the first feature
      cuts: [2, 4, 6, 8, 10, 12, 14, 16].map(bar => at(bar)), // scene changes (wipe / whoosh)
      giftPops: Array.from({ length: 15 }, (_, i) => at(2, 1) + i * BEAT / 4), // 15 gifts, sixteenth notes
      albumDrops: [0, 1, 2, 3, 4].map(k => at(4, 2 + k)), // gifts landing in the album, one per beat
      countStart: at(6, 1), countEnd: at(7), // 0 → 1,000 candy count-up, lands on the bar
      playBlip: at(8, 2),                 // signature starts playing
      shutter: at(10, 1),                 // camera shutter
      filterSteps: [at(10, 2), at(11), at(11, 2)], // filter look changes
      glitches: [at(12) + .12, at(12) + .38, at(12) + .62], // unstable signal
      lockIn: at(12, 2),                  // signal becomes stable
      pings: [at(13), at(13, 2)],         // calm signal pings
      recapHits: [0, 1, 2, 3, 4, 5].map(k => at(14, k)), // one feature flash per beat
      outroRiser: [at(15, 2), at(16)],
      logoHit: at(16)                     // end card
    }
  };
})();
