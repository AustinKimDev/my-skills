# Audit procedure

1. Declare scope: routes, components, states, target platforms, viewport, data fixture, locale, text scale, font load state, reduced motion, reference version/hash and explicit overrides. Inventory all requested components; mark absent ones failed, not out of scope.
2. Static checks: token drift, correct static font files/weights, typography roles, numeric alignment/sort, raw copy data, overflow mode, stable IDs, min44 targets, Lucide geometry, no scale press, actual motion engine, live error labels and overlay focus handling.
3. Behavior checks: default/focus/selected/disabled/loading/error; keyboard and touch; popup dismissal/focus restore; slider0/20/60/100; cumulative ratings1/4/5; quantity bounds; date/time commit/clear; file cancellation; table numeric sorting/filter/page/select/copy/wrap/scroll; chart zero/single/multiple and value access; animation interruption/reduced-motion.
4. Visual checks: capture reference and implementation at equal dimensions and state after fonts settle. Save baseline, actual and diff/overlay without replacing the accepted baseline. Inspect text baselines, tracking, wrapping, row/header alignment, face/hit dimensions, floating shadows, the absence of card/control gradients and button shadows, and clipped popups. Test narrow and wide web plus actual required iOS/Android targets. Pixel differences from rasterization need visual review; do not hide structural differences behind a generous threshold.
5. Documentation checks: all situation-specific typography rules, depth recipes, motion rules, source links and exception notes retained. Every specimen calls a real reusable component; no WebView/bitmap substitution for native implementation.
6. Report each rule: rule ID | status | exact evidence | observation | repair. `pass` requires observed success. `fail` is observed mismatch. `unverified` means required evidence missing. `not-applicable` needs a reason. Separate known failures from environment blockers. Completion requires no required failures or unverified checks.
7. After authorized fixes rerun only affected checks plus relevant integration checks. Report the diff's runtime compatibility and deployment needs without executing deployment.


## Scoped regression checks for materials and trailing icons

Run the relevant rows when that component or material is in scope. These checks supplement the procedure; they do not convert a small fix into a mandatory full-app audit.

| Rule | Trigger and required observation | Failure evidence | Repair verification |
| --- | --- | --- | --- |
| COLOR-01 / COLOR-02 | Inspect primary action default/pressed colors from the rendered face, across the affected sizes, and count filled primaries per view or decision. Read the current tokens rather than an old screenshot. Check composed label contrast separately, including text on soft faces and the restricted use of `tertiary`. | Unexpected darker action token, more than one filled primary in a decision, brand/action used as a tile tone, missing face, or insufficient measured contrast. | Correct state colors and actual contrast evidence. Brand selection alone does not pass contrast. |
| COLOR-03 / CONTROL-07 / CONTROL-01 / BUTTON-ICON-01 | Inspect flat button variants (fill, weak, text, danger), SM32/MD40/LG48 faces with44 targets, actual nested foreground, leading icon, dim press overlay, focus, disabled (`muted` face, `tertiary` label) and busy states. | Gradient, perimeter, corner light or button shadow; destructive action in fill or brand color; icon replacing a label; meaning conveyed only by hue; target below44; repeat activation or layout shift. | Agreement with the current tokens; measured label contrast; keyboard/busy/disabled behavior and stable geometry. Filled brand actions keep the white on-action label. |
| DEPTH-02 / DEPTH-05 / DEPTH-06 | Inspect cards, panels, controls, tabs and selected states for gradients and shadows in both appearances. | Any gradient fill or perimeter, featured bloom, or button shadow, including remnants of the superseded 2026-10-23 09+04 composition. | Flat faces separated by spacing, hairlines and `muted`; floating surfaces keep their own shadow. |
| COLOR-01 / THEME-02 | Compare canvas, muted, sheet, border, text roles, soft/text pairs, `iconTones` and the glass fill against the selected semantic set in tokens.json. Check retained gallery colors and displayed/copied code in both appearances. | Surfaces from the superseded 2026-10-23 indigo or older zinc sets mixed with the neutral foundation, saturated tint, stale copied values, or dark values leaking into light mode. | Matching composed surfaces and code samples; preserve fixed social colors, intentional swatches and black shadow roles. |
| DEPTH-01 | Inspect floating shadows (menus, dialogs, sheets, floating navigation) and any project-kept input inset on their real surrounding background. | Card or button shadow, identical shadows for all floating roles, or clipped external shadow. | Flat content and distinct floating depth; inspect composed output, not just a nonempty boxShadow string. |
| DEPTH-04 | Compare the glass navigation surface and its background bounds, including minimum height and wrapped content. | Light field ends at the internal content height or creates a horizontal seam. | Background covers the full surface with matching corner clipping and no internal boundary. |
| DEPTH-04 | Superseded 2026-10-23 (owner): featured-bloom extent checks; a card with a bloom now fails DEPTH-02. | — | — |
| DEPTH-03 / DEPTH-04 | Inspect glass ambient field, opaque-enough fill, thin reflection and reduced-transparency fallback. | Missing transmitted light in the specimen, thick reflection band, or blur-only illegible surface. | Separate light layers visible in the intended context,1px reflection and observed fallback where required. |
| LAYOUT-03 | Measure text and trailing icon rectangles on narrow cards, with one-line/multiline descriptions and increased text size. | Any intersection, icon shrinking, text underneath an absolutely positioned arrow, or page overflow. | Dedicated icon column; the bento recipe preserves18px icon and8px gap. Record actual card width and text scale. |
| VERIFY-01 | Compare original and implemented material specimen composition. | Extra elevated wrappers, absent real controls, or captions flattened to one generic string. | Heading/stage/token/explanation structure and independent material values retained. |

