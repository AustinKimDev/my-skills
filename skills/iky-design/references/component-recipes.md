# Component reconstruction recipes

Read this with tokens.json, rules.md and the complete reference-sheet.json fixture. These recipes specify composition and state ownership across frameworks. Korean strings in the fixture are product examples, not a required locale. Use logical pixels. Face dimensions do not shrink the minimum 44px interaction target.

## Surface composition

1. Canvas fills the viewport with canvas color.
2. A content panel uses the panel gradient, card radius, a 1px highlight, contact and ambient shadow. Pad 24 on wide documentation panels and 18 on narrow panels unless the specimen explicitly specifies 16.
3. A nested offer uses the card gradient with 16 padding. Its title precedes one baseline-aligned price/action row. Price and currency stay separate text nodes. Benefits form readable lines in the same surface; never invent an empty nested dark rectangle. Put the details disclosure after 16px, with a 44px trigger and a visible chevron.
4. Inputs use the inset recipe, control radius12, minimum44 height, 16px value text and a visible external label. Open/focus/error/disabled are distinct. A quiet chat field uses a fill change for focus. Do not use scale transforms for any press state.
5. Floating dialogs use opaque floating material, radius24, 20–24 padding, title and dismiss control, then content and actions. Anchored menus use radius16, 6px outer padding and 44px options. Place them 8px from the measured trigger, flip above when below will clip, and clamp within a 12px viewport inset plus native safe areas. Measure content instead of assuming its height.
6. Only the floating exploration navigation uses glass in the example phone. Use a 20px corner, 12px horizontal viewport inset, 16px bottom inset, restrained top reflection and an opaque fallback. Content cards remain opaque.

## Component states

| Component                 | State owner and transitions                                                                                                                 | Mandatory evidence                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Button / IconButton       | Caller owns disabled/loading. Press affects color and opacity over150ms. Size controls face dimensions and padding.                         | XS/SM/MD/LG, long text, icon-only name, no shrink, keyboard focus, disabled press ignored.                                             |
| Input / Textarea          | Caller owns value/error. Field owns label/help association; focus does not erase errors.                                                    | Empty, filled, focused, required error, disabled, large text, multiline wrapping, chat quiet focus.                                    |
| Checkbox                  | Caller owns boolean or mixed. Mixed is a separate visual dash.                                                                              | Checked, unchecked, mixed, disabled and label activation.                                                                              |
| Radio                     | Caller owns one option value. Only one option is checked.                                                                                   | Pointer/touch, keyboard, disabled choice, readable selected shape.                                                                     |
| Switch / BoxSwitch        | Caller owns boolean. Box variant renders explicit ON/OFF; regular thumb interpolates its position.                                          | Both states, disabled, screen-reader checked value, reduced motion.                                                                    |
| Select                    | Caller owns value, component owns open/active option. Arrow/Home/End skip disabled options; Enter commits, Escape cancels.                  | Custom opaque menu, selected check, trigger-width alignment, viewport flip, focus restoration.                                         |
| Date                      | Caller owns ISO date. Component owns viewed month. Month movement must not commit a date. Today commits today; clear commits empty.         | Previous/next month, selected day, weekday, clear, narrow viewport, disabled field.                                                    |
| Time                      | Caller owns committed HH:mm. Component owns draft hour/minute. Cancel leaves committed value intact.                                        | Open with prior value, choose columns, commit, clear, keyboard and native scrolling.                                                   |
| Quantity                  | Caller owns bounded numeric value. Minus/plus are square icon controls; direct entry clamps to configured limits.                           | Min/max, empty and invalid input, standard44 and large52.                                                                              |
| Slider                    | Caller owns value. Normalize against min/max/step for pointer, keyboard and accessibility actions.                                          | Fill ends under thumb at0/20/60/100, min-relative step, no NaN, disabled.                                                              |
| Rate                      | Caller owns rating. Fill every star with index <= rating.                                                                                   | Ratings1/4/5, directional keys, visible current value, one checked option.                                                             |
| Tabs / Segmented          | Caller owns value. One measured underline/surface moves; do not animate each tab background separately.                                     | Keyboard roving focus, selected semantics, rapid reversals,220/240ms, reduced motion.                                                  |
| Upload                    | Caller owns selected local asset. Cancellation preserves selection; errors remain visible.                                                  | Real picker, cancellation, file name, no false claim of remote upload.                                                                 |
| Table                     | Caller owns stable selection keys; table owns sort/page unless explicitly controlled. Raw values differ from rendered labels and copy data. | Numeric ascending/descending, stable equal values, page/filter clamp, cross-page selection, copy success/failure, both overflow modes. |
| Chart                     | Caller owns kind/data. Hover/focus previews, click/tap pins, repeat unpins; period changes clear stale selection.                           | Equal data in graph/readout/alternative table, zero baseline, zero/single data, keyboard values, interrupted transition.               |
| Disclosure                | Component owns open unless explicitly controlled. Label and chevron share44px trigger.                                                      | Open/closed semantics, text retained, no unexplained blank surface.                                                                    |
| Dialog / Drawer           | Caller owns open. Enter/exit preserve mount through animation, Escape/back/outside dismiss; restore original focus.                         | Focus containment, long-content scroll, narrow screen, soft keyboard, reduced motion.                                                  |
| Feedback                  | Local status does not assert a server action. Icons accompany color.                                                                        | Lucide check/clock/alert; readable text; live announcement; dismiss action.                                                            |
| Skeleton / Empty / Result | Actual loading state controls replacement. Skeleton follows final content geometry.                                                         | No decorative infinite shimmer; real transition from loading to local fixture result; empty reset.                                     |

