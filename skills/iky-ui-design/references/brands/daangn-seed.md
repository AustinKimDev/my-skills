---
id: daangn-seed
name: Daangn (Karrot) SEED Design
status: text-verified
checked_at: 2026-10-23
---

# Daangn SEED Design component notes

- Purpose: citable component facts for shared mobile UI decisions. Complements [daangn.md](daangn.md) (consumer web home, loading-pattern table).
- Primary source: [seed-design.io](https://seed-design.io/) component pages via its machine-readable text index https://seed-design.io/components/llms.txt (each component at `https://seed-design.io/llms/components/<name>.txt`). Source repo: github.com/daangn/seed-design (not opened; not needed).
- Environment: documentation text read on 2026-10-23 through a page-to-markdown fetch. No screenshots, no native device inspection. Status applies to recorded page text only.
- Limits for every section: SEED pages describe anatomy, properties and rules in prose; exact dimensions live in per-component JSON specs at `/rootage/components/<name>.json` that use design-token references (for example `$dimension.x10`), not pixels. Where this note prints no px, the page printed none. Only Action Button's JSON was read, and only token names are quoted (no px conversion is made here). Tokens: `{global-gutter}` = 16px is stated on the List page. Anything marked "inferred" is this note's reading.
- Do not copy Daangn brand color, icons or Asset Town assets.

## Component: Button

Source: https://seed-design.io/llms/components/action-button.txt ; spec tokens https://seed-design.io/rootage/components/action-button.json

- Name in SEED: Action Button. Anatomy: container, label, optional prefix icon, optional suffix icon.
- Size: XSmall (pill, for compact spaces), Small and Medium (general, mainly mid-screen), Large (mainly the CTA). Spec tokens (min height / radius): xsmall `$dimension.x8` / `$radius.full`; small `$dimension.x9` / `$radius.r2`; medium `$dimension.x10` / `$radius.r2`; large `$dimension.x13` / `$radius.r3`. Label type tokens: xsmall t3, small t4, medium t4, large t6. Horizontal padding tokens: xsmall x3_5, small x3_5, medium x4, large x5.
- Layout: text only, icon + text, text + icon, icon only (weaker accessibility, use only when necessary). Width: fill or hug, each size has a default minimum width.
- Variants (7): Neutral Solid, Brand Solid, Neutral Weak, Brand Outline, Neutral Outline, Critical Solid, Ghost. States: enabled, pressed, loading, disabled.
- Hierarchy rule (stated): high emphasis (Brand/Neutral/Critical Solid) = 1 per screen, the most important CTA; medium (Neutral Weak) = multiple, pairs with a high-emphasis button; low (Brand/Neutral Outline, Ghost) = multiple, low-priority actions. Do not combine Outline with Solid. Critical Solid is for irreversible actions such as delete or reset, mainly in Alert Dialog.
- Brand color is reserved for brand-identifying actions (chat, bookmark a regular customer, write a post); avoid overuse.
- Placement (stated): when Neutral Weak means dismiss/reset/close next to a Solid, use a 3:7 width ratio. Do not place 4 or more buttons side by side; 3 or more side by side is not recommended (hard to choose, lower click-through, truncation at large font scale). With more than two actions, use icon-only buttons to reach the extras. A Responsive Pair utility switches layout for long labels.
- Icons: prefix supports meaning, suffix (such as a chevron) supports behavior; not both sides; use sparingly.
- Copy rules (stated): write from the user's point of view in short verb phrases, consistent for the same action, no vague words. "시작하기" recommended; "다음" discouraged because it does not state the action.
- Action Button vs Chip (stated): button executes an action and can stand alone; chip shows information or a selection and is recommended in groups of two or more.

## Component: Icon button

Source: https://seed-design.io/llms/components/action-button.txt (Icon Only layout) ; https://seed-design.io/llms/components/top-navigation.txt

- SEED has no separate Icon Button page in the component index (checked https://seed-design.io/components/llms.txt). It is the Icon Only layout of Action Button (min width equals min height token per size; padding tokens per size, e.g. small x2) and appears as Icon Buttons in Top Navigation.
- Rule: meaning conveyed only by the icon means weaker accessibility, use only when necessary. Top Navigation allows up to 3 icon buttons in the right slot (2 recommended).
- Limits: no px values read; no separate accessible-label rule on the pages read.

## Component: List row

Source: https://seed-design.io/llms/components/list.txt

- Name in SEED: List Item (inside List). Anatomy: Prefix, Suffix, Title, Detail. Detail defaults to Sub Text and Tag Group, customizable.
- Properties: Align `Center` (default; short Title and Detail) or `Top` (Title of two lines or more, or lots of Detail); `Highlighted` for new notifications or updates; State enabled / pressed / disabled; Prefix and Suffix slots with presets (the preset list is not itemised) or Custom Child Swap.
- Spacing (stated): horizontal gap never narrower than `{global-gutter}` = 16px; vertical, horizontal, all-round padding adjustable with SEED tokens; keep alignment identical across items in one List. Concentric radius: inner radius = container radius minus padding (example 16 - 6 = 10px).
- Click rules (stated): a List Item includes click behavior by default and it can be removed. One, two, or three-plus click areas are shown. Avoid 4 or more interactive elements in one item; do not combine complex interactions in the limited space. Custom elements beyond the provided Button need their own spec.
- Switchmark / Checkmark / Radiomark in Prefix/Suffix: the whole item is one click area (tapping anywhere works); do not put a second clickable element such as an Action Button in the same slot; for terms that need a separate screen, put a hyperlink inside the label text and stop tap propagation to the row.
- Select composition: Checkbox = multi-select, Radiomark = single-select; single-select needs 2 or more items; do not mix single and multi in one group.
- Section grouping: List Header (see Section header).
- Limits: item height, default padding and icon size are not printed on the page.

## Component: Section header

Source: https://seed-design.io/llms/components/list.txt

- Name in SEED: List Header. Stated use: "when grouping items by unit", used with List. Spec file `/rootage/components/list-header.json` was not read.
- Not documented on the page: anatomy, sizes, trailing action rules. No separate "Section header" component exists in the index (checked https://seed-design.io/components/llms.txt).

## Component: Tabs / segmented control

Source: https://seed-design.io/llms/components/tabs.txt ; https://seed-design.io/llms/components/segmented-control.txt

- Tabs: switch between content sections within one screen. Types: Line (Fill = items share full width; Hug = item fits label) and Chip (Solid or Outline). Sizes: Line Medium/Small, Chip Large/Medium (no px). Tab Item states: enabled, selected, disabled; optional Notification Badge.
- Tabs rules (stated): Large suits whole-screen content switching, Medium suits narrow areas or mid-scroll sub-content. Chip Solid for whole-screen switching, Outline for partial. Fill layout for few tabs, up to 5; Hug for 6 or more or long labels. Notification Badge disappears once content is viewed; avoid badges on several tabs at once. Two-depth: Line tabs for primary and Chip tabs for secondary; do not stack Chip-style Tabs with Filter Chips (Line Tabs + Filter Chips is the shown pattern).
- Segmented Control: choose one option to filter or switch related content immediately. Anatomy: container, segments, labels, optional Notification Badge. 2 to 4 segments (stated max 4; beyond that use Radio Group or Checkbox Group). States: enabled, pressed, disabled, each with selected. Sizes not printed.
- Segmented rules (stated): short labels; avoid more than one segmented control on a screen; place directly above the content it controls; not for navigation between sections or screens.
- Stated difference: segmented control manipulates content in the current view and affects part of the screen; Tabs navigate to separate sections, are fixed at the top and replace the whole area below.

## Component: Chip

Source: https://seed-design.io/llms/components/chip.txt

- Purpose: displays values the user selects or enters. Anatomy: container + label (required), optional prefix item (icon, avatar, image) and suffix item (icon; remove button for input chips).
- Variants: Solid, Outline Strong, Outline Weak, each with a selected state. Sizes: Large, Medium, Small (no px). States: enabled, pressed, disabled.
- Usage (stated): single chip for a selected/entered value; Chip Group template for suggestions and single/multi selection (layouts: scrollable one line, or overflow showing all); Filter Bar template with a Clear button when a filter is active; Outline Weak recommended for selection (multiple values may be selected, lower prominence); input chips show entered content with a remove button in the suffix. Use Chip variant of Tabs when chips act as tabs.
- Group comparison (stated, from Radio page): Chip Group suits short words, 2 to 10 options.
- Limits: dimensions not printed; custom prefix slots discouraged because left spacing varies by element.

## Component: Text field

Source: https://seed-design.io/llms/components/text-input.txt ; https://seed-design.io/llms/components/field.txt

- Text Input: container, input, optional clear button, prefix/suffix slots. Variants: Outline, Underline (recommended when the screen has only one input). States: enabled, focused, error, error focused, disabled, read only; "has value" property. Custom input for masking.
- Textarea: auto-size on = grows with text, minimum 3 lines (95px); off = minimum 2 lines (70px) with a required max height and inner scroll.
- Layout rules (stated): two-column inputs only when label and value are short, keep a gap (the example cites 16px); do not split fixed-format values (phone, resident number) into several inputs, format automatically in one.
- Field wrapper: header (label, requirement mark, suffix slot with ghost button or icon), input, footer (helper text, error message at left; character count at right, only when a length limit exists).
- Copy rules (stated): label as a noun phrase, no period, one line preferred (two at most); mark required with "*" or optional with text "선택": if two-thirds or more fields are required show only "선택", otherwise only "*"; never mix on one screen. Error message is an action-directing short sentence, e.g. "휴대폰 번호 10-11자리로 입력해 주세요". When error and helper both exist, show only the error.
- Validation (stated): default validate on submit (submit button may be disabled or always active); inline validation on blur/change for many fields or high-risk fields (security, finance); can mix. Warn about discarding input on leaving a create/edit screen with an Alert Dialog unless nothing changed or autosave exists. Create and update forms should match.
- Search input: Not documented as a separate component (checked https://seed-design.io/components/llms.txt; no search field entry; Text Input has clear button and prefix slots).

## Component: Stepper

Source: https://seed-design.io/llms/components/quantity-picker.txt

- Name in SEED: Quantity Picker. Anatomy: decrement button, increment button, value display (the value is not touchable).
- Sizes: Small, Medium, Large; match neighbors (Action Button, Text Input). No px.
- Value state: Min (decrement unavailable), InRange, Max (increment unavailable). State: enabled, disabled, error (value out of range). Button states: enabled, hover/pressed, loading (waiting for server on a quantity change), focused, disabled. `Removable`: when on, decrement becomes a Remove button at the minimum.
- Usage (stated): carts, product detail, checkout. Set Min/Max so boundary buttons disable automatically. Enable Removable only where lowering to the minimum means deleting the item.

## Component: Checkbox / radio

Source: https://seed-design.io/llms/components/checkbox.txt ; https://seed-design.io/llms/components/radio.txt

- Checkbox: Checkmark + label. Size Medium/Large, weight Regular/Bold, tone Neutral, shape Square or Ghost. States: selected, unselected, indeterminate; enabled, pressed, disabled.
- Checkbox rules (stated): touch target includes the label, and the entire row when composed in a list; parent checkbox selects all children and shows indeterminate when partial; Ghost shape when not required and 3 or fewer items, Square when the user must notice a required selection.
- Radio: Radiomark + label; Medium/Large; weight Regular/Bold. Rules (stated): single choice only, otherwise Checkbox; provide a recommended/frequent default selection; stack vertically, avoid horizontal; Radio Group for 2 to 6 options, Input Button (value shown, full list in a Bottom Sheet) for 6 or more or growing lists.
- Comparison (stated): Radio 2-6 options, long sentences allowed; Checkbox 2-10 recommended, long sentences allowed; Chip Group short words, 2-10.
- Checkbox vs Switch (stated): checkbox values apply after a save-style action and can be listed and parented; switch applies immediately and is for individual items.

## Component: Switch

Source: https://seed-design.io/llms/components/switch.txt

- Anatomy: Switch = Switch Mark (thumb + track) + label. Sizes 16, 24, 32 (by height, unit not stated); the 16 size has a 24 height so the touch target meets the minimum. Tone Neutral only. States: selected/unselected with enabled/disabled, light and dark.
- Touch target: mark plus label together; the whole row in a List.
- Rules (stated): immediate-effect settings only (use Checkbox if the value applies only after a final button); independent settings only (no parent/child); when disabled, the label also uses the disabled color.

## Component: Bottom sheet

Source: https://seed-design.io/llms/components/bottom-sheet.txt ; https://seed-design.io/llms/components/menu-sheet.txt

- Bottom Sheet: modal sliding up from the bottom, keeps context visible. Anatomy: backdrop, container, header (title, optional description; title required if a header is used), optional close button (target 40x40), optional handle, optional footer.
- Size (stated): max width 480px; recommended max height 90% of screen, beyond which a separate page is recommended over scrolling. Snap points: at least 2 (max and middle), up to 3 (max, middle, min); defaults 90%, 50%, 10%; handle must be shown when snap points are used. Scroll only in the content area, with a Scroll Fog at the bottom.
- Dismiss (stated): by default closes on downward drag or outside tap. For high-stakes tasks (complex forms, payments) or when the screen changes inside the sheet, show a top close button and remove the handle to prevent accidental dismissal.
- Copy: keep title and description short. Keyboard: the keyboard appears at the bottom of the sheet; account for changed available height.
- Menu Sheet (action list variant): backdrop, header, menu groups, close button. Groups only with 3 or more items, up to 3 groups; Text Only or Text with Icon, not mixed; Critical tone (red) for irreversible actions like delete, report, leave; title short enough for one line; avoid description without title.
- Alert Dialog vs Menu Sheet (stated): dialog for required either/or choice or irreversible notice with 2 or fewer actions, centered; menu sheet for multiple options with 2 or more actions, at the bottom, closable by outside tap.

## Component: Dialog

Source: https://seed-design.io/llms/components/dialog.txt ; https://seed-design.io/llms/components/alert-dialog.txt

- Dialog (task/info/form): backdrop, header (title, description, close button if needed), content (body scrolls vertically), footer actions. Desktop widths Medium 480px and Large 800px; below 768px 90% of screen width; max height 80% of screen, always centered. On desktop it can render as a Bottom Sheet below the md breakpoint. Header and footer fixed; divider under the header while scrolling.
- Close rules (stated): header close button for simple info viewing or flow interruption; footer cancel button for forms and settings with a main confirm; never both; avoid header "X" in input-form dialogs; backdrop tap / ESC as the fastest exit for light layers.
- Alert Dialog (must-confirm): backdrop + content, single combined component, no close button. Actions horizontal by default, vertical when labels are long; title may be hidden. Tones: Neutral (default), Brand (core product value), Critical (loss: delete data, lose written content, reset settings) applied to the action that needs the warning, never to "취소". Do not customize arbitrarily or change content alignment. Description is required (stated in the Menu Sheet comparison).
- Copy: Dialog page gives none; Alert Dialog page says UX-writing guidance is documented separately (Notion, not read). Not documented here.

## Component: Toast

Source: https://seed-design.io/llms/components/snackbar.txt

- Name in SEED: Snackbar (no Toast entry; checked https://seed-design.io/components/llms.txt). Anatomy: container with padding, text, optional prefix icon, optional single action.
- Variants: Default, Positive (success), Critical (error/failure).
- Placement (stated): bottom center, above the OS safe area; sits above a Floating Action Button if present; max width, centered on wider screens; wrapped text centers the icon and action.
- Behavior (stated): 4 seconds by default (lengthen for longer messages); holding a touch pauses the timer; one at a time, others queue.
- Use for: completion of background tasks (save, upload, sync), confirmation of the user's own action, a short-lived secondary action like undo, low-severity status only. Not for decisions (Bottom Sheet, Alert Dialog), persistent warnings (Page Banner, Callout), long guidance (Help Bubble, Callout).
- Copy (stated): short, lead with the result as noun + verb; one sentence has no period, two or more end each with a period; affirmative phrasing, no double negatives. Action: at most one, 1 to 2 words, specific (undo, view list), not "cancel"/"confirm"; include undo when content is added or deleted.

## Component: Empty / error state

Source: https://seed-design.io/llms/components/result-section.txt

- Name in SEED: Result Section. Anatomy: Asset, Title (core), Description and Button (optional). Size Large (full-screen state) / Medium (card or section state). Centered in the parent container.
- Asset types: Lottie (complete / fail), Icon (mainly Empty), 2D/3D Asset from Asset Town (service-specific; no 3D for generic messages), custom slot.
- Intent (stated): success = clear result plus a button if a next step exists; error = say the action failed and clearly guide what to do next; empty / first use = say there is no content and tell the user what to do to prompt action and prevent drop-off.
- Buttons: Bottom CTA (heaviest, core action, full bottom) vs Contained Button (small, inside the section, to resolve the state or give extra info). Failure exit buttons: "<" back for fixable input errors, "X" for temporary layers, "돌아가기" to a safe destination like home when going back is impossible, "다시시도" to rerun immediately; choose by whether the screen is full-screen or temporary.
- After loading, show a success or failure Result Section.
- Copy: no sentence rules printed.

## Component: Badge / tag

Source: https://seed-design.io/llms/components/badge.txt ; https://seed-design.io/llms/components/tag-group.txt ; https://seed-design.io/llms/components/notification-badge.txt (listed, not read)

- Badge: small text label showing an attribute or state. Size Large/Medium. Tone Neutral, Brand, Informative, Positive, Warning, Critical. Variant Solid (strong, over images or complex backgrounds), Outline (medium emphasis in body or detail screens), Weak (repeated layouts, category tags, supplementary info; not on colored backgrounds). Optional prefix icon, or a fixed (i) action opening a Help Bubble or Bottom Sheet (prefix and action cannot be combined).
- Rules (stated): brand tone sparingly; one or two badges per object; labels about 2 to 3 words, max-width truncates at 10 or more characters; badges are static, not clickable (use Chip, Toggle Button or Action Button for actions).
- Tone meaning (stated): Positive = completed/applied/approved/published; Warning = expiring soon, missing submission or required info; Critical = rejected, sanctioned, non-editable, validation failed; Informative = beta, permission limits; Neutral = no status.
- Tag Group: icon + text tags in one line separated by separators, for card metadata and summaries; sizes t2 (12pt), t3 (13pt), t4 (14pt); tone Neutral Subtle/Neutral/Brand and weight per item, same size within a group; 6 to 10 characters per tag; priorities decide which truncates first; default single line, wrapping allowed when truncation hurts or at large font scale.

## Component: Callout

Source: https://seed-design.io/llms/components/callout.txt ; https://seed-design.io/llms/components/page-banner.txt

- Callout: anatomy container + optional prefix icon (Fill type recommended, not Line), title, description, link text, suffix icon. Interaction: Display, Actionable (whole container tappable, pressed state), Dismissible. Tone: Neutral, Informative, Warning, Critical, Positive, Magic (AI experiences). Sizes not given.
- Rules (stated): title and link text are inline, with two spaces between title and description; link text only for supplementary info (use Actionable for calls to action; not with Actionable); Dismissible only for one-time information, never for warnings or errors, never show the same message again after dismissal.
- Copy (stated): title is a short word naming the nature (알림, 안내, 새소식, 공지), not a sentence; description holds the core only and does not repeat the title.
- Page Banner (page-level notice): same tones, each with Weak and Solid (no Magic with Solid); always at the top of the page (below a top image), only one per screen, may be sticky; chevron or dismiss on the right sets Actionable or Dismissible; same copy rules.
- Callout vs Page Banner (stated): Callout sits in the content flow at content width for local messages (tips, explanations, risk warnings); Page Banner is full-width at the top for global page status (sanctions, feature activation).

## Component: Top navigation

Source: https://seed-design.io/llms/components/top-navigation.txt ; https://seed-design.io/llms/components/bottom-navigation.txt

- Types: Root (top-level root tabs, access to core actions; title as Text or tappable Button) and Standard (2-depth and deeper; back or close, title slot, secondary actions).
- Left slot (Standard): Back (chevron left, returns to the previous screen, keeps the current step) or Close (X, ends the layer or flow, input may be discarded); use Close for modals and standalone flows.
- Right slot: up to 3 Icon Buttons (2 recommended, a third squeezes the title), or exactly 1 Text Button; with more than 3 actions, use a "more" button with a Menu Sheet. Do not let the title overlap actions. Icon buttons may carry a Notification Badge (Small dot, Large only for numeric information).
- Title: one line, truncated with an ellipsis (a gradient in global apps).
- Back behavior: History Back (actual path, for search/feed/recommendation flows) or Hierarchy Back (parent in the information architecture, for settings/profile).
- Scroll: fixed at top by default, no separator line between fixed and scrolling areas; a transparent top navigation fills with background color on scroll.
- Not documented: heights, title alignment (page states they are in the JSON spec, not read).
- Bottom Navigation (related, in the same index): at most five items, max inner width 480px (none on iOS), labels about 5 Korean or 10 English characters, Fill-style icons only with color showing active state, badges Small (presence) or Large (count 1-99, "99+" at 100 or more, hidden at 0), no badges on three or more tabs, 1px top divider on iOS. Use top-of-screen Tabs when there are more than five categories.

## Citation notes

- Strongest rule-bearing SEED pages: Action Button (hierarchy and counts), List (click-area rules), Snackbar (duration, queue, copy), Alert Dialog (tone, Critical placement), Callout / Page Banner (placement, copy), Tabs vs Segmented Control (scope), Field (labels, errors, validation).
- No Toast, Icon Button, Search Field, or Section Header pages exist in SEED; the nearest equivalents are named in each section above.
