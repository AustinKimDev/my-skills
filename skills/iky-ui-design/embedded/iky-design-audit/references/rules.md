# IKY design rules — 0.1.0

This is a framework-independent design contract. Read `tokens.json` alongside this document. Numeric values use logical pixels (CSS px, RN dp). Product language follows the project's locale; Korean examples demonstrate typography, not a mandatory product language. Explicit brand, locale, accessibility, and platform requirements may override defaults; record the override and its scope before implementation.

## Color and material

- COLOR-01: For dark appearance use a restrained, low-chroma indigo foundation: canvas #0b0b10, surface #111119, card #171720, muted #20202a. The tint should remain subtle on large surfaces; do not intensify it into saturated blue or purple panels. This portable palette supersedes the former achromatic zinc default. Brand #fe3a8f is a salient accent; primary action #fe3a8f (same as brand; user-directed bright button default), pressed #ed2b80, on-action #ffffff.
- COLOR-02: Dark primary text #f9fafb, secondary #a1a1aa; light primary text #18181b, secondary #52525b. Verify actual composited contrast, including gradients, disabled states, and images. Normal text requires 4.5:1; meaningful UI boundaries and large text 3:1. Do not imply success/error by hue alone.
- DEPTH-01: Elevation represents hierarchy: canvas → content → floating control. Use the five base shadow recipes in tokens.json, with the scoped semantic-button extension in DEPTH-06. Card has highlight, contact, medium, and ambient shadows; inputs are inset. Do not flatten everything or put the floating recipe on every card.
- DEPTH-02: Top light, lower shadow. Dark panel gradient #1c1c26 to #16161f vertically; card #20202a to #171720 diagonally. Gradients retain the low-chroma indigo surface family; no pink rectangular gradient behind flat active tabs.
- DEPTH-03: Glass is reserved for one appropriate floating navigation surface in a viewport, with legible opaque fallback, restrained reflection and 1px highlight. Do not blur text or stack translucent content cards. Native capability gaps must be documented and verified rather than silently dropping shadows.
- DEPTH-04: A surface's background light spans its full outer bounds, independently of text height and content padding, and clips once at the surface radius. Preserve separate neutral-surface, featured-corner and glass-reflection light fields; do not substitute the same linear gradient for all three. Featured bloom retains a broad fade across the upper/right surface at the accepted opacity. Inspect the rendered extent on each target renderer; radius/focal defaults are not portable.
- LAYOUT-01: Group with alignment and spacing before dividers. Dividers indicate real row/section boundaries, never arbitrary decoration. Bento layouts follow content priority and must collapse naturally; do not force every component into equal cards.
- LAYOUT-02: Use spacing 4/8/12/16/24/32/48/64/96. Control radius12, card16, dialog24, badge8. Smaller button radii vary with size. Avoid unexplained empty blocks, oversized actions, clipped buttons, or nested cards with disconnected colors.

- LAYOUT-03: A trailing navigation icon occupies its own non-shrinking layout column. For the bento partner recipe use an18px icon column and8px gap beside a flexible text column; allow text and card height to grow. Do not absolutely overlay the arrow on names or descriptions. Test the narrow half-width cards and multiline descriptions.

## Typography

TYPE-01: Pretendard is the default Korean/Latin body family. Keep both scripts in the same family within prose. Load exact supported weights before visual comparison. A fallback font is not proof of parity. Use D2Coding Regular for identifiers/code only; dates, time selectors, prices and ordinary numbers use Pretendard. A project's locale may require a different complete script family.

TYPE-02: Static weight steps are intentional: body400, secondary500, label/input600, titles/buttons700, display/price800. The lab includes 400/500/600/700/800/900. When translating historical variable values use 430→400,480→500,560→600,650/680/720→700,780→800. Do not synthesize bold or assign the regular file to every weight.