## Data geometry

Table headers and cells use the same column definitions, 20px horizontal padding (compact wrap mode may reduce it to preserve essential columns), numeric right alignment and tabular numerals. Header48 and default row60 are minimums; wrapping and large type increase height. Selection gets its own fixed column. Long copy identifiers open a detail view rather than appearing beneath a person's name. In scroll mode the table may exceed its container while the page remains bounded; in wrap mode essential values wrap inside their assigned column. Formatting never participates in numeric sorting.

The reference chart uses a640×260 coordinate system for line/bar and640×250 for donut. Line/bar grid spans x44–616 and y31–215. Data x positions span64–596; single point sits at320. Y begins at zero and the ceiling rounds up to the next20, minimum20. Line stroke3, point radius7 with3px surface stroke, bars36 wide with5px corners. Donut center320,120, radius74, stroke28; colors brand/#a78bfa/#71717a. Its center shows total and unit; the legend includes absolute values and percentages. Preserve this geometry when translating renderers. Do not hardcode the sample total into labels.

## Documentation and gallery

Preserve all eleven sections and all detailed tables, exceptions, source notes and retained rejected-asset evidence. The complete structured fixture is reference-sheet.json. It is not an instruction to render HTML or a screenshot inside a native app. The actual gallery must use interactive reusable components, with the same values, labels, framing and state transitions as the fixture. Compare the mobile static navigation inside the page scroll against the wide persistent sidebar; do not accidentally make mobile navigation sticky. Mobile phone examples stack at their natural width; wide view places three frames side by side. The flow is discovery → chosen profile → inquiry → local chat. No example creates a purchase or sends a network message.

## Exact source fixtures

The complete introduction is in reference-introduction.json. Per-element computed CSS at390 and1280 logical pixels is retained in reference-styles.json, keyed by each node’s data-iky-path; reference-style-manifest.json records the source digest, viewport and font readiness. These are reference measurements, not framework code. Translate font weights through the approved static mapping and keep geometry and semantics in native components. Do not copy DOM-specific behavior into a native app or use these fixtures as evidence that the implementation matches. A different viewport still requires a new visual comparison.

## Typography lab and documentation tables

Typography specimen panels intentionally use the solid card color#171720, radius16, padding22 and16px grid gaps. They do not receive the elevated content-card gradient. The first live specimen uses Pretendard800 at32/40 with−1.28px tracking, followed by mixed Korean/Latin body500. The D2Coding specimen renders its numeric token at32px and its unit separately in Pretendard16; its multiline code sample uses D2Coding Regular with zero tracking. This is a font demonstration, not a pricing-style override. Ordinary prices and dates continue to use Pretendard.

The standard-weight playground orders the small descriptor, weight control400–900 in100 steps, a live26px sample at1.4 leading and−.65px tracking, and the complete weight-step note. The control value and the actual face must agree. Retained historical variable-weight labels do not authorize synthetic intermediate weights.

Read-only rule tables use transparent surfaces, only bottom row boundaries,18px vertical and16px horizontal cell padding,11px header500 and13px body400 (first column600). First column minimum140, remaining columns minimum160. Below that combined width, scroll within the table viewport rather than forcing narrow prose columns. The situation-specific typography usage table is a deliberate exception: preserve its25/24/51 wide columns and stack role, metrics and example inside each row on narrow screens. Do not replace either detailed table with a short summary.

## Flat navigation and compact profile composition

