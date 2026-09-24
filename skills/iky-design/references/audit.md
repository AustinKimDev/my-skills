# Audit procedure

1. Declare scope: routes, components, states, target platforms, viewport, data fixture, locale, text scale, font load state, reduced motion, reference version/hash and explicit overrides. Inventory all requested components; mark absent ones failed, not out of scope.
2. Static checks: token drift, correct static font files/weights, typography roles, numeric alignment/sort, raw copy data, overflow mode, stable IDs, min44 targets, Lucide geometry, no scale press, actual motion engine, live error labels and overlay focus handling.
3. Behavior checks: default/focus/selected/disabled/loading/error; keyboard and touch; popup dismissal/focus restore; slider0/20/60/100; cumulative ratings1/4/5; quantity bounds; date/time commit/clear; file cancellation; table numeric sorting/filter/page/select/copy/wrap/scroll; chart zero/single/multiple and value access; animation interruption/reduced-motion.
4. Visual checks: capture reference and implementation at equal dimensions and state after fonts settle. Save baseline, actual and diff/overlay without replacing the accepted baseline. Inspect text baselines, tracking, wrapping, row/header alignment, face/hit dimensions, contact/ambient/inset shadows, subtle gradients and clipped popups. Test narrow and wide web plus actual required iOS/Android targets. Pixel differences from rasterization need visual review; do not hide structural differences behind a generous threshold.
5. Documentation checks: all situation-specific typography rules, depth recipes, motion rules, source links and exception notes retained. Every specimen calls a real reusable component; no WebView/bitmap substitution for native implementation.
6. Report each rule: rule ID | status | exact evidence | observation | repair. `pass` requires observed success. `fail` is observed mismatch. `unverified` means required evidence missing. `not-applicable` needs a reason. Separate known failures from environment blockers. Completion requires no required failures or unverified checks.
7. After authorized fixes rerun only affected checks plus relevant integration checks. Report the diff's runtime compatibility and deployment needs without executing deployment.


## Scoped regression checks for materials and trailing icons

Run the relevant rows when that component or material is in scope. These checks supplement the procedure; they do not convert a small fix into a mandatory full-app audit.

| Rule | Trigger and required observation | Failure evidence | Repair verification |
| --- | --- | --- | --- |
| COLOR-01 / COLOR-02 | Inspect primary action default/pressed colors from the rendered face, across the affected sizes. Read the current tokens rather than an old screenshot. Check composed label contrast separately. | Unexpected darker action token, missing face, or insufficient measured contrast. | Correct state colors and actual contrast evidence. Brand selection alone does not pass contrast. |
| COLOR-03 / CONTROL-07 | Inspect gradient-corner tones on neutral light/dark faces, actual nested foreground, composed text contrast, focus, disabled and busy states. | Saturated full-face color, white text on a neutral light face, semantic meaning conveyed only by hue, repeat activation or layout shift. | Agreement with the current tokens; measured composed contrast; keyboard/busy/disabled behavior and stable geometry. Explicitly filled brand actions retain their separately scoped white label contract. |
| DEPTH-06 | Compare the 09+04 directional perimeter and upper-left corner wash, neutral contact depth and all hover/press/reversal/reduced-motion states. | Gray-ended chromatic border, misaligned light origins, oversized full-face glow, clipped outer depth, added 09+06 colored shadow, or unverified native parity. | Correct gradient stops and clipping below content, neutral shadow interpolation, stable radius and face, no disabled light/elevation and actual target-specific evidence. |
| COLOR-01 / THEME-02 | Compare canvas, surface, card, muted, panel/card gradient endpoints and glass fill against the selected semantic set in tokens.json. Check retained gallery colors and displayed/copied material code in both appearances. | Old zinc surfaces mixed with the new indigo canvas, saturated tint, stale copied values, or dark indigo leaking into light mode. | Matching composed surfaces and code samples; preserve fixed social colors, intentional swatches and black shadow roles. |
| DEPTH-01 | Inspect input inset, button contact, card and floating shadows on their real surrounding background. | Flat ghost-text specimen, identical shadows for all roles, or clipped external shadow. | Real control face and distinct visible depth; inspect composed output, not just a nonempty boxShadow string. |
| DEPTH-04 | Compare the full surface and background bounds, including minimum-height cards and wrapped content. | Tint ends at the internal content height or creates a horizontal seam. | Background covers the full surface with matching corner clipping and no internal boundary. |
| DEPTH-04 | Compare featured bloom extent, focal point and fade against the accepted material on each renderer. | Tiny corner spot, missing radial field, implicit web radius, or opacity raised to conceal incorrect geometry. | Emitted geometry plus a visual capture demonstrating broad, continuous falloff at the accepted opacity. |
| DEPTH-03 / DEPTH-04 | Inspect glass ambient field, opaque-enough fill, thin reflection and reduced-transparency fallback. | Missing transmitted light in the specimen, thick reflection band, or blur-only illegible surface. | Separate light layers visible in the intended context,1px reflection and observed fallback where required. |
| LAYOUT-03 | Measure text and trailing icon rectangles on narrow cards, with one-line/multiline descriptions and increased text size. | Any intersection, icon shrinking, text underneath an absolutely positioned arrow, or page overflow. | Dedicated icon column; the bento recipe preserves18px icon and8px gap. Record actual card width and text scale. |
| VERIFY-01 | Compare original and implemented material specimen composition. | Extra elevated wrappers, absent real controls, or captions flattened to one generic gradient. | Heading/stage/token/explanation structure and independent material values retained. |