| Role / purpose | Size / weight / line-height ratio / tracking | Example and application |
|---|---|---|
| Page title | 36 / 800 / 1.2 / -1 | One representative title per screen. Wrap long text. |
| Section title | 26 / 700 / 1.3 / -1 | Beginning of discovery or settings group. |
| Card title | 20 / 700 / 1.35 / -1 | Product/person name before its supporting copy. |
| Small title | 18 / 700 / 1.4 / -1 | Narrow cards and settings subgroups. |
| Body | 16 / 400 / 1.6 / -1 | Prose, chat, long instructions. Preserve leading for 3+ lines. |
| Supporting body | 14 / 500 / 1.6 / -.45 | Short supporting information; do not excessively thin it. |
| Field label | 14 / 600 / 1.45 / -1 | Visible label, required/optional meaning linked to control. |
| Input value | 16 / 600 / 1.5 / -1 | Dates and values; never smaller than16 on mobile. |
| Main action | 16 / 700 / 1.4 / -1 | Large action text; size variants below override font size. |
| Error/help | 13 / 600 / 1.5 / -.45 | Specific corrective instruction connected to field. |
| Metadata | 12 / 500 / 1.6 / -.45 | Timestamps and noncritical metadata. |
| Display price | 32 / 800 / 1.15 / -2 | Amount separate from smaller currency and period. |
| Compact number | 16 / 700 / 1.4 / -.5 | Quantity or price in compact contextual display. |
| Identifier | 14 / 400 / 1.6 / 0 | D2Coding; selectable and optionally copyable. |
| Eyebrow | 12 / 700 / 1.4 / +1.2 | Short category label, never long body prose. |

TYPE-03: Tracking is optical, not a way to align columns or fit oversized text. Right-align numeric columns and use tabular figures. Keep currencies in the same cell. Do not put whole date strings in monospace. Disable Android extra font padding where needed and verify baseline and clipping on actual devices.

TYPE-04: Preserve long documentation. Do not delete detailed situation/exception rules to simplify a page. Use readable measure and section spacing; prevent horizontal prose scrolling. At narrow widths wrap titles and table documentation; do not scale the page down. Test large system text and web zoom.

## Controls and interactions

- CONTROL-01: Button faces XS32/SM36/MD44/LG52; text12/13/14/16; radii8/10/12/14. Icon faces28/32/40/48. Minimum interactive target44; distinguish face from target. Show sizes in aligned groups with usage captions, not sparse widely separated samples.
- CONTROL-02: Use Lucide geometry consistently. Status icons14, stroke1.75, label gap6. Upload icon18 and label14/600. Icon-only buttons have accessible names and disabled/loading states. No Unicode substitutes for status symbols.
- CONTROL-03: Custom controls retain native semantic meaning, focus, keyboard, validation and form linkage. Select supports disabled options, selection, dismissal, focus restoration. Date and time have designed triggers/panels, clear/today or commit actions; never delegate visual design to an OS HTML select.
- CONTROL-04: Checkbox supports mixed; radio single selection; switch and box ON/OFF are binary settings. Slider fill terminates at thumb and matches accessible numeric value. Rate fills all stars through selected rating. Quantity controls keep square buttons at every size and clamp within explicit bounds.
- CONTROL-05: Inputs have visible labels and connected error/help text; errors also use text, not color alone. Quiet chat composer may omit a strong outline while retaining visible keyboard focus through another treatment. File choice cancellation preserves prior value; show actual selection/error, never claim an upload without a server operation.
- CONTROL-06: Flat tabs use a moving underline without gradient; segmented controls use a single sliding surface. Preserve selected semantics and keyboard navigation. Dismissable overlays close on Escape/back/outside, trap relevant focus, and restore the trigger. One popup per group; opening one must not leave conflicting popups behind.

