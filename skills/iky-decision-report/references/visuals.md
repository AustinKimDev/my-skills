# Visuals for decision reports

Load this when the report needs screenshots, device captures, diagrams or AI reference images. The template's classes and the two helpers in `scripts/` implement everything below.

## Pick the visual by the question

| The decision depends on | Use |
|---|---|
| How a screen, page or device state looks now or after a change | Real capture: `.shots` (desktop/web), `.shots.phones` (portrait), `.tag` 전/후 for before/after |
| Choosing between visual directions or screen variants | Image options (`.opts.vis` + `.vopt`), real captures first, AI references only when none exist |
| Structure, flow, dependencies, money or state lifecycle | `.diagram` SVG (boxes and arrows) or `.flow` chips |
| Numbers, ranks, test results | `.viz-bars` |
| Order of events | `.viz-timeline` |
| Two alternatives in words | `.viz-compare` |

A diagram does not replace a capture of a changed screen. When a capture is impossible (not deployed, no device, login required), keep the gallery slot out and write one `.note` naming the reason, for example `캡처 없음 — STAGE 미배포라 화면을 볼 수 없음`.

## Real captures

1. Capture with the selected runtime: the browser's screenshot command, `xcrun simctl io booted screenshot <file>` for an iOS Simulator, `adb exec-out screencap -p > <file>` for Android, or the OS screenshot tool for a window. Use only screens inside the task's scope; never capture private messages, credentials or another user's data.
2. Capture the element, not the whole page, when one area matters: scroll it into view, then take a viewport screenshot. Full-page modes in some runtimes return the first viewport repeated; inspect a full-page capture before using it.
3. When the runtime returns the image as base64 inside JSON, save it with `python3 scripts/report_assets.py decode result.json out.png` (`-` reads stdin).
4. Look at every capture before using it. Reject loading spinners, black tiles, wrong pages, stale states and overlays. Recapture rather than explain a bad image.
5. Put it in the report with `python3 scripts/report_assets.py add <report-dir> <image> --name <slug>`. It copies the file into `assets/`, downscales images wider than 1600 px when macOS `sips` exists, and prints the `src` to paste plus a hint when the image is portrait.
6. Write a caption that says what the image proves and where it came from (URL, build/update ID, device, time). Alt text describes the state shown, not "screenshot".

Reference images by relative path (`assets/…`) when the report folder is served over HTTP. For a single file to hand off, run `python3 scripts/report_assets.py inline <report.html>`; it writes `<name>-single.html` with data URIs. Never use `file:///` sources: a page served from `http://127.0.0.1` cannot load them.

## AI reference images

Use only when a decision compares visual directions (style, layout concept, illustration, marketing image) and no real capture or existing asset can show the options. Never use one where a real screen should be captured, never present one as product state, and never depict real people.

- Generate through [the image-generation runtime guide](../embedded/image-generation/GUIDE.md) with the image tool the environment provides; follow that environment's own image-tool instructions and authorization rules. Paid backends or new accounts need the user's approval.
- One image per option, same prompt structure across options so only the compared variable changes. Reuse an existing generated image rather than regenerating.
- Inspect each result; discard images with wrong copy, broken UI text or off-brief content.
- Save into `assets/` with `report_assets.py add`, then place it in a `figure.shot.ref` with the visible label `AI 생성 참고 이미지 · 실제 화면 아님` and the actual prompt in the `.prompt` details. In an image option, add "AI 참고 이미지" to the option's `<small>` line.
- If no image tool is available or generation fails, say so in the report and fall back to a diagram or a `.viz-compare`; do not substitute a hand-drawn mock presented as generated.

## Diagrams

Use `<svg class="viz-chart diagram" role="img">` with `<title>` and `<desc>`. Shapes: `rect.box` (`.hl` emphasis, `.good`, `.warn`), text `.ttl` / `.sm` / `.good-t` / `.warn-t`, and `path.arrow`, which uses the shared `#arrowhead` marker at the top of the template's body. Keep labels short enough to fit their box at the viewBox width, align side labels with their box's vertical center, and check the rendered page for overlaps.

## Check

`python3 scripts/preflight.py <report.html>` fails on missing, empty, out-of-folder or `file://` images, images without alt, and AI references without their label. It warns about oversized images, remote images and reports with no real capture. Then open the page and click one image to confirm the zoom view opens and closes with Esc.