Evidence must name the reference hash and tested implementation revision. Retain prior captures as historical records after an approved token change; do not relabel them as current. Record raw viewport size, pixel ratio, safe-area crop, font readiness and state. If a capture has repeated compositor tiles, preserve it, exclude and disclose the invalid region, and obtain fresh valid evidence before passing that region. A DOM geometry check may establish non-overlap, but it does not establish the appearance of a gradient or native parity. Native targets without fresh evidence stay unverified.


## Identity and appearance acceptance

For IDENTITY-01 inspect the document title, sidebar/mobile masthead and introduction, and verify logo alpha on light and dark surfaces. Preserve the image-generation record; do not substitute an inferred model name for observed metadata. Product-example copy may remain domain-specific when clearly scoped as a specimen.

For THEME-01–04 exercise manual light, manual dark and system, reload with a saved choice, change OS preference while in system, and change OS preference while explicitly selected. Verify storage failure does not break current-session selection and a late storage read does not overwrite a newer user choice. Preserve a field value or row selection across a theme switch. Observe the complete semantic appearance: page, navigation, text, fields, selected controls, status labels, charts, tables, modal/popover and material specimens. Capture both appearances at matching dimensions for the actual requested web/native targets. A successful context update or palette unit test does not certify every rendered component. Mark uninspected appearances/platforms unverified; update no old capture verdict retroactively.

For light appearance regressions, inspect actual computed/rendered table-header backgrounds, secondary copy, white social-button labels, checkbox/radio inactive faces, completed steps, alert surfaces, selected tab faces and every motion stage. Test narrow and wide specimen header/body spacing, dialog body/footer spacing and drawer safe-viewport geometry. Do not accept a dark baseline mapped only at the page root. A light UI must retain near-white surfaces and readable text; neither dark fill density nor washed-out explanatory copy is an acceptable depth substitute.

## Scope and platform acceptance

Start by identifying the deliverable: portable contract/skills, a platform adapter, a gallery, or product adoption (SCOPE-01 / PORTABLE-01). Audit the requested deliverable and targets. Future host configuration is not an unfulfilled requirement of a contract-only update. Record an unrequested product integration as not-applicable with its scope reason; an explicitly required but untested platform remains unverified. Never turn a known rendering defect within the requested adapter into not-applicable merely because the host is a demonstration app.