- COLOR-03: Semantic button emphasis uses the approved gradient-corner recipe (review 09+04, selected 2026-09-09) in `buttonEmphasis` and its light appearance set. Keep an opaque neutral face and appearance-specific neutral foreground; tone changes only the gradient perimeter and localized corner light. Use brand, positive, danger, warning, info or neutral according to the action meaning, without coloring every action or implying completion. Labels and icons must carry meaning independently of hue. This selection supersedes the exploratory saturated filled faces; white on-action text still applies to explicitly filled brand-pink buttons, not to the neutral light face. Measure composed contrast under COLOR-02.
- CONTROL-07: Use the selected gradient-corner material for semantic emphasis, preserving existing size/target rules and project action hierarchy. Secondary/ghost/social variants retain their own contracts. Loading retains the face, reserves label width, exposes busy state and blocks repeat activation. Focus uses a separately visible outline. Disabled removes the colored perimeter and corner light and uses the neutral disabled set without elevation. Pressing changes depth without scaling or layout shift. Preserve pointer, keyboard, failure/retry and caller-owned pending behavior; a local example is not a successful server operation.
- DEPTH-06: Compose the gradient-corner button from an opaque neutral face, a thin directional gradient border and an upper-left radial corner wash under content. Keep the selected hue across the whole border, with stronger light-appearance coverage; do not terminate a chromatic perimeter in neutral gray. Align the perimeter and corner light source; keep the wash clipped to the face radius and neutral contact shadows outside clipping. Use token-defined rest/hover/pressed neutral shadows; do not add the unselected 09+06 colored drop shadow or old three-strength controls by default. Animate corner opacity and shadow with interruptible transitions, shallow press and immediate reduced-motion states. Do not pulse, scale or turn the face into a full color fill. Unsupported renderers require a disclosed verified fallback, not a parity claim.

## Data

- DATA-01: Header and body share exact column metrics, padding, alignment and selection width. Numeric sort compares raw numbers, not localized strings. Stable row IDs survive filter, sort and page changes. Empty/filter/pagination and selection states are explicit. Default compact data rows60, header48.
- DATA-02: `isCopyable` controls copy affordance; `copyData` supplies the original value independently of rendering. Copy price raw digits; long identifier belongs in a detail view, not wrapped beneath the person's name. Show success/error feedback and accessible copy labels.
- DATA-03: Overflow is explicit: horizontal scroll preserves column widths, wrap breaks long values without breaking the whole page. Test both with long Korean/Latin strings and narrow screens. Do not truncate essential data without an accessible full-value path.
- DATA-04: Charts provide line/bar/donut choices only where meaningful. Legend, exact values and accessible alternative data remain available. Pointer hover/focus previews; click/tap pins/unpins; keyboard can reach values. Changes animate without misleading intermediate values. Empty/zero/single-point cases must not yield invalid SVG geometry.

## Motion

- MOTION-01: No scale-on-press. Use color/shadow/opacity state changes. Fast controls150ms; segmented220; underline240; popup enter160, exit100 with4px travel. Ease cubic-bezier(.22,1,.36,1). Demonstration spring stiffness180/damping22/mass1.
- MOTION-02: Use the platform's approved animation engine: Motion, anime.js or react-spring on web; existing Reanimated or equivalent native engine on RN. Do not add a dependency without applicable approval. Document the actual engine used and parameters; do not claim CSS timing is an installed animation library.
- MOTION-03: Interrupt/reverse from the current presentation state. Cancel loops on unmount or when hidden. Reduced motion removes translation/springs/stagger and replaces them with immediate or brief opacity changes. No decorative infinite loops by default.
- MOTION-04: Labs demonstrate easing with duration control, spring, real staggered children, and fade, with replay/pause/reset as appropriate. Real components must use their specified state transitions; a motion lab does not substitute for connected interactions.

## Assets and evidence

- ASSET-01: Follow the project's accepted asset guide. Verify alpha-channel transparency on multiple solid backgrounds; baked checkerboard is a failed asset. Preserve failed outputs as rejected evidence, never silently apply them or claim completion. Use accepted assets with intended dimensions and responsive placement.
- VERIFY-01: Capture reference and implementation at equal logical dimensions, fonts, data, state, scroll and reduced-motion settings. Compare overlay/diff and inspect clipping, alignment, shadows, baselines and interactions. DOM checks alone cannot certify visual parity; web cannot certify native.
- VERIFY-02: State each platform and check as pass/fail/unverified/not-applicable with evidence. Never mark unfinished controls or visual parity complete because a build passes. Preserve full source docs and report actual runtime compatibility separately from deployment authorization.


## Identity and appearance