Flat tabs move a32px centered underline between the measured tab positions; the line must not fill the entire tab width. Default tab labels are14px, compact profile labels12px, with48px minimum targets. Segmented controls keep the full measured selection surface and their220ms timing. Both use roving keyboard focus and selected semantics.

Bento partner cards reserve a non-shrinking18px trailing chevron column with an8px gap beside a flexible text column. Align the arrow with the bottom of that content row; do not position it absolutely over the description. Text wraps within its own column and the card may grow. Leave the avatar/featured caption on the first row. The featured card may use the accepted restrained pink corner light over its low-chroma indigo material. Profile follow/inquiry actions share the available row width. Compact offer benefits use plain13px lines; the optional details disclosure keeps a44px target and adjacent Lucide Plus/Minus, with12px supporting text. Full offer examples may retain their benefit check icons.

## Material reconstruction and renderer boundaries

These recipes preserve the accepted material, not a required implementation library. Apply them to the equivalent background, clipping and layout primitives of the target platform. Framework-specific notes below address observed adapter behavior; do not impose RN or SVG on other projects.

### Primary action color

Use the shared action token, currently#fe3a8f, matching the brand pink. Pressed uses#ed2b80 with the existing150ms transition and no scale. Keep the on-action token separate. A darkened alternative action token must not silently replace the chosen brand default. Verify actual composed label contrast under COLOR-02; brand approval and visual similarity are not contrast certification. A conflict remains a reported finding until resolved in the authorized scope.

### Semantic gradient-corner buttons

The user selected review **09+04** on 2026-09-09. Apply COLOR-03 / CONTROL-07 / DEPTH-06 using `buttonEmphasis` and `themes.light.buttonEmphasis` in tokens.json. This is the current portable default for semantic emphasis and supersedes the filled-palette and three-strength tinted-shadow explorations. Existing explicitly filled brand actions keep `color.action` / `color.onAction`; their white foreground rule does not apply to a neutral light face. Project overrides and ordinary secondary/ghost/social variants remain scoped independently.

Build an opaque appearance-specific neutral face, a 1px transparent border carrying `borderGradient`, and a separate `cornerGradient` field below text/icons, clipped to the same radius. The border keeps the selected tone around its full perimeter, transitioning from stronger color at the upper-left origin through softer colored segments; align the radial corner field to that origin. The 2026-09-09 user correction rejected the gray-ended border as dull, especially in light appearance. Do not fade chromatic borders into a neutral gray endpoint; neutral-tone and disabled controls remain neutral. Keep the outer neutral contact shadows outside the field clip. Do not stretch the corner tint into a full-face colored fill or add the unselected 09+06 colored drop shadow. The geometry, gradient stops, alpha, per-appearance tone RGB, foreground and state shadows are numeric SSOT tokens; do not re-derive them from screenshots.

| Tone | Action meaning | Example label, not prescribed product copy |
| --- | --- | --- |
| brand | Main product action | Continue |
| positive | Explicit approval or affirmative action | Approve |
| danger | Destructive action with appropriate confirmation | Delete |
| warning | Acknowledge a stated caution | Review caution |
| info | Open guidance or supporting information | View guide |
| neutral | Lower-priority alternative | Later |

Use existing size/target/typography rules, with the approved medium specimen's geometry in the tokens. Labels and optional currentColor icons use the neutral foreground in both appearances; check composed contrast over the corner field, not just the opaque base. A border hue alone must not carry the action's meaning.

Default uses `cornerOpacity` and `shadow.rest`. Hover/focus increases the field to `cornerActiveOpacity` and uses `shadow.hover`; keyboard focus also has its own contrasting external outline. Press uses `shadow.pressed`, with compatible inset/outer layer ordering and the shorter press duration. Pointer exit/release retargets the current state continuously. Busy keeps the neutral face and tone, exposes pending status, reserves label width and suppresses repeats. Disabled removes the gradients, uses `disabled`, applies its opacity and has no elevation. Native adapters must block all relevant activation paths, not merely dim the control.

Animate opacity and shadow with the token transition; no automatic pulse or scale. Reduced motion removes transitions while preserving all final states. Error/retry belongs to the caller and must not be replaced by a decorative success color. The bundled `assets/reference/index.html#button-tones` button lab in iky-design contains six tones, interaction states and a local busy demo. The same relative asset URL is not available in the audit-only package; use the sibling iky-design bundle there. Product adapter adoption and native visual verification remain separate tasks. Historical source measurements must not be relabeled as current.

### Full-surface background ownership

Attach light layers to the outer surface bounds, beneath content, not inside the padded content container. Clip background fields at the same outer corner radius. Keep contact/ambient shadows outside that clipping boundary so they can extend beyond the card. A background must remain continuous when a card has a minimum height or its text wraps. Compare background and surface bounds; matching width alone is insufficient.