| Rule | Required scoped observation |
| --- | --- |
| THEME-05 | Near-white light table headers, inputs, selected tab faces and motion stages; readable secondary prose and social labels. Compare composed colors rather than dark source measurements. Inspect every button variant, icon foreground, picker navigation, copy hover, range track and open popover after switching both directions; a correctly themed page background does not prove component coverage. Intentional brand swatches and fixed social brand colors are exempt from surface inversion. |
| DEPTH-05 | Actual button faces visibly separate from their backgrounds, including white social and outlined faces; ghost actions stay flat and pressed faces become shallow without resizing. |
| LAYOUT-04 | Inspect heading/body separation, body/footer spacing, bounded full-height drawers, content-fitting segments and content-shaped loading examples at affected narrow/wide dimensions. |
| PORTABLE-01 | Each adapter declares the contract revision and records platform-specific rendering differences. Do not treat a React or RN Web pass as a Flutter/native pass. Contract-only work checks completeness, consistency and reference integrity; adapter work additionally checks actual rendering and behavior. |

For a skills update, validate entrypoint links, stable rule references, token/recipe agreement, retained detailed fixtures and local/installed snapshot manifests. Do not start an unrelated product rebuild to validate maintained guidance. Preserve historical evidence with its original revision.

## Runnable reference integrity (REFERENCE-01)

Verify the bundled HTML/CSS/vendor/fonts/images exist, local URLs resolve within the relocated bundle, runtime scripts parse, and its contractHash matches the spec manifest. Run it from a directory independent of the authoring repository. Check manual appearance selection and persistence, modal/drawer dismissal, loading/result transitions, table sorting/copy/overflow controls and reduced motion for the requested examples. Confirm no runtime CDN dependency; external attribution links are not runtime dependencies. Retain file hashes and actual browser evidence. Reference integrity is separate from cross-platform appearance acceptance.

## Overlay consistency and lifecycle

Read [overlay behavior](overlay-behavior.md) when inspecting confirmations, dialogs, sheets or inconsistent operation feedback. Compare the effective project policy first; do not reject intentional mobile/desktop adaptation or an OS-owned surface as visual drift.

| Rule | Required scoped observation | Failure example |
| --- | --- | --- |
| OVERLAY-01 | Inventory equivalent tasks and resolve imports, Alert shims and providers. Compare host selection within the same environment. | Request uses a sheet and withdrawing it uses a centered dialog without a task/platform reason. |
| OVERLAY-02 | Compare actual title/body/footer, consequences, values, button labels and primary/secondary/danger foregrounds and faces. Check two-action narrow/large-text layouts. | `secondary` is accepted but ignored; both actions look identical; closing is confused with withdrawing a request. |
| OVERLAY-03 | Measure content height, viewport/safe-area/keyboard limits, body scroll and reachable actions in short and long states. | A short confirmation reserves most of the screen; a child action is appended out of view; input focus is claimed as keyboard proof. |
| OVERLAY-04 | Exercise duplicate tap, pending dismissal routes, failure/retry, child return, success, focus restoration and priority interruption where applicable. | Surface closes before an async failure, parent remains interactive, or a direct library modal escapes the coordinator. |
| OVERLAY-05 | Trace the shared semantic owner and verify variant behavior through its actual adapter. | Feature-local clones drift while a global Alert-to-sheet replacement is proposed without classifying callers. |
| OVERLAY-06 | Pair representative same-task flows and record platform/state evidence and remaining unverified targets. | Source counts are reported as defects, or successful web rendering is used to certify iOS/Android. |

Rank lost/duplicated actions, stuck overlays and inaccessible return paths before cosmetic differences. Keep the review read-only unless fixes are authorized. A portable-guidance update is verified by rule/link/snapshot integrity and scenario reasoning; do not claim product adoption or native behavior from it.
