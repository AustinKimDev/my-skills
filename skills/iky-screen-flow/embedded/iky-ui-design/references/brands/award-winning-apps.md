---
id: award-winning-apps
name: Award-winning apps - documented component treatments (Apple Design Awards, iF, Material 3 Expressive)
status: text-verified
checked_at: 2026-10-23
---

# Award-winning apps: component treatments with a documented source

- Purpose: precedent list for shared mobile components (button, row, field, tabs, chip, status, badge, sheet, dialog, empty/error, toast). Every bullet is a statement a source makes; the award is stated per bullet. Complements [toss-tds.md](toss-tds.md), [daangn-seed.md](daangn-seed.md) and [material3-components.md](material3-components.md); read those for the Korean and Material baselines.
- Environment: text only. Page text read on 2026-10-23 through a page-to-markdown fetch; the m3.material.io pages were read through the reader `https://r.jina.ai/https://m3.material.io/<path>` because the site renders client-side. No screenshots, no app was opened, nothing was seen on a device. Status applies to the recorded text only.
- How to read: "inferred" marks this note's reading, not the source's statement. "Not documented" means the source was read and does not say it. No pixel or color value appears unless a source printed it.
- Awards verified on developer.apple.com/design/awards/{2022,2023,2024,2025}/ (all four pages read, 2026-10-23):
  - 2022: Halide Mark II (Visuals and Graphics, winner); (Not Boring) Habits (Delight and Fun, winner; Visuals and Graphics, finalist); Procreate (Inclusivity, winner; Innovation, finalist); Transit (Interaction, finalist).
  - 2023: Flighty (Interaction, winner); Duolingo (Delight and Fun, winner; Social Impact, finalist); Headspace (Social Impact, winner); Any Distance (Visuals and Graphics, winner); Universe (Inclusivity, winner).
  - 2024: Bears Gratitude (Delight and Fun, winner); Rooms (Visuals and Graphics, winner; Delight and Fun, finalist); Crouton (Interaction, winner); Oko (Inclusivity, winner); Gentler Streak (Social Impact, winner); Copilot Money (Innovation, finalist); Tiimo (Inclusivity, finalist); Procreate Dreams (Innovation, winner; Interaction, finalist).
  - 2025: Taobao (Interaction, winner); iA Writer and Mela (Interaction, finalists); CapWords (Delight and Fun, winner); Speechify (Inclusivity, winner); Watch Duty (Social Impact, winner).
  - Outside the requested range: Structured appears only as a 2026 Inclusivity finalist, and (Not Boring) Camera only as a 2026 Visuals finalist. Things and Kino were not found in the 2022-2025 lists and are not used. Treat any claim that they won in these years as unverified.
- Korean awards verified: Daum Webtoon app, iF Design Award 2020, app design category, honorary prize (inews24 report, 2020-02-17). Daum brand design, Red Dot 2010 communication design (Kakao corporate page); this is brand design, not an app component, so it is not used below. No Red Dot or iF award for Toss, Karrot/Daangn, Baemin, Musinsa, 29CM, Naver or Kakao apps was found by search; absence in search results is not proof of absence in the award databases (red-dot.org and ifdesign.com were not queried directly). Those services are therefore used only through their own design-system notes already in this folder, never labeled award-winning here.
- Sources that were unreadable or thin:
  - Apple newsroom pages for 2022-2024 returned 404 on the guessed URLs; only the 2025 newsroom page was read, and it describes interfaces very little.
  - Apple "Behind the Design" articles exist for Flighty, Duolingo (via the 2023 roundup), (Not Boring) Habits, Procreate, Crouton, Bears Gratitude, Gentler Streak, Oko and Rooms; all were read. They are interviews about process and mostly do not describe buttons, sheets, dialogs or fields. No Behind the Design article was found for Halide, Copilot Money, Tiimo, Taobao, iA Writer or Mela.
  - Duolingo's official blog describes the home path; Duolingo's button styling (shadow, radius, press) was found only in unofficial third-party summaries, which are not cited as fact below.
  - m3.material.io: component and style pages were read as text only; figures and spec drawings were not seen.
- Style fit (inferred) for this app (flat, light editorial plus dark, one accent, dense): the most transferable precedents are Flighty's one-line-per-item status, Crouton's "leave things out" step view, Oko's single colored status chip, Procreate's gesture-instead-of-control stance and the M3 Expressive shape, group and loading-indicator rules. Precedents that depend on 3D animation, sound, mascots or heavy shadows (Habits, Bears Gratitude, Rooms, Gentler Streak) are documented below but conflict with the flat constraint.

