---
id: apple-hig-components
name: Apple Human Interface Guidelines - components
status: text-verified
checked_at: 2026-10-23
---

# Apple Human Interface Guidelines: component notes

Scope: reusable citation notes for mobile (iOS/iPadOS) component decisions. Captured 2026-10-23.

Environment: the text of each HIG page was read from Apple's published documentation data (`https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json`, the data behind the page at `https://developer.apple.com/design/human-interface-guidelines/<page>`). Direct page fetch returns only the title because the site renders client-side. Only text was read. Images, diagrams and tables embedded as images were not seen, so visual style names, sizes shown only in figures and pixel values are marked "Not documented in captured text". macOS, tvOS, watchOS and visionOS rules are omitted unless they help an iOS decision; Liquid Glass material guidance (iOS 26 era pages, changelog Dec 16, 2025) is mentioned only where the page text says it.

How to cite: use the heading `## Component: <name>` as the anchor. Text marked "(inferred)" is the note-taker's reading, not a statement of the source. No numbers below are invented; every number comes from the cited page.

Limits: HIG describes platform conventions, not measured performance. HIG has no pages for chip, toast/snackbar, empty state, in-app banner or section header; those sections say so. Pages change; this is the state on the capture date.

---

## Component: Button

Source: https://developer.apple.com/design/human-interface-guidelines/buttons