Evidence must name the reference hash and tested implementation revision. Retain prior captures as historical records after an approved token change; do not relabel them as current. Record raw viewport size, pixel ratio, safe-area crop, font readiness and state. If a capture has repeated compositor tiles, preserve it, exclude and disclose the invalid region, and obtain fresh valid evidence before passing that region. A DOM geometry check may establish non-overlap, but it does not establish the appearance of a gradient or native parity. Native targets without fresh evidence stay unverified.


## Flat components, lists and icon tiles

Run the relevant rows when the component is in scope.

| Rule | Required observation | Failure example |
| --- | --- | --- |
| CONTROL-06 | Tab count, equal width or scrolling, 48 height, 3px ink underline 28 wide; leading check on selected segmented options and filter chips. | Brand-colored underline, full-width underline, more than five squeezed fixed tabs. |
| CONTROL-04 / CONTROL-05 | Stepper 40 face with44 target and disabled bounds; field height 48; error replaces help; count only with a limit; vertical radio groups; square checkboxes. | Pressable value, error and help shown together, horizontal radio row of four. |
| LAYOUT-03 / LAYOUT-05 | Row height, top alignment of multi-line rows, unread title and dot, group spacing with inset hairline, group titles, value color, subtotal and total weights. | Gray-filled unread rows, values in `secondary`, groups separated only by full-width dividers. |
| LIST-ICON-01 | Every tiled icon belongs to exactly one meaning group with that group's tone in the active appearance; sheet/menu rows use bare glyphs; product art has no tile; glyph contrast ≥3:1. | Tone chosen per screen, one icon in two tones, brand/action tile, tiled sheet action. |
| ACTION-TILE-01 | Independent actions render as a two-column tile grid that acts per tile. | Radio group plus a separate commit button for independent purchases. |
| BANNER-01 | Pending decision shown as one banner row followed by two `weak` buttons. | Bare text buttons that read as system controls. |
| OVERLAY-01 / OVERLAY-02 | Irreversible choices use the action sheet (destructive on top, cancel at the bottom, vertical); sheet header close leading with centered title, second step back leading and close trailing. | Irreversible delete in a two-button horizontal dialog; close and back on the same side. |

## Supporting text and layout

Run LAYOUT-05 on product screens in scope; documentation, specimen sheets and reports are `not-applicable`. A `fail` cites a pair: the supporting string and the heading, control label or layout element it repeats, with route and state. Items on the LAYOUT-05 keep list are never a LAYOUT-05 failure; check them under their own rules. The "same decision without it" question guides authoring and repair, not pass/fail. After removing text, recheck accessible names, visible input labels, narrow layouts and increased text size.


## Identity and appearance acceptance

For IDENTITY-01 inspect the document title, sidebar/mobile masthead and introduction, and verify logo alpha on light and dark surfaces. Preserve the image-generation record; do not substitute an inferred model name for observed metadata. Product-example copy may remain domain-specific when clearly scoped as a specimen.

For THEME-01–04 exercise manual light, manual dark and system, reload with a saved choice, change OS preference while in system, and change OS preference while explicitly selected. Verify storage failure does not break current-session selection and a late storage read does not overwrite a newer user choice. Preserve a field value or row selection across a theme switch. Observe the complete semantic appearance: page, navigation, text, fields, selected controls, status labels, charts, tables, modal/popover and material specimens. Capture both appearances at matching dimensions for the actual requested web/native targets. A successful context update or palette unit test does not certify every rendered component. Mark uninspected appearances/platforms unverified; update no old capture verdict retroactively.