## Component: Button

- (Not Boring) Habits (Apple Design Award, Delight and Fun winner, 2022): the checkbox is a hold-to-complete control, "the Habits checkbox can't merely be ticked; you have to intentionally press on the screen for longer than you might think to trigger the animation", with feedback that tells you to keep holding, custom haptics, sounds and 3D particle animation. Standard controls elsewhere are described as "fairly off-the-shelf". Fit (inferred): the hold-to-confirm idea transfers to destructive or final actions; the explosion effect does not fit a flat style. Source: https://developer.apple.com/news/?id=9ab1g4r3
- Procreate (Apple Design Award, Inclusivity winner, 2022): added capability through a gesture (hold a drawn shape to get Quick Shape) with "no extra buttons or menu dives required"; refrains from word labels where possible and relies on iconography for non-localized regions. Source: https://developer.apple.com/news/?id=e409h6ja
- Crouton (Apple Design Award, Interaction winner, 2024): leans on platform conventions; import uses the system Share button ("just hit the Share button to pull it into Crouton"); designer says he "spent a lot of time figuring out what to leave out rather than bring in". Other in-app buttons are not described. Source: https://developer.apple.com/news/?id=9x75y43e
- Duolingo (Apple Design Award, Delight and Fun winner, 2023): home screen as a path with a floating arrow button at the bottom right that jumps back to the user's current spot; top-bar heart icon opens practice; a guidebook icon sits at the top right of each unit. Button shape, fill and press styling are not documented by the official source. Source: https://blog.duolingo.com/new-duolingo-home-screen-design/
- Material 3 Expressive (Google, 2025; not an award): standard button groups make adjacent buttons respond, so a selected button changes shape and width and neighbors move and change width temporarily. Rules stated: all buttons in a standard group have the same size (XS to XL) and shape; mix sizes only for hero moments; use a different shape only on the selected button or to add meaning. Source: https://m3.material.io/components/button-groups/guidelines
- Material 3 Expressive split button (Google, 2025; not an award): a leading button (one or two words plus an icon) and a trailing button that opens a menu of further actions, "reduces visual complexity by hiding extra options"; five sizes (extra small to extra large, small default); the menu is the typical target. Source: https://m3.material.io/components/split-button/guidelines
- Material 3 Expressive research (Google, 2025; not an award): in the email case study the expressive Send button was larger, sat above the keyboard and used a secondary color, and was spotted "four times faster" than the standard top-toolbar version in an eye-tracking study of 10 apps; the page says it reports 46 studies and "more than 18,000 participants". These are Google's own claims about its own designs; the page also reports that removing text labels from email actions reduced usability. Source: https://design.google/library/expressive-material-design-google-research

## Component: List row

- Flighty (Apple Design Award, Interaction winner, 2023): the designer says airport departure boards "have one line per flight, and that's a good guiding light - they've had 50 years of figuring out what's important", and the look "mirrors time-honored airport design conventions". Row anatomy beyond one line per item is not documented. Source: https://developer.apple.com/news/?id=970ncww4
- Crouton (Apple Design Award, Interaction winner, 2024): the recipe library is lists and collection views, shown as a grid of recipes with a photo for each dish, built on platform conventions. Source: https://developer.apple.com/news/?id=9x75y43e
- (Not Boring) Habits (Apple Design Award, Delight and Fun winner, 2022): described as a "lightweight, quick-launching, scannable daily utility app"; list design itself is not discussed. Source: https://developer.apple.com/news/?id=9ab1g4r3
- Toss and Daangn rows are documented in the existing notes; they are not award-verified here. Source: [toss-tds.md](toss-tds.md), [daangn-seed.md](daangn-seed.md)

## Component: Text field

- Bears Gratitude (Apple Design Award, Delight and Fun winner, 2024): no sign-in screen, "We wanted people to go straight into the experience and start writing"; the writing prompts are tap-through cards, the designer calls it "definitely a nonstandard UX". The field itself (label, focus, error) is not documented. Source: https://developer.apple.com/news/?id=i74v3f4r
- Crouton (Apple Design Award, Interaction winner, 2024): input is replaced where possible: share a web page, or "just snap a picture" of a printed recipe (VisionKit text recognition plus an on-device model for ingredients). Field styling is not documented. Source: https://developer.apple.com/news/?id=9x75y43e
- Gap: no award-winning app read documents a text field treatment (label placement, focus, error, counters). Use the Toss, Daangn and Material notes for field anatomy. Source: [toss-tds.md](toss-tds.md), [daangn-seed.md](daangn-seed.md), [material3-components.md](material3-components.md)