### Three distinct light fields

The dark canvas/surface/card/muted progression is defined by COLOR-01 and tokens.json. Panel light uses #1c1c26 to #16161f vertically. Change material endpoints and glass fill with the surface palette; changing only the page background leaves an incomplete theme. The light palette remains near-white under THEME-05. Keep black contact shadows and fixed social-brand marks in their own roles; palette maintenance is not a global black/gray search-and-replace.

- Neutral surface: diagonal155-degree light from#20202a to#171720 at70%. Use the thin highlight; keep its indigo tint restrained.
- Featured surface: upper-right elliptical radial#fe3a8f20 fading to transparent at65%, over the150-degree indigo surface. Preserve a broad falloff, not a small colored spot or a hard rectangular band. Peak opacity is approximately12.5%; fix extent and focal geometry before increasing opacity. Reserve this for one prioritized card in its group.
- Glass: approximately7% white surface light fading by48%, the token-defined indigo fill (rgba(32,32,42,0.82)), blur where supported, and a separate centered1px reflection fading horizontally at both ends. Its demonstration stage carries a restrained lower-left pink ambient field (#fe3a8f24 at20%/90%, fading by65%). This stage is an illustration of transmitted light, not a mandate for pink backgrounds throughout a product. Use the prescribed opaque fallback when transparency is reduced or unsupported.

For CSS farthest-corner ellipses centered at a corner, a normalized100-by100 field has radii approximately141.421 on both axes. With the65% fade stop, the visible extent is about91.9 units on each axis. Preserve the corner focal point explicitly. For standard web SVG use its actual r attribute; native SVG adapters may expose rx/ry instead. Inspect the emitted element/native result: passing native-only radius props through a web adapter may leave the browser's smaller default radius. Do not treat typechecking or the presence of a gradient node as proof that the light has the intended size.

### Material specimens

Keep material examples as an unframed item: heading, stage, exact token caption, explanation. Do not wrap every example in an extra elevated card. Stage minimum height170, wide padding32, narrow (up to700px viewport) padding28 vertical/20 horizontal, radius16. The illustrated object uses padding20/radius16; inset input uses radius12. Preserve each role's own shadow and light recipe. The pressed-control example must render the real primary Button with its contact shadow and working local feedback, not a ghost text button. Captions must list every relevant token and its actual value; a glass/featured caption must never be replaced by the generic surface-gradient string.

### Narrow card layout

Use the available card width, not the page viewport, when assessing text/icon collisions. For the bento recipe, retain the18px icon column and8px separation at narrow half-card widths (including observed116px cards), with flexible text and no shrinking glyphs. Check short and multiline descriptions, long names and increased text size. The fixed icon column is a layout reservation, not a separate18px interaction target: the whole card remains the action.


## IKY identity and appearance setup

The documentation is an independent IKY Design System. Use its generated pink wordmark with descriptive accessible text; keep the transparent image on the selected surface without baking in a dark or white rectangle. Domain-specific screen examples illustrate components and do not rename the library.

### Portable contract

Use a preference with three values: system/light/dark, and a separately resolved appearance light/dark. Initialize from the caller's explicit preference or system. Resolve system at runtime, subscribe to OS changes, and fall back to light when unspecified. An explicit light/dark preference ignores later OS changes. Storage belongs to the host application; use the key iky.appearance where this gallery owns the preference. Read/write failures keep the in-memory selection usable. Never let a delayed storage read overwrite a selection the user made after mounting.

For dark use the root color, material and shadow objects in tokens.json. For light use themes.light. Both retain the brand/action identity. Light uses canvas#fafafa, surface#fefefe, card#ffffff, muted#f2f2f2, primary text#18181b and secondary#52525b. Subtle neutral surface gradients and lower-opacity shadows provide depth on the bright canvas; do not reuse dark shadow density indiscriminately. Status labels use darker green/amber/rose text on pale contextual fills. Do not infer that bright pink with white text passes contrast; measure and record unresolved issues under COLOR-02.

### React / React Native adapter

IkyProvider accepts mode (controlled), defaultMode (uncontrolled, system by default), onModeChange and an optional appearanceStorage object with asynchronous getItem/setItem methods. useIkyColorMode returns the preference and setMode. useIkyTheme returns the resolved mode plus semantic colors, materials and shadows. Host storage is injected, so the design-system package does not force an additional persistence library. The app gallery uses its existing AsyncStorage integration. useColorScheme supplies OS updates; theme switching must not remount the gallery and discard form state.

The retained-source gallery adapts reference colors by semantic role while preserving source text and layout measurements. Newly authored reusable components should use semantic theme values directly, not depend on legacy literal-color translation.

### Browser reference adapter

The original HTML sheet uses data-appearance for the preference and data-theme for the resolved mode. CSS tokens scope light values under :root[data-theme="light"]. Read the stored preference before rendering, listen to prefers-color-scheme only through the system resolution path, and render accessible selected-state mode buttons. Keep the source theme and actual RN Web theme independently switchable for comparisons.

### Light appearance component composition
Keep documentation headers, motion stages and unselected control faces near white (#FEFEFE or #F2F2F2); never carry translucent black stages over a white canvas. Secondary explanatory text uses #52525B, including retained document CSS. Google and Apple white button faces keep #18181B foreground independently of appearance. Checkbox and radio inactive faces are white with a visible neutral outline; preserve 44-unit hit regions. Completed light-mode steps use white faces with pink outline/check; the current step retains the action fill. Informational alerts use white faces, a subtle perimeter and semantic leading edge. Segmented groups hug their contents unless explicitly requested to stretch; selected light faces are white with a shallow shadow.

Separate specimen headers from content by 20 units. Dialog headers have 20 units before the body; action footers sit outside scrolling content with 24 units above, aligned to the trailing edge. Drawers occupy the available safe viewport height, with a bounded 380-unit width and 12-unit outer clearance. Loading examples resemble the pending content (avatar and short text skeletons) with a grouped spinner/status, not disconnected full-width bars.

### Visible button depth
Filled, secondary, social, outlined and icon button faces use the control shadow token: an inset 1-unit top highlight, a 1-unit contact shadow, a 4-unit near shadow and a 10-unit diffuse shadow. Keep the face bright in light mode; do not darken the fill to simulate elevation. Ghost/text-only actions have no surface shadow. Pressed controls switch to the shallow input shadow and return on release; preserve the face dimensions and avoid scale animation. The control token remains distinct from the larger card/floating shadows.

### Host appearance capability
A system-following preference depends on the native host permitting both appearances. A host locked to dark/light can report that forced appearance rather than the user's OS preference. Configure the preview/native host for automatic appearance at build time and verify on an installed compatible binary; a JavaScript toggle does not prove that capability. Keep explicit preference state separate from OS state. For Expo 56, automatic Android appearance also requires expo-system-ui; follow dependency approval and native regeneration/build procedures. Do not change an unrelated product's default appearance merely to demonstrate IKY.

A design-system-only IKY upgrade is scoped to the system and its gallery, not adoption by a hosting product. Native setup requirements above are future integration guidance. Do not install host dependencies, change product appearance configuration or rebuild the product as part of a design-system-only upgrade. Explicit light/dark component rendering can be verified independently of native OS-following capability.

## Cross-platform reuse strategy

The portable SSOT consists of rules, numeric/semantic tokens, detailed component recipes, state examples and reference captures. Maintain these independently of any component package. Documentation alone without tokens and inspectable examples is insufficient for reproducible output; a universal cross-framework widget implementation is not required.

| Environment | Reuse boundary | Integration checks |
| --- | --- | --- |
| React / React + Vite | React components can be shared where dependencies and styling agree. | Browser semantics, keyboard/focus, responsive layout and actual font loading. |
| Next | Reuse the React adapter where compatible; separate browser-only interactions from server-rendered content. | Server rendering, hydration, initial appearance and client boundaries. |
| React Native | Keep native primitives and platform motion/material adapters. The existing RN/RN Web package is a reference implementation. | Native font metrics, safe areas, input behavior and supported shadow/gradient rendering. RN Web evidence is distinct from browser-native React and native evidence. |
| Flutter | Implement widgets, theme extensions and motion using the same semantic contract. | Text metrics, layout constraints, semantics, focus and renderer-specific materials on requested targets. |

Do not publish or extract new libraries merely because these environments are listed. Extract a platform adapter when multiple real projects repeat the implementation, its API and states have stabilized, and maintaining releases is justified. Keep platform adapters independently versioned while declaring the IKY contract revision they implement. Library installation, publishing and product adoption remain separate authorized tasks.

## Task confirmations and overlay hosts

Use the [overlay behavior contract](overlay-behavior.md) for host selection, shared confirmation anatomy, content sizing, child return and asynchronous lifecycle. Reuse existing numeric/material tokens; a compact sheet and desktop dialog are environment adapters of the same task. This textual extension does not retroactively certify the bundled gallery or product runtimes.