- Anatomy: a button combines style (size, color, shape), content (symbol, text label, or both) and role.
- Roles: normal; primary (the default button, most likely choice); cancel; destructive. Primary uses the app accent color, destructive uses system red.
- Variants: "prominent visual style" for the most likely action in a view (accent-colored background). Other iOS style names (bordered, plain, etc.) are Not documented in captured text (checked https://developer.apple.com/design/human-interface-guidelines/buttons; style images not readable).
- Size: hit region at least 44x44 pt (60x60 pt in visionOS). No heights for iOS buttons are given.
- States: always include a press state for a custom button, otherwise it feels unresponsive. iOS can show an activity indicator inside a button for slow actions and may change the label (example in source: "Checkout" becomes "Checking out...").
- Usage rules:
  - Keep prominent buttons to one or two per view; too many raise cognitive load.
  - Separate preferred from other choices by style, not by size; buttons offering a set of options should be the same size.
  - Give enough space around a button so it is distinguishable and easy to hit.
  - Do not assign the primary role to a destructive action, even if it is the most likely choice, because people may tap a prominent button without reading it.
  - Avoid label/background colors that are similar to colorful content behind them.
- Copy: use a symbol people recognize (e.g. share) or a short text label of a few words; start the label with a verb ("Add to Cart"). The page links a capitalization guideline whose text was not legible in the capture (inferred: title-style).
- Applicable situation: choosing how many emphasized buttons a screen gets; destructive-button emphasis; in-button loading.
- Limits: iOS style variants and per-size heights not captured.

## Component: Icon button

Source: https://developer.apple.com/design/human-interface-guidelines/buttons ; https://developer.apple.com/design/human-interface-guidelines/toolbars ; https://developer.apple.com/design/human-interface-guidelines/toggles

- HIG has no separate "icon button" page. The Button page lists a symbol/icon as a content option; Toolbars and Toggles describe the icon-only cases.
- Rules that apply:
  - Same 44x44 pt minimum hit region as any button (Buttons).
  - Associate familiar actions with familiar icons (the source's example is the share symbol); use SF Symbols where possible.
  - Use text instead of an icon when a short label communicates more clearly.
  - In toolbars: prefer simple recognizable symbols over text except for actions like Edit that symbols do not represent well; prefer system symbols without borders because the bar already provides a container (Toolbars).
  - Outside a list, a toggle on iOS is a button whose appearance changes with state (e.g. blue highlight when active). Do not add a text label explaining the purpose; the icon plus the alternate background carries it (Toggles).
  - State must not rely on color alone (Toggles).
- Sizes beyond 44x44 pt: Not documented (checked https://developer.apple.com/design/human-interface-guidelines/buttons).
- Limits: icon sizes belong to the Icons / SF Symbols pages, which were not read.

## Component: List row

Source: https://developer.apple.com/design/human-interface-guidelines/lists-and-tables

- Anatomy: rows can carry a small image at the leading end plus a label; system row styles exist (e.g. a content configuration API for rows, headers and footers). Trailing accessories: disclosure indicator, info (detail disclosure) button, checkmark for selection, index on the trailing side.
- Variants (list styles): plain; grouped (iOS/iPadOS, uses headers, footers and extra space to separate groups). Others are macOS/watchOS.
- Row height: Not documented (checked https://developer.apple.com/design/human-interface-guidelines/lists-and-tables).
- States and feedback:
  - A navigation table persistently highlights the selected row to show the path; an options table highlights briefly, then shows a checkmark.
  - iOS/iPadOS require an edit mode before table items can be selected; people expect to reorder lists.
- Usage rules:
  - Prefer text in lists and tables; use a collection instead when items vary widely in size or there are many images.
  - Keep item text succinct; consider middle ellipsis when truncation would hide the distinguishing end.
  - Use an info button only to reveal more information about the row. Use the disclosure indicator to drill into a sub-hierarchy.
  - Avoid an alphabetical index in a table whose rows also have trailing controls such as disclosure indicators (both sit at the trailing side and are hard to separate).
- Switch inside a row: Toggles page says the iOS switch belongs only in a list row; the row supplies the label context.

## Component: Section header

Source: https://developer.apple.com/design/human-interface-guidelines/lists-and-tables

- Not documented as a standalone component (checked https://developer.apple.com/design/human-interface-guidelines/lists-and-tables and https://developer.apple.com/design/human-interface-guidelines/labels).
- What the page does say: the grouped list style uses headers, footers and extra space to separate groups; a single-column table without a column heading should use a label or a header so people understand the context; column headings use nouns or short noun phrases in title-style capitalization with no ending punctuation. Header height, type size and sticky behavior: Not documented.
- Labels page: system label colors express importance (label, secondary, tertiary, quaternary); secondary label suits "a subheading or supplemental text" (https://developer.apple.com/design/human-interface-guidelines/labels).

## Component: Tabs / segmented control

Source: https://developer.apple.com/design/human-interface-guidelines/segmented-controls ; https://developer.apple.com/design/human-interface-guidelines/tab-bars

- HIG has no "tabs" component above the tab bar. For switching content inside one screen the equivalent is the segmented control; for app-level sections it is the tab bar (see Component: Tab bar / navigation bar (bottom)).
- Segmented control anatomy: equal-width segments (usually), each text or image; optional labels beneath.
- Behavior modes: single choice, (macOS) multiple choice, or momentary action buttons without a selection state.
- Usage rules:
  - Use for closely related choices that affect an object, state or view; good when grouping or visible selection state matters.
  - Do not mix selection segments and action segments in one control.
  - Limit segments: about five to seven in a wide interface and about five on iPhone.
  - Keep segment sizes consistent; do not mix text and images in one control; content of similar size per segment.
  - iOS: use to switch between closely related subviews (example in source: Calendar's New Event sheet). For completely separate sections of an app use a tab bar instead.
- Copy: nouns or noun phrases for segment labels (the page links a capitalization guideline not legible in the capture; inferred: title-style); a text segmented control needs no introductory text.
- Segment height or width in pt: Not documented (checked https://developer.apple.com/design/human-interface-guidelines/segmented-controls).

## Component: Chip (filter/choice)

Source: https://developer.apple.com/design/human-interface-guidelines/search-fields ; https://developer.apple.com/design/human-interface-guidelines/token-fields

- Not documented as a component (checked https://developer.apple.com/design/human-interface-guidelines/ for components; no chip page).
- Nearest documented patterns:
  - Scope bar: a control for filtering and adjusting the scope of a search among clearly defined categories; default to a broader scope and let people narrow it (example: Mail on iPhone).
  - Token: a visual representation of a search term that can be selected and edited as one item and acts as a filter; pair tokens with search suggestions so people learn which tokens exist.
  - Segmented control or toggle-style button for a filter that is on/off (see those sections).
- (Inferred) a filter chip row maps most closely to a scope bar or toggle buttons; HIG gives no chip sizes, counts or states.

## Component: Text field / textarea / search

Source: https://developer.apple.com/design/human-interface-guidelines/text-fields ; https://developer.apple.com/design/human-interface-guidelines/text-views ; https://developer.apple.com/design/human-interface-guidelines/search-fields

- Text field (short input):
  - Use for a small amount of information such as a name or email; use a text view for larger amounts.
  - Show placeholder text (e.g. "Email") as a hint, and add a separate label too because placeholder text disappears when typing starts.
  - Use secure fields for passwords or private data.
  - Match field size to the expected amount of text; stack multiple fields vertically with consistent widths and enough spacing for labels.
  - Validate when sensible: email on moving to another field; user name or password before moving on.
  - Use a number formatter for numeric data; do not assume locale formatting.
  - iOS: show the keyboard type that fits the content; show a Clear button at the trailing end; use leading end for the field's purpose image and trailing end for extra features.
  - Height and padding in pt: Not documented (checked https://developer.apple.com/design/human-interface-guidelines/text-fields).
- Text view (textarea equivalent): any height, scrolls when content overflows; use for long, editable or specially formatted text; keep text legible with Dynamic Type; make useful text (error message, serial number) selectable; show the appropriate keyboard.
- Search field: editable field with a Search icon, Clear button and placeholder text.
  - Use placeholder text to say what can be searched; start searching as the person types where possible; consider recent searches or suggestions; put the most relevant results first and consider categories; optionally add a scope bar.
  - iOS entry points: a tab in the tab bar (standard tab with a landing page, or button appearance that opens the keyboard at once), a top or bottom toolbar, or an inline field next to the content it searches.
  - Place search at the bottom if there is room; at the top when bottom content must stay uncovered or there is no bottom toolbar; inline when the position strengthens the link to the content. An inline top field sits above its list and can pin to the top toolbar on scroll.
- Error text styling and character counters: Not documented in these pages.

## Component: Stepper (quantity)

Source: https://developer.apple.com/design/human-interface-guidelines/steppers

- Anatomy: the stepper itself does not display a value; it sits next to a field that shows the current value.
- Rules: make it obvious which value the stepper changes. Pair a stepper with a text field when large changes are likely (example: number of copies on a print screen); a stepper alone suits small changes.
- Sizes, limits, states, min/max behavior: Not documented (checked https://developer.apple.com/design/human-interface-guidelines/steppers). No additional iOS considerations.

## Component: Checkbox / radio

Source: https://developer.apple.com/design/human-interface-guidelines/toggles

- Platform note: the checkbox and radio guidance on this page is under macOS; the iOS/iPadOS section covers only the switch and toggle buttons. (Inferred) treat these rules as general selection-control logic, not as iOS-specific.
- Checkbox: small square button; off = empty, on = checkmark, mixed = dash; title typically on the trailing side. Use a checkbox instead of a switch for a hierarchy of settings (align and indent to show dependencies). A parent checkbox shows mixed when children differ. Prefer a checkbox for a single on/off setting.
- Radio button: small circular button with a label; selected = filled circle, deselected = empty. Typically groups of two to five; use for mutually exclusive choices; avoid more than about five (use a pop-up button instead); use consistent spacing when horizontal; use checkboxes if multiple choices are allowed. A mixed state is rarely useful.
- Sizes in pt: Not documented (checked https://developer.apple.com/design/human-interface-guidelines/toggles).

## Component: Switch / toggle

Source: https://developer.apple.com/design/human-interface-guidelines/toggles

- Purpose: choose between two opposing values that affect the state of content or a view. Not for choosing from a list of items.
- iOS/iPadOS rules:
  - Use the switch style only in a list row; no separate label needed because the row gives context.
  - Change the default (green) color only if necessary; any replacement must contrast enough with the uncolored appearance.
  - Outside a list use a button that behaves like a toggle, with a state-dependent background and no explanatory label.
- Visible state: make on/off differences obvious (fill, shape, checkmark or dot); do not rely on color alone.
- Switch dimensions in pt: Not documented (checked https://developer.apple.com/design/human-interface-guidelines/toggles). The macOS section mentions a mini switch sized to match button height in grouped forms.

## Component: Bottom sheet

Source: https://developer.apple.com/design/human-interface-guidelines/sheets

- Apple calls it a sheet. Use for requesting specific information or a simple task completed before returning to the parent view.
- Anatomy and buttons: Cancel/Close (dismiss without saving), Done (dismiss after completing or saving), Back (previous step, not for dismissing). Do not show all three together; always pair Done with Cancel or Back.
- iOS/iPadOS:
  - Can be modal or nonmodal (nonmodal lets people affect the parent view while it stays up).
  - Single-view sheet: Cancel on the leading edge of the top toolbar, Done on the trailing edge.
  - Resizable via detents: large (fully expanded) and medium (about half). Large is supported automatically; medium is optional; only medium prevents expansion. Custom detents allowed.
  - Medium detent suits progressive disclosure (share sheet example); compose sheets (Messages, Mail) show only at full height.
  - Include a grabber on a resizable sheet; tapping it cycles detents and it works with VoiceOver.
  - Support swipe down to dismiss; if there are unsaved changes, confirm with an action sheet.
  - On iPad prefer page or form sheet presentation.
- Rules: show only one sheet at a time from the main interface (close the first before showing another); for complex or prolonged flows consider a full-screen modal instead.
- Corner radius, scrim opacity, max width: Not documented (checked https://developer.apple.com/design/human-interface-guidelines/sheets).

## Component: Dialog / alert

Source: https://developer.apple.com/design/human-interface-guidelines/alerts ; https://developer.apple.com/design/human-interface-guidelines/action-sheets

- Alert anatomy: title, optional informative text, up to three buttons; iOS/iPadOS alerts can include a text field.
- When to use: sparingly, for important information that interrupts the task. Not merely to inform; not for common undoable actions even if destructive; not at app launch (use placeholder content and a non-intrusive label); use for uncommon destructive actions that cannot be undone.
- iOS: use an action sheet, not an alert, to offer choices related to an intentional action (example: cancelling a mail draft gives delete / save / keep editing). Avoid alerts that scroll.
- Copy rules:
  - Direct, neutral, approachable tone; do not be oblique, accusatory, or mask severity.
  - Title says what happened and why, succinctly; avoid "Error" or "Error 329347 occurred"; avoid titles over two lines. A complete sentence title uses sentence-style capitalization with end punctuation; a fragment uses title-style without end punctuation.
  - Add informative text only if it adds value; complete sentences.
  - Do not explain the buttons.
  - Button titles: one or two words, verbs relating to the text ("View All", "Reply", "Ignore"); no ending punctuation (capitalization reference not legible in the capture; inferred: title-style); use "OK" only for purely informational alerts; avoid "Yes"/"No"; always "Cancel" for cancelling; prefer specific titles such as "Erase", "Convert", "Clear", "Delete".
- Button placement: default (most likely) button on the trailing side of a row or at the top of a stack; Cancel on the leading side or at the bottom.
- Destructive: use the destructive style for a destructive action people did not deliberately choose (not for one they deliberately triggered, such as Empty Trash); when a destructive action exists include a Cancel button; do not make Cancel the default; to encourage reading, have no default button. A lone default button should be "Done", not "Cancel".
- Caution symbol: use sparingly, only where extra attention is needed (e.g. possible unexpected data loss).
- Action sheet rules: title short enough for one line; message only if necessary; Cancel at the bottom; destructive choices use the destructive style and sit at the top; avoid scrolling; use sparingly.
- Dialog width, corner radius, button heights: Not documented (checked https://developer.apple.com/design/human-interface-guidelines/alerts).

## Component: Toast / snackbar

Source: https://developer.apple.com/design/human-interface-guidelines/feedback

- Not documented as a component (checked https://developer.apple.com/design/human-interface-guidelines/feedback and /alerts; no toast or snackbar page).
- Related statements from Feedback: match the way feedback is delivered to the significance of the information; passive status near the thing it describes for low-importance information; interrupt (alert) only for critical, ideally actionable information; confirm significant completed actions (example: Apple Pay), because people expect actions to succeed and mainly need to know when they do not; say why a command cannot be carried out; give feedback in more than one channel (color, text, sound, haptics) for accessibility.
- Notifications page: when the app is in the foreground, present new information in a discoverable but not distracting way, such as incrementing a badge or inserting data into the current view (https://developer.apple.com/design/human-interface-guidelines/notifications).
- Duration, position, undo action: Not documented.

## Component: Empty / error state

Source: https://developer.apple.com/design/human-interface-guidelines/loading ; https://developer.apple.com/design/human-interface-guidelines/tab-bars ; https://developer.apple.com/design/human-interface-guidelines/alerts

- No dedicated empty-state or error-state page (checked https://developer.apple.com/design/human-interface-guidelines/; "empty-states" returns not found).
- Related statements:
  - Tab bars: do not disable or hide a tab even when content is unavailable; if a section is empty, explain why its content is unavailable.
  - Alerts: if a problem is detected at startup (e.g. no network), consider showing cached or placeholder data and a nonintrusive label describing the problem rather than an alert.
  - Loading: show something as soon as possible, using placeholder text or graphics replaced as content arrives; let people do other things while loading; use progress indicators (determinate when duration is known, indeterminate otherwise).
  - Feedback: show when a command cannot be carried out and help people understand why.
- Illustration, layout and button recommendations for empty screens: Not documented.

## Component: Badge

Source: https://developer.apple.com/design/human-interface-guidelines/notifications ; https://developer.apple.com/design/human-interface-guidelines/tab-bars

- Two documented uses:
  - App icon badge ("Badging" section of Notifications): small filled oval with a number of unread notifications. Use only for unread notification counts, not for weather, dates, scores, etc.; keep it up to date (update when notifications are opened); never the only way to deliver essential information because people can turn badges off; do not build a custom component that mimics a notification badge.
  - Tab bar badge: a red oval with white text, containing a number or an exclamation point, on a tab to signal new or updated information that warrants attention. Reserve for critical information so the badge keeps its meaning.
- In-content badge sizes, positions, count overflow ("99+"): Not documented (checked https://developer.apple.com/design/human-interface-guidelines/notifications).

## Component: Banner / notice

Source: https://developer.apple.com/design/human-interface-guidelines/notifications

- No in-app banner or inline notice component (checked https://developer.apple.com/design/human-interface-guidelines/ and /feedback). The word "banner" in HIG refers to system notification banners.
- Closest guidance: status feedback integrated into the interface near the items it describes (Feedback page example: Mail shows last update and unread count in the mailbox toolbar); non-intrusive label for a startup problem (Alerts page).
- Notification content rules (system notifications, not in-app): see the Notifications page for title/body, action and destructive-action rules; not summarized here because they apply to system delivery.

## Component: Top app bar / navigation bar

Source: https://developer.apple.com/design/human-interface-guidelines/toolbars

- Apple calls the top bar a toolbar; in iOS a navigation-specific toolbar is a navigation bar. Contents: title of the current view, navigation controls (back, search) and actions (buttons, menus).
- Placement groups: leading edge (back, sidebar toggle, title), center (common controls), trailing edge (important items, optional search, More menu, primary action such as Done). Aim for at most three groups.
- Rules:
  - Choose items deliberately to avoid overcrowding; move less important actions to a More menu.
  - Use the standard Back and Close buttons with standard symbols; do not label them "Back" or "Close" in text.
  - Prefer recognizable symbols over text except for actions like Edit; use system symbols without borders.
  - Use the prominent style for a key action such as Done or Submit; only one primary action, on the trailing side.
  - Keep text-labeled actions separated (fixed space) from symbol actions so they do not read as one control.
  - Reduce custom bar backgrounds and tinted controls; avoid label colors similar to colorful content behind the bar.
  - Titles: concise, under 15 characters (as stated), not the app name; can be empty if redundant.
  - iOS: use a large title that collapses to a standard title on scroll to keep people oriented; prioritize only the most important items in the main area.
- Bar height and item spacing in pt: Not documented (checked https://developer.apple.com/design/human-interface-guidelines/toolbars; there is no separate navigation-bars page).

## Component: Tab bar / navigation bar (bottom)

Source: https://developer.apple.com/design/human-interface-guidelines/tab-bars

- Purpose: navigate between sections of the app while keeping each section's navigation state; not for actions (use a toolbar).
- iOS: the tab bar floats above content at the bottom with a Liquid Glass background; it may minimize on scroll when an accessory such as a mini player is attached; a dedicated search tab can sit at the trailing end.
- Rules:
  - Keep the tab bar visible when moving between sections (exception: a modal covers it).
  - Use as few tabs as the hierarchy needs; avoid overflow (a "More" tab appears when horizontal space runs out).
  - Do not disable or hide a tab even when content is unavailable; explain an empty section.
  - Include labels, single words where possible; labels sit under icons in compact views and beside them in regular views.
  - Prefer filled SF Symbols for consistency with the platform.
  - Badge only critical information (red oval; number or exclamation point).
  - Avoid label colors similar to colorful content behind the bar.
- Tab count: "fewer is easier" but no fixed maximum is stated for iPhone; a customizable iPadOS tab bar should default to five or fewer. Bar height and icon size: Not documented (checked https://developer.apple.com/design/human-interface-guidelines/tab-bars).

---

## Comparison prompts

1. Does the screen have at most one or two prominent buttons, and is the destructive one never the primary-role button?
2. Does each sheet offer a way to leave (grabber, swipe, Cancel) and a Done paired with Cancel or Back?
3. Is an alert reserved for uncommon, irreversible actions, with a specific verb button and Cancel?
4. Can empty and error sections keep their tab visible and explain why content is missing?

Combine with [material3-components.md](material3-components.md) when an option needs both a platform convention and a cross-platform counterpart. Treat combinations as hypotheses.
