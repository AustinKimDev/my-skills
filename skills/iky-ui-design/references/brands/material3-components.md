---
id: material3-components
name: Material Design 3 - components
status: text-verified
checked_at: 2026-10-23
---

# Material Design 3: component notes

Scope: reusable citation notes for mobile (compact window, phone) component decisions. Captured 2026-10-23.

Environment: m3.material.io renders client-side; a direct fetch returns only the page title and description. The page text was therefore read through a third-party reader that renders the live page (`https://r.jina.ai/https://m3.material.io/components/<component>/<guidelines|specs>`). Only text was read. Figures, diagrams and measurement drawings were not seen, so any value that appears only in a drawing is marked "Not documented in captured text". Values quoted from spec tables are as printed. dp is Android density-independent pixels. Notes follow M3 with the M3 Expressive update where the page says so; items marked "baseline" are older M3 designs the pages no longer recommend.

How to cite: use the heading `## Component: <name>` as the anchor. Text marked "(inferred)" is the note-taker's reading. No number is invented.

Limits: M3 is Google's cross-platform spec, not an iOS convention. M3 has no component pages for banner, toast (the equivalent is snackbar), empty/error state or section header; those sections say so. Pages change; this is the state on the capture date.

---

## Component: Button

Source: https://m3.material.io/components/buttons/guidelines ; https://m3.material.io/components/buttons/specs