## Component: Tabs / segmented control

- Material 3 Expressive connected button group (Google, 2025; not an award): "should replace the baseline segmented button"; used to select options, switch views or sort; single or multi-select with toggle buttons; the group spans the width of its surface; do not mix color styles in one connected group; do not use it when no button can be toggled. The same page says segmented buttons are deprecated in the expressive update and points to a nav rail for navigation. Source: https://m3.material.io/components/button-groups/guidelines
- Material 3 Expressive toolbar (Google, 2025; not an award): docked toolbar spans the window for global actions; floating toolbar floats above content for page-specific actions; standard (low emphasis) and vibrant (high emphasis, can signal a temporary mode such as editing) color configurations; toolbar and navigation bar are both bottom-placed so are not shown together (navigation bar on primary pages, toolbar on later pages). Source: https://m3.material.io/components/toolbars/guidelines
- Rooms (Apple Design Award, Visuals and Graphics winner, 2024): added native iOS elements, "sliders on the Explore page and a bottom navigation", which the team credits with the "design chef's kiss". Source: https://developer.apple.com/news/?id=sqd5xv4n
- Duolingo (Apple Design Award, Delight and Fun winner, 2023): bottom menu items open Quests (chest icon) and Practice Hub (barbell icon, for subscribers). Source: https://blog.duolingo.com/new-duolingo-home-screen-design/

## Component: Chip

- Gap: none of the award-winning apps read documents a chip, filter or tag treatment. Do not infer one. Use the chip entries in [daangn-seed.md](daangn-seed.md) and [material3-components.md](material3-components.md).

## Component: Status and progress

- Flighty (Apple Design Award, Interaction winner, 2023): "We really have to shine when things go awry"; the app works offline; Live Activities keep key information "front and center at all times"; before takeoff the Dynamic Island shows "flight progress bars and counters" as a minimal circular chart of flight duration. Status color mapping is not stated in Apple's article; a third-party study (blakecrosley.com) claims green/amber/red/blue states and "15 smart states" but its hex values and enum are the author's own code and it cites no source, so it is not used as fact. Source: https://developer.apple.com/news/?id=970ncww4
- Oko (Apple Design Award, Inclusivity winner, 2024): signal state is shown by haptic, audio and visual feedback together; a screenshot caption says "Walk signal" is "highlighted in a green bubble at the top of the screen", with overlaid text for countdown and don't-walk states; testers asked for more visual feedback and the team added it. Source: https://developer.apple.com/news/?id=58c4urmu
- Gentler Streak (Apple Design Award, Social Impact winner, 2024): health data in a "colorful, approachable design"; workout history as simple bar graphs; a Monthly Summary focused "less on comparison and more on progress"; a mascot states the status in words over a line graph. Source: https://developer.apple.com/news/?id=3m0ht22s
- (Not Boring) Habits (Apple Design Award, Delight and Fun winner, 2022): progress framed as 66 levels (research that a habit takes 66 days), with named milestones such as "Karat" and "Summit". Fit (inferred): milestone naming transfers; the game framing is a tone decision. Source: https://developer.apple.com/news/?id=9ab1g4r3
- Duolingo (Apple Design Award, Delight and Fun winner, 2023): completed levels are gold and checked, uncompleted ones gray and blank, tapping a completed level revisits it, crowns were replaced by progress down the path, "Legendary" applies to a whole unit. Source: https://blog.duolingo.com/new-duolingo-home-screen-design/
- Crouton (Apple Design Award, Interaction winner, 2024): during cooking the screen shows "only the current step, ingredients, and measurements", with timers inside the app. Source: https://developer.apple.com/news/?id=9x75y43e
- Material 3 Expressive loading indicator (Google, 2025; not an award): for short waits of 200 ms to 5 s; under 200 ms show no indicator; over 5 s use a progress indicator; the active indicator morphs shape; do not transition a loading indicator into a determinate progress indicator (indeterminate to determinate progress is fine). Source: https://m3.material.io/components/loading-indicator/guidelines
- Material 3 Expressive research (Google, 2025; not an award): progress indicators were evaluated "for making waiting feel faster while still looking premium"; the page reports no separate result numbers for them. Source: https://design.google/library/expressive-material-design-google-research

## Component: Badge

