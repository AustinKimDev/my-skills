---
id: toss-tds
name: Toss Design System (TDS Mobile / TDS React Native)
status: text-verified
checked_at: 2026-10-23
---

# Toss Design System (TDS) component notes

- Purpose: citable component facts for shared mobile UI decisions. Complements [toss.md](toss.md), which holds the earlier landing and ListRow capture.
- Primary source: [TDS Mobile docs](https://tossmini-docs.toss.im/tds-mobile/) (web/WebView React components). A few components exist only in [TDS React Native](https://tossmini-docs.toss.im/tds-react-native/) and are marked.
- Environment: documentation text read on 2026-10-23 through a page-to-markdown fetch. No screenshots, no rendered or native device inspection. Status applies to the recorded page text only.
- Limits that apply to every section: the docs list props and rules, rarely pixel values. Where no number is printed here, the source did not print one. Do not treat the absence of a rule as permission. Anything marked "inferred" is this note's reading, not the source's statement. Doc pages contain internal inconsistencies, flagged where seen. Do not copy Toss brand colors, icons or assets.
- Shorthand: `t3`..`t7` are TDS typography tokens; the docs do not state their pixel sizes on the pages read.

## Component: Button

Source: https://tossmini-docs.toss.im/tds-mobile/components/button/ ; https://tossmini-docs.toss.im/tds-mobile/components/BottomCTA/check-first/ ; https://tossmini-docs.toss.im/tds-mobile/components/text-button/ (name only, not read)

- Observed pattern: text label, optional icon, loading indicator (three indicators moving in sequence), dim layer for pressed and loading.
- Color: `primary` (default), `danger`, `light`, `dark`.
- Variant: `fill` (default, high saturation, for primary actions) and `weak` (low saturation, semi-transparent, for secondary actions). Rule stated: fill for primary, weak for secondary so the two are clearly distinguished.
- Size: `small`, `medium`, `large`, `xlarge` (default). No pixel values printed.
- Display: `inline` (default), `block` (own line, screen width), `full` (parent width).
- States: loading (width does not change, `aria-busy`), disabled, loading + disabled together, pressed (dim layer).
- Rules: icon-only needs `aria-label`; `as="a"` only with `href`; loading without visible text needs an `aria-label` for the task.
- Copy rules: none stated.
- Placement: bottom-fixed CTA is a separate component, see Bottom CTA note below.
- Bottom CTA (same source family): BottomCTA is the call-to-action button "typically pinned to the bottom" so it stays reachable while scrolling or with the keyboard open. `FixedBottomCTA` = `BottomCTA` with `fixed` true. Single (one button) and Double (`leftButton` / `rightButton`). Double props: `topAccessory`, `bottomAccessory`, `background` (`default`/`none`), `hideOnScroll`, `hasSafeAreaPadding` (default true; uses `--toss-safe-area-bottom`), `hasPaddingBottom` (if true with no safe-area padding, 20px bottom padding). Example Double: danger+weak on the left, default fill on the right. Docs give no rule for choosing Single vs Double and no count-per-screen rule.
- Applicable situation: any screen with one main action plus an optional secondary; bottom-fixed submit bars.
- Limits: sizes and radii are not numerically documented; doc inconsistencies (`type="danger"` vs `color`, `htmlType` vs `type`).

## Component: Icon button

Source: https://tossmini-docs.toss.im/tds-mobile/components/icon-button/ ; https://tossmini-docs.toss.im/tds-mobile/components/ListRow/list-row-components/

- Observed pattern: icon-only action to keep UI compact.
- Variants (`variant`, default `clear`): `clear` (no background; background appears while pressed), `fill` (filled background; background disappears while pressed), `border` (bordered; background appears while pressed).
- `iconSize` default 24 (px); examples use 24, 20, 16. `bgColor` default `adaptive.greyOpacity100` (resting background for fill, pressed background for clear/border). Only `-mono` icons can be recolored.
- Rules: `aria-label` required and should state the action, e.g. "검색하기".
- ListRow variant of it (`ListRow.IconButton`): fill for main action/emphasis, clear for simple action, border to visually separate an area.
- Limits: button box size, touch target, disabled and focus states are not documented.

## Component: List row

Source: https://tossmini-docs.toss.im/tds-mobile/components/ListRow/list-row-overview/ ; https://tossmini-docs.toss.im/tds-mobile/components/ListRow/list-row-components/ ; see also [toss.md](toss.md) (ListRow research update 2026-09-05)

- Anatomy: three regions, `left` (icon/image to identify the item), `contents` (main text), `right` (supplementary info or interactive element).
- Left sub-components: `ListRow.AssetIcon`, `AssetImage`, `AssetLottie`, `AssetText`. Shapes include `squircle` (AssetIcon default), `original`, `card`, `circle`, `square`. Sizes `xsmall`/`small`/`medium`. Fixed sizes stated for AssetImage: square 52x52, circle 40x40, original image height 56 (a caption says 54), 2D emoji height 24, 3D emoji height 40. Optional accessory badge (`acc`, `accPosition` bottom-right default or top-right).
- Contents: `ListRow.Texts` with `type` naming rule: digit = line count (1Row/2Row/3Row), `Right` prefix = right-aligned, trailing letter = style set (A, B, C...). Types 1RowTypeA-C, 2RowTypeA-F, 3RowTypeA-F. Right: Right1RowTypeA-E, Right2RowTypeA-E, used for date, time, price, status. Style sets are not itemised on the pages read.
- Right region composition: right-aligned Texts, `ListRow.IconButton`, `Switch`, `Badge`, or `withArrow` (arrow icon at right edge).
- Spacing (stated): `verticalPadding` small 8, medium 12 (default), large 16, xlarge 24 px; `horizontalPadding` small 20, medium 24 (default) px.
- Dividers: `border` `indented` (default, divider with left indent) or `none` (rows appear connected).
- Alignment: `leftAlignment` / `rightAlignment` `center` (default) or `top`, set independently.
- States: `disabled` with `disabledStyle` type1 (light background) or type2 (darker grey, clearer "not selectable"); touch feedback when `onClick` is set or `withTouchEffect`; emphasis effects `shine` (new/important change) and `blink`; loading skeleton `ListRow.Loader` (types square/circle/bar) sharing the real layout.
- Usage/copy rules: only the general purpose "touch feedback and an arrow help users predict what an item does". No count or copy rules.
- Applicable situation: settings rows, transaction/account rows, mixed text/action lists.
- Limits: font sizes, colors and radius not printed on these pages. Nothing is said about nested tappable zones inside a fully tappable row (SEED documents that, see daangn-seed.md).

## Component: Section header

Source: https://tossmini-docs.toss.im/tds-mobile/components/list-header/ ; page-level title block: https://tossmini-docs.toss.im/tds-mobile/components/top/

- Observed pattern (`ListHeader`, "placed at the top of a page or section"): `title` (required), optional `description`, optional `right`.
- Title options: `TitleParagraph` (typography t7/t5/t4, weight bold/medium/regular, default color grey800), `TitleTextButton` (clickable, variant clear/arrow/underline), `TitleSelector` (dropdown-style title).
- Description: `DescriptionParagraph`; `descriptionPosition` `top` (default, above title) or `bottom`.
- Right: `RightText` (t7/t6, default grey700) or `RightArrow` (arrow default grey400); `rightAlignment` center (default) or bottom.
- `titleWidthRatio` default 0.66 of width vs `right`; fixed at 0.5 at 200% text scale or above (stated).
- Page-level `Top` component is a separate, larger title block (title sizes 22 or 28, subtitle 13/15/17, `upperGap` / `lowerGap` default 24, lower area for buttons). Not a section header.
- Limits: header height, padding, and when to choose each title type are not documented.

## Component: Tabs / segmented control

Source: https://tossmini-docs.toss.im/tds-mobile/components/tab/ ; https://tossmini-docs.toss.im/tds-mobile/components/segmented-control/

- Tab anatomy: `Tab` container (`role="tablist"`) with `Tab.Item` children (`role="tab"`, `aria-selected`); `redBean` adds a red dot top-right for an important update ("(업데이트 있음)" for screen readers).
- Tab size: `large` (default) and `small`; size changes height and text size only (no px). `fluid` makes item width fit text and overflow scroll; `itemGap` in px.
- Tab rule (stated): without `fluid`, max 4 items; use `fluid` for 4 or more. Icon-only tab needs `aria-label` that omits the word "탭".
- Segmented control: choose one of several; docs say it serves the same role as Radio. Container size `small` (default) / `large`; alignment `fixed` (default) or `fluid` (scrolls; left arrow button appears once the first item is scrolled out). `role="radiogroup"`.
- Segmented rule (stated): use `fluid` for many items or long labels. No item-count cap is stated for the segmented control.
- Not documented: disabled, hover, focus states; exact dimensions; when to prefer tab over segmented control (inferred: tab for sections, segmented control for single-choice values, from the stated Radio equivalence).

## Component: Chip

Source: Not documented (checked https://tossmini-docs.toss.im/tds-mobile/ component navigation and https://tossmini-docs.toss.im/tds-react-native/ component navigation; neither lists Chip, Tag or Filter chip). Closest documented parts: `Badge` (status labels, see Badge), `SegmentedControl` (single choice), `Checkbox`. Selection-chip behavior is not documented by TDS.

## Component: Text field

Source: https://tossmini-docs.toss.im/tds-mobile/components/TextField/text-field/ ; https://tossmini-docs.toss.im/tds-mobile/components/TextField/text-area/ ; https://tossmini-docs.toss.im/tds-mobile/components/search-field/

- TextField variants (`variant`, required): `box`, `line` (bottom line only), `big`, `hero`. Sizes not documented.
- Label: `label` above the field; `labelOption` `appear` (default, label only once there is a value) or `sustain` (always shown). Help text: `help` below the field.
- Error: `hasError` plus `help` explaining the error (example: help asks for fewer than 3 characters). Disabled: `disabled` (example reasons: waiting for server, unlocks after a condition).
- Slots: `prefix`/`suffix` strings (currency, unit), `right` node (action button or validation icon), `format` for input formatting.
- Variants of the component: `TextField.Clearable` (clear button), `TextField.Password` (show/hide toggle), `TextField.Button` (looks like an input, opens something; default right icon arrow-down 24).
- TextArea: multi-line for feedback, addresses, memos; extends TextField minus prefix/suffix/right; fixed `height` or auto-grow with `minHeight`. Example variant `box`. Label/error props not shown on its page.
- SearchField: input with `fixed` (pinned at top, `takeSpace` default true keeps layout space), default clear button when text exists, `onDeleteClick`. Variants, sizes, focus states not stated.
- Copy rules: none stated (SEED documents error copy, see daangn-seed.md).

## Component: Stepper

Source: https://tossmini-docs.toss.im/tds-mobile/components/numeric-spinner/ ; https://tossmini-docs.toss.im/tds-mobile/components/stepper/

- The quantity control is `NumericSpinner`, not `Stepper`. TDS `Stepper` is a step-sequence display (numbered steps with title/description, not a quantity control).
- NumericSpinner: decrease and increase `<button>`s around a displayed integer. `size` required: `tiny`, `small`, `medium`, `large` (the text lists three, the prop type includes tiny). No px values. `minNumber` default 0, `maxNumber` default 999, `disable`. Changes announced via `aria-live="polite"`.
- Rules: default aria labels are generic ("빼기"/"더하기"); override for context, e.g. "상품 수량 줄이기" / "상품 수량 늘리기".
- Not documented: loading/error states, remove-at-minimum behavior (SEED documents it, see daangn-seed.md).

## Component: Checkbox / radio

Source: https://tossmini-docs.toss.im/tds-mobile/components/checkbox/ ; https://tossmini-docs.toss.im/tds-react-native/components/radio/ ; consent rows: https://tossmini-docs.toss.im/tds-mobile/components/Agreement/v4/

- Checkbox: `Checkbox.Circle` (check inside a circle) and `Checkbox.Line` (check icon only). `size` default 24 (unit not stated). States: checked/unchecked, disabled (click does nothing and plays a side-to-side shake). `inputType="radio"` gives single-selection behavior (example uses Circle only). Needs `aria-label` that omits the word "checkbox".
- Radio (React Native only): `Radio` container with `Radio.Option` children; selected option emphasized with an animated transition; `horizontalMargin` default 0; disabled at group or option level. No sizes, no option-count rule.
- Agreement v4 (consent rows): left control `checkbox` / `dot` / `hidden`, middle label with `mandatory` / `optional` necessity marker, right badge or arrow, row variants xLarge..small, groups with collapsible children.
- Not documented: row-wide touch target, indeterminate state, option-count guidance.

## Component: Switch

Source: https://tossmini-docs.toss.im/tds-mobile/components/switch/

- Observed pattern: two-state toggle for enabling/disabling settings; "similar to a checkbox but a more intuitive visual form".
- Props: `checked`, `disabled`, `hasTouchEffect` (default true; click animation), `onChange`.
- Rules: if the label sits outside the component or is icon-only, add `aria-label` describing the purpose without words like "스위치", "켜짐", "꺼짐". `role="switch"`.
- Anatomy, variants, sizes: not stated. In a list, pair with ListRow right region (see List row).

## Component: Bottom sheet

Source: https://tossmini-docs.toss.im/tds-mobile/components/bottom-sheet/

- Anatomy: handler (drag handle), `header` (string becomes `h1` with `t4`), `headerDescription` (`t6`), children, `cta` (`BottomSheet.CTA` single or `BottomSheet.DoubleCTA`), `BottomSheet.Select` (option list with checkbox, per-option `disabled`), dimmer.
- Size: `maxHeight` (collapsed) and `expandedMaxHeight` in px, caller-defined; `expandBottomSheet` lets a 10px upward drag expand to full height; `ctaContentGap` default 34px; `hasTextField` lifts the sheet above the keyboard.
- Dismiss: `onClose`; dimmer click closes by default; `UNSAFE_ignoreDimmerClick` and `UNSAFE_ignoreBackEvent` exist but docs recommend closing on both outside tap and back. The page does not state swipe-down dismissal.
- Accessibility: `ariaLabelledBy` / `ariaDescribedBy`; header joins the scroll area at 160%+ text scale.
- Not documented: corner radius, max width, snap points, copy rules.

## Component: Dialog

Source: https://tossmini-docs.toss.im/tds-mobile/components/Dialog/dialog/ ; https://tossmini-docs.toss.im/tds-mobile/components/Dialog/alert-dialog/ ; https://tossmini-docs.toss.im/tds-mobile/components/Dialog/confirm-dialog/

- Two types: `AlertDialog` (one button; task-completion or status-change notice) and `ConfirmDialog` (two buttons; confirmation before an important action).
- Anatomy: title (`t4`, bold, grey800), optional description (`t6`, medium, grey600), buttons, dimmer. Description may be omitted for simple cases.
- Behavior: `closeOnDimmerClick` default true; false plays a wiggle animation instead of closing. `closeOnBackEvent` default true. `onClose` must be passed or the dialog will not close. Long titles wrap, long descriptions scroll automatically.
- ConfirmDialog buttons: cancel button defaults `dark` + `weak`, size `large`; cancel is passed before confirm in all examples (left/right placement not stated). Short labels sit side by side; long labels stack vertically, each full width (stated).
- AlertDialog button: default blue500, bold, size medium.
- Copy rules: none stated; examples use "확인" for the alert button.

## Component: Toast

Source: https://tossmini-docs.toss.im/tds-mobile/components/toast/

- Purpose: brief feedback that a task completed or an event occurred; auto-dismisses.
- Anatomy: `text` (string), optional `leftAddon` (`Toast.Icon` or `Toast.Lottie`, default frame 24x24) to convey success/warning/error, optional `button` (`Toast.Button`).
- Position: `top` or `bottom`. `button` and `higherThanCTA` (appear above a fixed bottom CTA) work only at the bottom.
- Duration: default 3000 ms; the prop table also says 5000 ms when a button is used, but the button example passes 3000 (inconsistent; do not cite 5000 as certain). Swipe/drag can close it. `aria-live` default `polite`, `assertive` for important alerts.
- Not documented: concurrency/queue, copy rules, width, tone variants.

## Component: Empty / error state

Source: https://tossmini-docs.toss.im/tds-mobile/components/result/ ; https://tossmini-docs.toss.im/tds-react-native/components/error-page/

- `Result` (page-level outcome): `figure` (icon, Lottie or image), `title`, `description`, `button` (e.g. retry, back to home), top to bottom. Examples: error "다시 시도해주세요" with a temporary-system-problem description and "다시 시도하기" button; a waiting screen; a reconnect screen. Title renders `h5`; figure images are decorative (`alt=""`).
- `ErrorPage` (React Native): message by `statusCode` (default 500; docs show 400, 404, 500 uses), image chosen automatically, a right button (e.g. go back) and a left button for the customer center; `title` / `subtitle` can be overridden, children for extra content. Default copy per status code is not printed.
- Empty state: Not documented (checked https://tossmini-docs.toss.im/tds-mobile/components/result/ , which states only success and error examples).
- Copy rules: none stated; examples show short title, 1-2 line description, short action label.

## Component: Badge / tag

Source: https://tossmini-docs.toss.im/tds-mobile/components/badge/

- Purpose: emphasize an item's status for quick recognition.
- `variant`: `fill` (high saturation) or `weak` (low saturation). `size`: `xsmall`, `small`, `medium`, `large`. `color`: `blue`, `teal`, `green`, `red`, `yellow`, `elephant`.
- Not documented: placement, count per item, label length, interaction rules (SEED states badges are static, see daangn-seed.md). No separate Tag component in TDS Mobile or React Native navigation (checked https://tossmini-docs.toss.im/tds-mobile/).

## Component: Callout

Source: Not documented (checked https://tossmini-docs.toss.im/tds-mobile/ and https://tossmini-docs.toss.im/tds-react-native/ navigation; no Callout, Banner or Notice component). Nearby, not equivalent: `BottomInfo` (https://tossmini-docs.toss.im/tds-mobile/components/bottom-info/): important information or precautions at the bottom of a screen, such as legal notices for financial products, usually wrapping a `Post.Ul` list, with an optional `bottomGradient` (default `linear-gradient(adaptive.greyBackground, rgba(255,255,255,0))`; `none` not recommended except in special cases because of iOS background mismatch). Also listed but not read: `Highlight`, `Bubble`, `Tooltip`.

## Component: Top navigation

Source: https://tossmini-docs.toss.im/tds-react-native/components/navbar/ ; TDS Mobile: Not documented (checked https://tossmini-docs.toss.im/tds-mobile/components/top/ , which is a page title block, not an app bar)

- TDS React Native `Navbar`: top-of-screen bar with three slots: `left` (mainly back button), `title` (center), `right` (mainly action buttons). Examples: `Navbar.BackButton`, `Navbar.CloseButton` (left of modals), `Navbar.TextButton`, `Navbar.Title`, integration with React Navigation `headerLeft` / `headerTitle` / `headerRight`; multiple right buttons shown as a row with `gap: 16`.
- Not documented: height, variants, title alignment rule, max right-action count, accessibility guidance, slot-empty behavior.

## Citation notes

- Rule-bearing facts in TDS are mostly: fill vs weak button roles; Tab max 4 items without `fluid`; ListRow padding values; BottomSheet close-on-dimmer and back as recommended; Dialog stacking of long button labels; Toast bottom-only button and CTA clearance.
- TDS is thin on usage prose (few "when not to use" rules). For do/don't rules and per-screen counts, cite [daangn-seed.md](daangn-seed.md).