For light appearance regressions, inspect actual computed/rendered table-header backgrounds, secondary copy, white social-button labels, checkbox/radio inactive faces, completed steps, alert surfaces, selected tab faces and every motion stage. Test narrow and wide specimen header/body spacing, dialog body/footer spacing and drawer safe-viewport geometry. Do not accept a dark baseline mapped only at the page root. A light UI must retain near-white surfaces and readable text; neither dark fill density nor washed-out explanatory copy is an acceptable depth substitute.

## Scope and platform acceptance

Start by identifying the deliverable: portable contract/skills, a platform adapter, a gallery, or product adoption (SCOPE-01 / PORTABLE-01). Audit the requested deliverable and targets. Future host configuration is not an unfulfilled requirement of a contract-only update. Record an unrequested product integration as not-applicable with its scope reason; an explicitly required but untested platform remains unverified. Never turn a known rendering defect within the requested adapter into not-applicable merely because the host is a demonstration app.

| Rule | Required scoped observation |
| --- | --- |
| THEME-05 | White canvas and sheets, `muted` #f3f4f6 faces, readable secondary prose (#66707d) and social labels in light appearance. Compare composed colors rather than dark source measurements. Inspect every button variant, icon foreground, picker navigation, copy hover, range track and open popover after switching both directions; a correctly themed page background does not prove component coverage. Intentional brand swatches and fixed social brand colors are exempt from surface inversion. |
| DEPTH-05 | Button faces carry no shadow; weak faces stay visibly distinct from their surface, including white social and outlined faces; pressed faces show the dim overlay without resizing. |
| LAYOUT-04 | Inspect heading/body separation, body/footer spacing, bounded full-height drawers, content-fitting segments and content-shaped loading examples at affected narrow/wide dimensions. |
| PORTABLE-01 | Each adapter declares the contract revision and records platform-specific rendering differences. Do not treat a React or RN Web pass as a Flutter/native pass. Contract-only work checks completeness, consistency and reference integrity; adapter work additionally checks actual rendering and behavior. |

For a skills update, validate entrypoint links, stable rule references, token/recipe agreement, retained detailed fixtures and local/installed snapshot manifests. Do not start an unrelated product rebuild to validate maintained guidance. Preserve historical evidence with its original revision.

## Runnable reference integrity (REFERENCE-01)

Verify the bundled HTML/CSS/vendor/fonts/images exist, local URLs resolve within the relocated bundle, runtime scripts parse, and its contractHash matches the spec manifest. Run it from a directory independent of the authoring repository. Check manual appearance selection and persistence, modal/drawer dismissal, loading/result transitions, table sorting/copy/overflow controls and reduced motion for the requested examples. Confirm no runtime CDN dependency; external attribution links are not runtime dependencies. Retain file hashes and actual browser evidence. Reference integrity is separate from cross-platform appearance acceptance.

## Overlay consistency and lifecycle

Read [overlay behavior](overlay-behavior.md) when inspecting confirmations, dialogs, sheets or inconsistent operation feedback. Compare the effective project policy first; do not reject intentional mobile/desktop adaptation or an OS-owned surface as visual drift.

| Rule | Required scoped observation | Failure example |
| --- | --- | --- |
| OVERLAY-01 | Inventory equivalent tasks and resolve imports, Alert shims and providers. Compare host selection within the same environment, and check that irreversible choices use the action sheet. | Request uses a sheet and withdrawing it uses a centered dialog without a task/platform reason; an irreversible delete uses an ordinary two-button confirmation. |
| OVERLAY-02 | Compare actual title/body/footer, consequences, values, button labels and primary/secondary/danger foregrounds and faces. Check two-action narrow/large-text layouts. | `secondary` is accepted but ignored; both actions look identical; closing is confused with withdrawing a request. |
| OVERLAY-03 | Measure content height, viewport/safe-area/keyboard limits, body scroll and reachable actions in short and long states. | A short confirmation reserves most of the screen; a child action is appended out of view; input focus is claimed as keyboard proof. |
| OVERLAY-04 | Exercise duplicate tap, pending dismissal routes, failure/retry, child return, success, focus restoration and priority interruption where applicable. | Surface closes before an async failure, parent remains interactive, or a direct library modal escapes the coordinator. |
| OVERLAY-05 | Trace the shared semantic owner and verify variant behavior through its actual adapter. | Feature-local clones drift while a global Alert-to-sheet replacement is proposed without classifying callers. |
| OVERLAY-06 | Pair representative same-task flows and record platform/state evidence and remaining unverified targets. | Source counts are reported as defects, or successful web rendering is used to certify iOS/Android. |

Rank lost/duplicated actions, stuck overlays and inaccessible return paths before cosmetic differences. Keep the review read-only unless fixes are authorized. A portable-guidance update is verified by rule/link/snapshot integrity and scenario reasoning; do not claim product adoption or native behavior from it.
