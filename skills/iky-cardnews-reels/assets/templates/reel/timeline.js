/* Shared beat grid for the reels. Picture (render.js) and sound (audio.js) both read these cues,
   so every cut and effect lands on the music. 140 BPM, 17.5 bars = 30.0s.
   A reel is: two opening bars, six two-bar feature slots, two closing bars and an end card.
   Each slot carries one cue pattern (pops, drops, count, blip, steps, lock). Sibling reels reorder the patterns and
   swap what the opening and closing bars do, so they do not play out in the same sequence. */
(() => {
  const BPM = 140, BEAT = 60 / BPM, BAR = BEAT * 4, FPS = 30;
  // beat is 0-based inside the bar and may run past 4 into the next bar.
  const at = (bar, beat = 0) => bar * BAR + beat * BEAT;
  const set = new URLSearchParams(location.search).get('set') || '';
  // Cue pattern per feature slot, by reel. The deck in render.js must list its features in the same order.
  // Example for a second reel: const ORDERS = { second: ['blip', 'steps', 'pops', 'count', 'drops', 'lock'] };
  const ORDERS = {};
  const ORDER = ORDERS[set] || ['pops', 'drops', 'count', 'blip', 'steps', 'lock'];
  // Reels that open with the six-beat list of features and close with the headline, instead of the other way round.
  const LIST_FIRST = [/* set names */].includes(set);
  const bar = kind => 2 + 2 * ORDER.indexOf(kind); // first bar of the slot that carries this pattern
  const scene = (id, start, bars) => ({ id, a: at(start), b: at(start + bars) });
  window.TIMELINE = {
    BPM, BEAT, BAR, FPS, at, ORDER, LIST_FIRST,
    DURATION: at(17, 2),
    scenes: [
      scene('intro', 0, 2), ...ORDER.map((kind, i) => ({ ...scene('slot' + i, 2 + 2 * i, 2), kind })), scene('outro', 14, 2),
      scene('end', 16, 1.5)
    ],
    cues: {
      introArt: at(0, 3),                 // opening scene lands
      riser: [at(1), at(2)],              // build into the drop
      drop: at(2),                        // full groove starts with the first feature
      cuts: [2, 4, 6, 8, 10, 12, 14, 16].map(b => at(b)), // scene changes (wipe / whoosh)
      giftPops: Array.from({ length: 15 }, (_, i) => at(bar('pops'), 1) + i * BEAT / 4), // 15 items, sixteenth notes
      albumDrops: [0, 1, 2, 3, 4].map(k => at(bar('drops'), 2 + k)), // items landing, one per beat
      countStart: at(bar('count'), 1), countEnd: at(bar('count') + 1), // a count-up or gauge that lands on the bar
      playBlip: at(bar('blip'), 2),       // one bright confirmation
      shutter: at(bar('steps'), 1),       // camera shutter (only where the picture shows one)
      hasShutter: !LIST_FIRST,
      filterSteps: [at(bar('steps'), 2), at(bar('steps') + 1), at(bar('steps') + 1, 2)], // look changes
      glitches: [.12, .38, .62].map(d => at(bar('lock')) + d), // unstable
      lockIn: at(bar('lock'), 2),         // becomes stable
      pings: [at(bar('lock') + 1), at(bar('lock') + 1, 2)], // calm pings
      // One feature per beat: the recap near the end, or the list that opens a list-first reel.
      recapHits: [0, 1, 2, 3, 4, 5].map(k => (LIST_FIRST ? at(0, 2 + k) : at(14, k))),
      closing: at(15, 2),                 // the version number slams in
      outroRiser: [at(15, 2), at(16)],
      logoHit: at(16)                     // end card
    }
  };
})();
