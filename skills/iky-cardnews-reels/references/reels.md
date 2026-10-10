# Reels

A reel is a separate piece of motion design that shares the carousel's facts, copy voice, typefaces and scenes. A card with fade-ins on a timeline is not a reel.

## Timeline first

`assets/templates/reel/timeline.js` is the single source of timing: a tempo, bars, scene boundaries and named cues. Picture and sound both read it, so every cut and effect lands on the music. The template runs 140 BPM for 17.5 bars (30.0s): a two-bar intro, six two-bar feature slots, a two-bar recap and an end card.

Each feature slot owns one cue pattern:

| Slot | Cue pattern | Choreography in the template (`fx`) |
| --- | --- | --- |
| 1 | 15 pops on sixteenth notes | `shelves` (icons pop onto a display) or `frames` (icons take turns in frames) |
| 2 | 5 drops, one per beat | `drops` (icons fly into a target and stay) |
| 3 | count-up landing on the bar | `count` (the key line is a number counting up) |
| 4 | one bright blip | `charge` (a gauge fills, then confirms) |
| 5 | shutter and three steps | `looks` (the scene's look wipes across as chips light up) |
| 6 | three glitches, then a lock | `lock` (scene and lead line glitch until they settle) |

Map each feature to the slot whose motion says what the feature does. Write new choreography when none fits; do not force a feature into a motion that misdescribes it. Keep explanatory graphics (gauges, chips, counters, traces) clearly diagrammatic and say in the notes that they are not captured app states.

## Sibling reels

Two reels for one release are siblings, not twins. Give each its own treatment of at least the headline, the transitions, the floating motif, the accent colour and the tune, while keeping the typefaces and scene style shared. The template's `style` field does this: `stage` (kinetic type, stripe wipes, rising hearts) and `bubbles` (the headline as a chat exchange with a typing indicator, an iris wipe, floating message bubbles). `audio.js` carries a second harmony and melody (`?tune=b`) over the same cues; render and mux one soundtrack per reel.

## Frame design

- Every frame is a pure function of time, drawn on a 1080x1920 canvas. No wall-clock state.
- A scene fills the frame by height with a slow push-in; overlays that belong to the scene are drawn through the same transform.
- Headline pair at the foot, section pill and small readouts at the top, effects in the middle. See the type scale.
- Cuts use a three-stripe wipe; the recap starts on a hard flash cut so its first beat is visible.
- The recap shows one feature per beat, then the version number. The end card is the brand mark alone.
- Scale and light breathe slightly on the kick pattern.

## Soundtrack

`assets/templates/reel/audio.js` synthesizes the whole track with an `OfflineAudioContext`: no samples and no licensed music. It contains a pad, bass, kick, clap, hats and a bell melody over a four-bar loop, plus one effect per cue (whooshes on cuts, pitched pops, plops, count ticks and a chime, a blip, a shutter, glitches and a lock tone, recap hits, a final chime). Gains live in one table at the top.

Nobody in this pipeline can hear the result, so mix by measurement with `scripts/bands.mjs`:

- sample peak between -3 and -1 dBFS, no clipped samples;
- groove RMS around -17 dBFS;
- the intro clearly quieter than the drop (about 8 dB) and without bass;
- the kick standing out of the sub band by several dB against the moment before it;
- no band wildly out of line (a first render is usually bass-heavy and dull: cut bass, raise drums and hats).

State in the hand-off that the audio was measured, not listened to, and offer to swap in a supplied track.

## Render pipeline (macOS, nothing installed)

With `scripts/export-server.mjs` serving the folder that contains `reel/`:

```sh
export PLAYWRIGHT_DIR=<an existing node_modules that contains playwright>
export CHROMIUM_PATH=<the cached Chromium binary>
node scripts/audio.mjs soundtrack.wav
afconvert -f m4af -d aac -b 192000 soundtrack.wav soundtrack.m4a
MOTION_URL='http://127.0.0.1:4795/reel/index.html?t=0&set=<set>' node scripts/capture.mjs <frames> all 4
swift scripts/encode.swift <frames> <video.mp4> 30
swift scripts/mux.swift <video.mp4> soundtrack.m4a <final.mp4>
swift scripts/verify.swift <final.mp4> <stills> 3.2 9.9 16.8 23.4 27.2
```

Render check stills (`capture.mjs <dir> stills <seconds...>` and `sheet.mjs`) before the full render, at least one per scene and one inside a transition. Delete frame folders afterwards; they run to more than a gigabyte.

On another platform, keep the capture step and replace the Swift encoders with an encoder that already exists there. Do not install one without the user's approval.