- Anatomy: container, label text, optional icon.
- Variants: default button and toggle button (toggle is M3 Expressive). Five color styles in order of emphasis: elevated, filled, tonal (filled tonal), outlined, text. Toggle buttons do not use the text style. Shape: round (default) or square (square is Expressive); round buttons morph toward square when pressed and toggles change shape when selected.
- Sizes: Expressive offers extra small, small (default), medium, large, extra large. Small button horizontal padding: 24dp (baseline) or 16dp (Expressive recommends 16dp). Corner radius for square buttons by size XS/S/M/L/XL: 12/12/16/28/28 dp; pressed: 8/8/12/16/16 dp. Button heights: Not documented in captured text (checked https://m3.material.io/components/buttons/specs; drawing only). Extra small and small icon-bearing buttons need a target of at least 48x48dp.
- States: enabled, disabled, hovered, focused, pressed (elevated: elevation 1 by default and 0 when disabled). Toggle adds selected/unselected.
- Usage rules:
  - Buttons are for discrete actions; they should not be overused, because too many disrupt hierarchy. Put low-priority actions in overflow menus, icon buttons, chips or text links.
  - Filled: most important, final actions (Save, Join now, Confirm); ideally one per page.
  - Tonal: lower priority than filled but needs more than an outline (e.g. Next in onboarding).
  - Outlined: medium emphasis, pairs with a filled button for secondary actions; place on simple backgrounds, be careful on images; the page warns it looks like a chip and suggests filled or tonal instead.
  - Elevated: only when separation from a busy background is needed; use sparingly.
  - Text: lowest priority, especially among multiple options; do not underline (use a hyperlink in body text instead); in dialogs, snackbars and cards.
  - Width fits the label; never narrower than the label; may stretch responsively but avoid long flat buttons on large windows.
  - Button groups: primary action gets more emphasis through size, color or shape.
  - Toggle buttons are for binary selections such as Save or Favorite; unselected outlined icon, selected filled icon (or heavier weight); keep the label length similar in both states.
- Copy: label ideally 1-3 words, sentence case (first word and proper nouns capitalized), single line, never truncated or wrapped. Icon on the leading side, one icon only.

## Component: Icon button

Source: https://m3.material.io/components/icon-buttons/guidelines ; https://m3.material.io/components/icon-buttons/specs

- Anatomy: icon, container.
- Variants: default and toggle. Color styles: filled, tonal, outlined, standard (lowest emphasis, no container at rest).
- Sizes: extra small 32dp, small 40dp (default), medium 56dp, large 96dp, extra large 136dp; widths default, narrow, wide (Expressive). Extra small and small need a target of at least 48x48dp. Round (default) or square shape; corner radius table same as Button.
- States: enabled, disabled (10% state layer), hovered (8%), focused (10%), pressed (10%); toggle selected/unselected.
- Usage rules:
  - For common, easily understood actions; only a few icon buttons at once.
  - Filled for high-impact key actions, used sparingly; tonal as the middle ground for secondary actions next to a filled one; outlined for medium emphasis; standard for low emphasis or on colorful surfaces.
  - Buttons of similar importance should be the same size; use size and color to emphasize the primary one.
  - Use a toggle icon button only when the icon has a selected state (favorite, bookmark); not for overflow menus.
  - Selection must be shown by at least two properties, not color alone: filled icon when selected, or semibold, then bold, weight if no filled version exists.
  - Hover shows a tooltip describing the action, not the icon name.
  - Default icon buttons use filled icons; icon meaning must be clear and unambiguous.

## Component: List row

Source: https://m3.material.io/components/lists/guidelines ; https://m3.material.io/components/lists/specs

- Anatomy (container and label text required, rest optional): container, label text, supporting text, trailing text, trailing icon, trailing selection control (checkbox, radio, switch), leading avatar container and text, leading icon, leading media (image or video).
- Variants: lists (expressive; recommended) and baseline. Styles: standard and segmented. Selection modes: single-action, multi-action, single-select, multi-select; non-interactive lists also exist. Interactions: expand/collapse, swipe.
- Size: item height is set by the tallest element. Spec table values: label left padding 16dp; leading element left padding 16dp; trailing element left padding 16dp and right padding 24dp; divider inset left 16dp; target 48dp; label and leading element align to top when height is 88dp or taller (center otherwise). Row heights for one/two/three lines: Not documented in captured text (checked https://m3.material.io/components/lists/specs). Expressive corner radius: unselected 4dp inner and 16dp outer; selected 16dp.
- States: selected state applies to the whole item (item and its checkbox both show it); other state layers per M3.
- Usage rules:
  - Lists are for communicating or selecting discrete items, optimized for reading; keep visuals and primary text in the same position in every row; anchor visuals at the leading edge.
  - Keep label text brief; limit supporting text to one to three lines.
  - Selection controls: checkboxes for multi-select, switches for settings, radio buttons for single select.
  - Single-select rows have no nested secondary actions and shouldn't use checkboxes; multi-select rows shouldn't use radio buttons; single-action rows can't have secondary actions or a persistent selected state.
  - Multi-action: the primary action takes most of the space; supplementary actions (bookmark, menu) go in the trailing position.
  - Swipe: the primary action is the final end-aligned option and a full swipe triggers it; always offer an alternative way to reach hidden actions.
  - Use gaps for contained lists; limit dividers to uncontained or complex lists.
  - Compact windows: lists run edge to edge and selecting an item opens a detail page.
- Copy: not specified beyond brevity.

## Component: Section header

Source: https://m3.material.io/components/lists/guidelines

- Not documented (checked https://m3.material.io/components/lists/guidelines and /specs; no subheader or section-header element in the anatomy). The Search page mentions category labels such as Recent, Contacts, Suggestions inside suggestion lists, and gaps to separate list groups (https://m3.material.io/components/search/guidelines). Dividers have their own component page, which was not read.

## Component: Tabs / segmented control

Source: https://m3.material.io/components/tabs/guidelines ; https://m3.material.io/components/tabs/specs ; https://m3.material.io/components/segmented-buttons/guidelines ; https://m3.material.io/components/segmented-buttons/specs

- Tabs (content switching within a page):
  - Anatomy: container, optional icon, optional badge, label, divider, active indicator.
  - Variants: primary tabs (under an app bar, main content destinations) and secondary tabs (within a content area, always below primary; used when a second level is needed). Fixed or scrollable.
  - Sizes: container height 48dp (label only) or 64dp (icon and label); icon 24dp; divider 1dp; primary indicator 3dp high, secondary 2dp; indicator minimum length 24dp; padding inline icon-text 8dp.
  - Rules: group related content at the same hierarchy level, not sequential content; avoid more than four tabs at once (five or more gets cramped); either all tabs have icons and text or none; labels short and not truncated unless required; scrollable tabs offset the first tab 52dp from the leading edge; badge text limited to four characters including "+", and cleared once the content is viewed; avoid swipeable content inside tab content because it conflicts with swipe-between-tabs; do not scroll tabs behind an app bar.
  - Active tab: underline plus color change on text and icon.
- Segmented buttons (single choice, multi choice, view switching):
  - Anatomy: container, segments, optional icon, label text, selected icon (checkmark).
  - Variants: single-select, multi-select.
  - Sizes: height 40dp; outline 1dp; padding at least 12dp left/right; element padding 8dp; target 48dp; density reduces height by 4dp per step.
  - Rules: 2 to 5 segments; more than five choices should use another component such as chips; labels short and consistent in length, no wrapping; if too long use an icon alone; do not mix icon-only and text segments; when icon and text are used the icon becomes a checkmark when selected; keep margins from the viewport edge and cap segment width on large screens.

## Component: Chip (filter/choice)

Source: https://m3.material.io/components/chips/guidelines ; https://m3.material.io/components/chips/specs

- Anatomy: container, label text, optional leading icon or image, trailing icon (required on input chips, optional on filter chips).
- Variants: assist, filter, input, suggestion. (Choice chips as a separate type: Not documented; a filter chip set can be single-select, see below.)
- Sizes: container height 32dp; corner radius 8dp; icon 18dp; left/right padding 16dp (8dp with icon); padding between elements 8dp; input chip avatar 24dp with 12dp corner radius. Target at least 48dp even if it extends beyond the visible container; at least 8dp between chips. A trailing remove/close icon needs a 48x48dp target, which requires a chip width of at least 88dp.
- States: selected and unselected (filter chip selection shows a leading checkmark); elevation only when over an image, never to show press (use ripple).
- Usage rules:
  - Chips are not buttons: they are dynamic, contextual, supplemental options shown as a set; buttons carry linear steps, final actions and persistent fixtures. Do not use chips to finish or progress a task. Buttons: no more than 3 in one arrangement.
  - Never show a single chip alone; show in a set. A filter chip set should not offer a single option.
  - Filter chips: multi-select by default; may be set to single-select (selecting one deselects the others); do not mix single-select and multi-select chip sets on one page. May wrap; if more than two rows, use horizontal scrolling. Filter chips can open a menu; in compact windows the whole chip should open the menu because the trailing icon target is too small.
  - Input chips: user-authored items, removable, can be edited, reordered, moved between fields.
  - Assist chips: contextual actions, shown after primary content or at the bottom of a screen.
  - Suggestion chips: product-generated suggestions, laid out inline in a row, wrapping to a new line.
- Copy: labels 20 characters or fewer; same type style as buttons; skip articles; assist chips start with a verb (and can change, e.g. Save to Saved); filter chips use nouns for the category to include, avoid negatives such as "Exclude images"; suggestion chips use nouns or short phrases.

## Component: Text field / textarea / search

Source: https://m3.material.io/components/text-fields/guidelines ; https://m3.material.io/components/text-fields/specs ; https://m3.material.io/components/search/guidelines ; https://m3.material.io/components/search/specs

- Text field anatomy: container, optional leading icon, label text (empty and populated positions), optional trailing icon, caret, input text, optional supporting text, character counter, prefix/suffix text.
- Variants: filled and outlined (same functionality; choose by style; do not intermix in the same region or form; separate by section if both are used). Input formats: single line, multi-line (grows), text area (fixed height, scrolls; recommended instead of multi-line on web).
- Sizes: container height 56dp for both; left/right padding 16dp (12dp with icons); padding between icon and text 16dp; supporting text top padding 4dp; target 56dp; images inside a field 24dp high.
- States: enabled, disabled, hovered, focused, error, read-only (styled the same as a regular field and clearly labeled read-only) (the states list itself is shown as drawings; names from the pages' text).
- Usage rules: every text field needs a label (or an adjacent label aligned to the leading edge); the label always stays visible and moves from the middle to the top on focus; do not truncate or wrap labels; mark required fields with an asterisk and explain it once; single-line fields are not for long answers; include a counter when there is a limit; replace supporting text with error text rather than adding a line, so layout does not shift; describe how to avoid the most likely error; show an error icon as a second indicator beyond color.
- Search (field and entry points): three entry points: search bar (search within a view), search app bar (when search is the primary global function), search icon button (secondary). Focused search opens suggestions before typing and results while typing, in a list; layouts docked or full-screen. Contained style is recommended; divided is baseline.
  - Search bar sizes: height 56dp; width min 360dp, max 720dp; margins unfocused 24dp, focused 12dp; avatar 30dp. Leading side: navigation icon button or a non-functional search icon; one or two trailing icons (maximum two; avatar plus at most one icon button); optional clear icon while focused.
  - Hinted text is short and says what can be searched ("Search your messages"); search bar text always includes the word "Search".
  - Add variety to results with leading icons, category labels (Recent, Contacts, Suggestions), avatars, and filter chips; use gaps to separate groups.
  - Search bar container should use surface container high only when the background is surface or a tonal surface; keep the container more than one surface step away from the background.

## Component: Stepper (quantity)

Source: https://m3.material.io/components/

- Not documented. M3 has no stepper or quantity-input component page (checked the https://m3.material.io/components index via the reader, which lists no stepper; the nearest pages are slider, text fields and segmented buttons). Using two icon buttons around a number is (inferred) a composition of Icon button and Text field, not a documented M3 pattern.

## Component: Checkbox / radio

Source: https://m3.material.io/components/checkbox/guidelines ; https://m3.material.io/components/checkbox/specs ; https://m3.material.io/components/radio-button/guidelines ; https://m3.material.io/components/radio-button/specs

- Checkbox anatomy: container, icon. States include selected, unselected, indeterminate (parent with partly selected children). Sizes: container 18dp, corner 2dp, icon 18dp, state layer 40dp, target 48dp.
- Checkbox rules: select one or more options from a list; sub-selections; on/off in desktop environments; group similar options; use instead of switches for multiple related options (they take less space). Parent-child: checking the parent checks all children; unchecking clears them; mixed children make the parent indeterminate, and checking an indeterminate parent checks all. A checkbox used to turn something on or off must take effect immediately.
- Radio anatomy: selected icon, unselected icon, adjacent label text. Sizes: icon 20dp, state layer 40dp, target 48dp.
- Radio rules: single selection from a set whose options are all exposed; use five or fewer (otherwise consider a drop-down menu, which costs extra steps); always an adjacent label; list vertically (avoid horizontal lists); always one option pre-selected; do not nest radio buttons or allow multiple; the label or the icon is tappable; takes effect immediately unless it sits in a dialog or page that needs saving.
- Selection control choice (both pages): checkboxes for multiple related options, radio buttons for a single option in a list, switches for standalone or more verbose options such as settings.

## Component: Switch / toggle

Source: https://m3.material.io/components/switch/guidelines ; https://m3.material.io/components/switch/specs

- Anatomy: track, handle, optional icon in the handle.
- Sizes: track 52dp wide and 32dp high; outline 2dp; handle unselected 16dp, selected 24dp, pressed 28dp (with icon: 24dp); icon 16dp; state layer 40dp; target 48dp.
- States: on/off (a larger handle indicates on), pressed, hovered, focused, disabled.
- Usage rules: for settings and standalone options (on/off, true/false); the effect starts immediately without saving; do not use for opposing options where only one of a set applies (use a connected button group); not for choosing multiple options that need saving (use checkboxes); a switch cannot replace a button for a call to action.
- Copy: always pair with an inline label that says what the switch controls when on; short and direct; do not put text inside the switch (too small). Handle icon, if used, must clearly show on/off (e.g. check and X); avoid ambiguous icons such as a moon.

## Component: Bottom sheet

Source: https://m3.material.io/components/bottom-sheets/guidelines ; https://m3.material.io/components/bottom-sheets/specs

- Anatomy: container (only required element), optional drag handle, scrim (modal only); content can include list items, dividers, media.
- Variants: standard (coexists with the main UI, both usable) and modal (blocks the rest of the app, with a scrim; mobile only; alternative to inline menus or simple dialogs, especially for long lists).
- Sizes: full window width up to 640dp; above that top and side margins 56dp; top margin 72dp; drag handle padding 22dp top/bottom (handle centered); height variable.
- Rules:
  - Modal initial height is capped at 50% of screen height so top actions are reachable; taller content can be pulled to full screen and scrolled inside.
  - Dismissal for modal: tap the scrim, swipe down, choose an item, or a close affordance in the sheet's app bar; show a close affordance in a full-screen modal sheet.
  - Drag handle can be dragged or tapped to move through preset heights or close; if there are multiple preset heights without a handle a single-pointer alternative must exist; tapping the scrim always closes.
  - Standard sheet at full height shows a collapse icon in an app bar.
  - Sheet content scrolls when it exceeds the visible height; Android predictive back is supported.
- Corner radius and scrim opacity: Not documented in captured text (checked https://m3.material.io/components/bottom-sheets/specs; Android sets the scrim automatically).

## Component: Dialog / alert

Source: https://m3.material.io/components/dialogs/guidelines ; https://m3.material.io/components/dialogs/specs

- Anatomy (basic): container, optional icon, optional headline, supporting text, optional divider, button label text, scrim. Full-screen: container, header, close icon, headline, text button, optional divider.
- Variants: basic dialog and full-screen dialog (compact windows only; for form fields, unsaved changes, or nested dialogs).
- Sizes (basic): corner radius 28dp; width min 280dp, max 560dp; padding 24dp all sides; title to body 16dp; body to actions 24dp; padding between buttons 8dp; icon 24dp. Full-screen: header 56dp, bottom action bar 56dp, close icon 24dp, padding 24dp.
- Usage rules:
  - Dialogs are interruptive and used sparingly, for critical information or a required decision; low and medium priority messages belong in a snackbar.
  - Maximum two actions: one acknowledgement alone, or one confirming plus one dismissing. A third action such as "Learn more" is not recommended because it navigates away and leaves the task unfinished.
  - Buttons are text buttons aligned to the trailing edge; the confirming button is closest to the edge, dismissive to its left (RTL mirrored). Stacked buttons are allowed for long text, with confirming above dismissive.
  - Disable the confirming action until a choice is made; never disable dismissive actions.
  - Content avoids scrolling; if it scrolls, title and buttons stay pinned.
  - Full-screen: dismissing with unsaved changes opens a basic dialog to confirm discard; field errors appear inline, general errors (network) in a basic dialog after the confirming action fails; the close X is the only navigation in its app bar.
- Copy: headline is a brief, clear statement or question; avoid apologies ("Sorry for the interruption"), alarm ("Warning!"), ambiguity ("Are you sure?"); confirming labels state the result ("Send", "Create", "Save"); avoid vague "Done", "OK", "Close" in full-screen confirmation.
- Destructive-specific styling: Not documented as a separate rule (checked https://m3.material.io/components/dialogs/guidelines).

## Component: Toast / snackbar

Source: https://m3.material.io/components/snackbar/guidelines ; https://m3.material.io/components/snackbar/specs

- M3 has no "toast"; the equivalent is the snackbar.
- Anatomy: container, supporting text, optional action, optional close button.
- Sizes: in compact windows height grows from 48dp to 64dp for one or two lines. Padding and width values: Not documented in captured text (drawing/token table).
- Usage rules:
  - Short updates on a process the app has performed or will perform; temporary; do not require interaction or block the page; low priority.
  - Only one snackbar at a time; consecutive ones appear one by one (an updated one may replace an outdated one); never stacked or side by side.
  - At most one action; an Undo action is the example for amending a choice; a dismiss action is optional and usually unnecessary.
  - Without an action: may auto-dismiss after 4-10 seconds depending on platform; with an action: stays until the user acts or dismisses.
  - Web: auto-dismiss needs inline feedback near the trigger (e.g. Save becomes Saved) or an actionable snackbar.
  - A snackbar must not be the only way to reach a core use case.
  - Placement: bottom of the UI in front of content; above a FAB; not in front of navigation components or frequently used targets; full width only when no persistent navigation bar/app bar.
  - No icons, stylized text, or inline links; use a text button for a link; do not use filled or elevated buttons inside.
- Copy: one line when possible, up to two lines on mobile; action text colored differently from the label.

## Component: Empty / error state

Source: https://m3.material.io/components/

- Not documented as a component (checked the https://m3.material.io/components index via the reader; no empty-state, error-state or toast entry).
- Related statements: text field error text and error icon rules (see Text field); dialog rules for general vs field errors: field errors inline where they occur, general errors in a basic dialog, show all errors at once and say briefly how to fix them (Dialogs page).
- Illustration, layout, action recommendations for empty screens: Not documented.

## Component: Badge

Source: https://m3.material.io/components/badges/guidelines ; https://m3.material.io/components/badges/specs

- Anatomy: small badge (dot), large badge container, large badge label.
- Variants: small (simple circle for an unread notification) and large (count or status text).
- Sizes: small badge 6dp (corner radius 3dp); large badge one digit 16dp, max-count badge 16x34dp, corner radius 8dp; padding between badge and text container 4dp.
- Rules: indicate a notification, item count or other information for a navigation destination; placed at the ending edge of icons, inside other components (navigation bar, rail, app bar, tabs). Label at most four characters including "+". Default color uses error roles (container error, text on error); custom colors need at least 3:1 contrast. Use a small badge where space is tight (e.g. app bars); a large badge where collisions are not an issue (navigation rail); a large badge beside a trailing element should sit at the trailing edge or use a small badge. Fixed position: do not move it arbitrarily or place it over the icon. In a navigation bar, hide the badge once the destination is selected. In tabs, update or remove the badge once the content is viewed.

## Component: Banner / notice

Source: https://m3.material.io/components/banner/guidelines

- Not documented in M3 (checked https://m3.material.io/components/banner/guidelines; the page returns the generic Material Design shell with no banner content, and https://m3.material.io/components lists no banner entry; the Material Components Android docs Banner.md says the banner component is yet to be completed). Nearest documented components: snackbar (temporary low-priority message) and dialog (critical, blocking).
- Component choice table from the Dialogs and Snackbar pages: snackbar = low importance, action optional, may auto-dismiss; dialog = high importance, action required, blocks content.

## Component: Top app bar / navigation bar

Source: https://m3.material.io/components/app-bars/guidelines ; https://m3.material.io/components/app-bars/specs

- (The path /components/top-app-bar/ returned no content; the current page is /components/app-bars/.)
- Anatomy: container, leading button, headline, optional subtitle, trailing elements/icons.
- Variants: search app bar, small, medium flexible, large flexible (Expressive); baseline medium and large no longer recommended. Text alignment: leading edge (default) or centered (centered is a configuration of small).
- Heights in dp: Not documented in captured text (checked https://m3.material.io/components/app-bars/specs; measurement tables are drawings/tokens). Headline typography per variant: search = body large, small = title large, medium flexible = headline medium, large flexible = display small. Subtitle: small = label medium, medium flexible = label large, large flexible = title medium.
- Rules:
  - Show content and actions related to the current page: navigation, headline, 1-2 essential actions. Only one action, two if necessary; the primary action should alter or exit the page (Send, Save, Edit). More actions go in a toolbar; avoid an overflow menu in the app bar.
  - Up to two trailing icon buttons; most-used closest to the leading edge. To raise prominence use one filled or tonal (optionally wide) icon button; avoid multiple filled/tonal buttons.
  - Leading button navigates: menu icon (opens a modal expanded rail) or back arrow.
  - Headline describes the current page, section or product; do not truncate it; in the small bar do not wrap (use medium/large flexible to wrap to two lines maximum).
  - Container: straight corners, default height, full width, do not shorten; starts the same color as the background and fills with surface container on scroll; may be transparent on scroll if actions keep a container fill; flexible bars can compress to small on scroll but must not become a search app bar.
  - Search app bar: only where search is key; up to two trailing icons plus an avatar on mobile (four icons on large screens); bar text should include "Search".

## Component: Tab bar / navigation bar (bottom)

Source: https://m3.material.io/components/navigation-bar/guidelines ; https://m3.material.io/components/navigation-bar/specs

- Anatomy: container, icon, label text, active indicator, optional small badge, optional large badge (with label).
- Variants: flexible navigation bar (Expressive; shorter; supports horizontal items in medium windows) and baseline navigation bar (no longer recommended). Items are vertical (icon above label) in compact windows and horizontal in medium windows.
- Sizes: bar spans the full window width; vertical items share the width equally. Bar height and indicator size: Not documented in captured text (checked https://m3.material.io/components/navigation-bar/specs; measurement drawings).
- States: active (filled icon, active indicator) and inactive; hover/focus/pressed state layers.
- Usage rules:
  - Three to five top-level destinations on mobile or tablet; one destination is always active. Not for a single task such as viewing one email; not for fewer than three destinations (use tabs); not for more than five (use tabs or a modal expanded navigation rail).
  - Every item needs a label of 1-2 words; do not remove labels; do not wrap, truncate or shrink them.
  - Use a filled icon for the active item and outlined for inactive; if no filled version exists, increase weight to semibold. Active and inactive icons need at least 3:1 contrast with the container.
  - Destinations are fixed in position; no scrolling the items; do not swipe between destinations.
  - Active indicator only on one destination.
  - Re-selecting the active item scrolls to the top. Either preserve each destination's state (scroll, tab, in-line search) or reset it; the page suggests preserving where switching is frequent.
  - May hide on scroll down and reappear on scroll up, but not when a screen reader is active. May be covered temporarily by dialogs, sheets, drawers or the keyboard, never permanently. A FAB sits above the bar, never covering it.
  - Badges sit at the upper right of the icon: small for an update, large for a count.
  - Use navigation for distinct pages and tabs for related content within a page.

---

## Comparison prompts

1. How many filled buttons does the screen show, and are low-priority actions demoted to tonal, outlined, text or icon buttons?
2. Does each chip set stay in one selection mode, keep labels at 20 characters or fewer, and keep a 48dp target and 8dp spacing?
3. Is a dialog used only for critical decisions with at most two actions, while routine confirmations use a snackbar with at most one action?
4. Does the bottom bar keep three to five labeled destinations with one filled active item?

Combine with [apple-hig-components.md](apple-hig-components.md) when an option needs an iOS convention beside M3. Treat combinations as hypotheses.