- Gap: no award-winning app read documents a badge or count treatment in text. Duolingo's gold and checked level markers (see Status and progress) are status, not a badge. Do not infer one; use [material3-components.md](material3-components.md) and [toss-tds.md](toss-tds.md) for badge anatomy.

## Component: Bottom sheet

- Duolingo (Apple Design Award, Delight and Fun winner, 2023): tapping a path circle "opens a popup with information about the lesson topic"; the presentation type (sheet or popover) and its anatomy are not documented. Source: https://blog.duolingo.com/new-duolingo-home-screen-design/
- (Not Boring) Habits (Apple Design Award, Delight and Fun winner, 2022): the team says "We didn't have to rethink how a button or a popover works", i.e. standard presentation was kept. Source: https://developer.apple.com/news/?id=9ab1g4r3
- Gap: no sheet anatomy (handle, detents, dismiss) is documented by any award-winning app read. Use [apple-hig-components.md](apple-hig-components.md) and [toss-tds.md](toss-tds.md).

## Component: Dialog

- Gap: no award-winning app read documents a dialog or alert treatment. Use [apple-hig-components.md](apple-hig-components.md), [toss-tds.md](toss-tds.md) and [material3-components.md](material3-components.md).

## Component: Empty / error state

- Flighty (Apple Design Award, Interaction winner, 2023): the designer's stated priority is the failure path, "We really have to shine when things go awry", and the app must keep working without connectivity, with key information kept on screen. No empty-state screen, copy or illustration is described. Source: https://developer.apple.com/news/?id=970ncww4
- Bears Gratitude (Apple Design Award, Delight and Fun winner, 2024): copy written "as if we were the only ones using it", with short example prompts ("Today isn't over yet"); mascots act as the brand anchor. Empty and error screens are not described. Source: https://developer.apple.com/news/?id=i74v3f4r
- Gentler Streak (Apple Design Award, Social Impact winner, 2024): a mascot states status in words ("Good news from Yorhart..."); error use is not documented. Source: https://developer.apple.com/news/?id=3m0ht22s

## Component: Toast / snackbar

- Gap: no award-winning app read documents a toast or snackbar. Oko's combined haptic, audio and visual feedback (see Status and progress) is the only transient-feedback statement found. Use [material3-components.md](material3-components.md) and [daangn-seed.md](daangn-seed.md) for snackbar rules.

## Cross-cutting: Material 3 Expressive shape and type (Google, 2025; not an award)

These do not fit one component heading; use them across Button, Chip, Bottom sheet and Dialog.

- Shape scale: ten styles, None 0, Extra small 4, Small 8, Medium 12, Large 16, Large increased 20, Extra large 28, Extra large increased 32, Extra extra large 48 dp, and Full. Asymmetric "inner corners" are used for closely grouped items such as menus and split buttons. Customization is "encouraged for hero moments or custom components". Source: https://m3.material.io/styles/shape/corner-radius-scale
- Shape morph: shapes in the Material shape library can morph into each other; used by standard button groups and the loading indicator; uses the expressive motion scheme by default and can be switched to the standard scheme; available via the Compose API, web "not currently available". Source: https://m3.material.io/styles/shape/shape-morph
- Emphasized typography: the type scale has 30 styles, 15 baseline and 15 emphasized; variable fonts are suggested for editorial treatments; the web expressive type is listed unavailable. Source: https://m3.material.io/styles/typography/emphasized
- Research claims Google publishes (own studies, not independent): expressive designs preferred across age groups, "up to 87%" among 18-to-24-year-olds; users 45+ matched younger users' fixation times; a "strong minority" preferred calmer versions; low familiarity reduced the benefit; a playlist redesign scored well on modernity but poorly on usability. Source: https://design.google/library/expressive-material-design-google-research
- Fit (inferred): shape morph, bouncy motion and "vibrant" color are the parts that clash with a flat, one-accent, dense app; the group rules (same size and shape, differences only for selection), the loading-time table and the type-scale split are the parts that transfer.

## Limits

- Most Apple articles are designer interviews; they document intent and a few concrete behaviors, rarely component anatomy. Prefer the Toss, Daangn, HIG and Material notes when a component spec is needed, and use this note to justify a distinctive direction by precedent.
- Awards listed are as printed on developer.apple.com on 2026-10-23 and one Korean press report. Award status does not certify an individual component.
- Third-party summaries (blakecrosley.com on Flighty; unofficial Duolingo design-token pages) were read but deliberately not cited as fact.