- IDENTITY-01: The library and documentation identity is IKY Design System. Use the generated IKY wordmark for the documentation masthead; product-domain people, memberships and chat are illustrative content, not the identity of the design system. Preserve licenses, source history and evidence without presenting a former product brand as the current system name.
- THEME-01: Support light, dark and system preferences. System resolves to the current OS appearance and follows changes while mounted; an explicit choice overrides OS changes. Missing/unspecified OS appearance resolves to light. Persist the user's preference, not the resolved OS value; unavailable persistence must not disable switching.
- THEME-02: Resolve the full semantic palette, material and shadow set together. The root color/material/shadow sets are dark; themes.light contains the corresponding light sets. Do not invert screenshots or apply a whole-page filter. Keep the bright action brand, but adapt neutral surfaces, text, status meaning, borders, inset depth and floating materials. Verify contrast per COLOR-02 in both appearances.
- THEME-03: Switching appearance preserves component values, selected rows, selected dates and navigation state. Controls expose current choice with text and selected semantics. Test refresh persistence and OS change behavior separately from manual switching.
- THEME-04: Documentation examples, overlays, mobile frames and empty/loading/error states must consume the selected appearance. A light canvas surrounding hardcoded dark components is incomplete. Retained dark CSS measurements are historical geometry references, not authorization to force dark text/background values into light mode.

- THEME-05: Light surfaces remain near-white: canvas #fafafa, surface #fefefe, card #ffffff and muted #f2f2f2. Establish depth with highlights and low-opacity shadows rather than dark gray fills. Explanatory text uses the secondary text token, never a border token. White social-button faces retain dark foregrounds independently of appearance.
- DEPTH-05: Filled, secondary, outlined, social and icon button faces use the current control shadow token: top highlight plus contact, near and diffuse layers. Ghost actions remain flat; pressed faces use the shallow input shadow without scaling. Verify visible depth against the surrounding surface, not just the presence of a shadow property.
- LAYOUT-04: Keep specimen headings and content separated; the gallery recipe uses20 units. Dialog body and action footer are separate regions, with24 units above the footer; scrolling body content must not swallow actions. A side drawer occupies available safe viewport height at a bounded width. Segment groups fit their content unless stretching serves an explicit layout purpose. Loading placeholders reflect the pending content structure.
- SCOPE-01: Distinguish contract maintenance, platform implementation and product adoption. Updating IKY or hosting its gallery does not authorize changing the host product's branding, native configuration, dependencies or deployment. Treat future integration requirements as guidance rather than unfinished adoption work.
- PORTABLE-01: Share the language-independent contract, semantic tokens, detailed state/layout recipes and accepted visual examples across environments. Keep reusable implementation adapters platform-specific. React with Vite and Next may share React components subject to their runtime constraints; React Native and Flutter retain their own rendering, semantics, layout and motion implementations. Do not assume source-code sharing proves visual equivalence.

- REFERENCE-01: The bundled interactive HTML sheet is the visual and behavioral reference implementation of this contract. Tokens define numeric values; rules and recipes define semantics and exceptions. Resolve discrepancies explicitly rather than promoting an implementation defect to the standard. A bundle is usable only with matching contract and asset manifests. Preserve all detailed sections when updating it. Platform adapters must reconstruct the design in their own primitives, not embed screenshots or a WebView to manufacture parity.

## Overlay selection and lifecycle

See [overlay behavior](overlay-behavior.md) for the decision matrix, exceptions and full state contract.

- OVERLAY-01: Select the host by task and environment. Equivalent confirmations in the same context use one family; danger severity alone does not select a different host. Preserve actual OS-owned surfaces.
- OVERLAY-02: Share confirmation anatomy and action hierarchy. Show relevant consequences/data and explicit commit/return labels; rendered primary and secondary roles must differ. Default two actions to a horizontal row with responsive text-size exceptions.
- OVERLAY-03: Fit short task surfaces to content within the usable viewport. Keep actions reachable, support visible keyboards, and use an explicit dependent step instead of appending an action below off-screen details.
- OVERLAY-04: Preserve topmost ownership, pending/error/retry state, parent return, focus and priority-overlay coordination. Serialize native host transitions through lifecycle completion.
- OVERLAY-05: Reuse semantic confirmation components within compatible adapters; trace shims and aliases before migrating. Scope a change by task family, not primitive name alone.
- OVERLAY-06: Verify paired actions and full entry/commit/failure/return paths in the target environment. Static consistency and native runtime acceptance are separate findings.
