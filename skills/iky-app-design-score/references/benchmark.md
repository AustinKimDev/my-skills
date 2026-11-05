# Benchmark — Toss · Daangn · Apple HIG · anti-AI-look (researched 2026-11-05)

Checkable rules for scoring a Korean consumer mobile app from screenshots. Each rule: rule → how to check.
Sources: toss.im/tossfeed/article/tossproductprinciples (A), developers-apps-in-toss.toss.im/design/consumer-ux-guide.md (B),
toss.im/tossfeed/article/uxwriter-interview (C), seed-design.io/llms/foundations/* (D), developer.apple.com/design/human-interface-guidelines/* (H),
anthropics/skills frontend-design SKILL.md (F), 925studios.co/blog/ai-slop-design-tells (S1), thefountaininstitute "7 tells a UI is AI generated" (S2).

## Toss
T1 One Thing — one core message per screen. Check: say the screen's job in one sentence; one primary CTA. (A)
T2 Clear Action — the next action is obvious within 3 s. (A)
T3 Easy to Answer — inputs have defaults/suggestions. (A)
T4 Explain Why — permission/data requests say why first. (A)
T5 Value First — show the benefit before asking for sign-up/permission/payment. (A)
T6 Casual concept, simple policy — no jargon; conditions fit in one line. (A)
T7 Minimum features / no more loading — fewer steps, no needless spinners. (A,B)
T8 Dark patterns are release blockers — no ad/notification-consent bottom sheet right after entry, no sheet that blocks back, no exaggerated text above CTA. (B)
T9 Tab bar optional; 2–5 tabs. (B)
T10 One key graphic per screen; icons/emoji 24–40px, one at a time; no particles/heavy gradients; no "!" unless error; no loader when nothing loads. (B)
T11 Graphics simple and clean digital style; avoid lyrical/cartoon/hand-drawn; mid-luminance colors visible in light and dark. (B)
T12 Empathy copy at emotional moments; no clickbait. (C)

## Daangn (SEED)
D1 Color only via role tokens (brand/neutral/critical…). (D/color-role)
D2 Brand color marks the single most important action per screen. (D)
D3 Critical (red) only for errors/serious issues. (D)
D4 Never color alone — pair with text/icon. (D/inclusive)
D5 Contrast APCA: body Lc≥75 (90 ideal), other text Lc≥60 (bold if <16px), placeholder/disabled Lc≥30. (D)
D6 Touch target ideal 44×44, minimum 24×24. (D)
D7 Respect OS font size; layout survives larger text. (D/typography)
D8 Press feedback = color change on every pressable; scale only where it fits; 150ms; off under reduce-motion. (D/feedback)
D9 Motion: micro ≤0.2 s, macro >0.2 s, tokens 50–300 ms; enter/exit easing for sheets; nothing >2 s unskippable. (D/motion)
D10 Errors near the field with a fix ("다시 시도"). (D)
D11 Simple-tap alternative for complex gestures. (D)
D12 Put local/community context in copy (for a community app: the fandom, work or event context instead of the neighborhood). (D/writing)

## Shared Korean UX writing (Toss + Daangn)
W1 해요체 throughout; no 하십시오체 or excessive honorifics ("있나요?" not "계신가요?").
W2 Active voice ("했어요" not "됐어요"), except reassurance/shutdown notices.
W3 Positive framing ("한 달에 한 번만 바꿀 수 있어요" not "한 번 이상 바꿀 수 없어요").
W4 Unpack Sino-Korean nouns and noun stacks ("대화할 수 없어요" not "대화가 불가능합니다").
W5 User-action wording, one purpose per sentence ("채팅으로 거래하기").
W6 Buttons: single button "~하기"; two buttons left = "닫기/다음에" (not "취소"); no periods on buttons/labels/titles; sheet title one line.
W7 Errors = cause + fix.
W8 "!" only when needed; Arabic numerals; cut filler words.

## Apple HIG (iOS)
H1 Safe areas: controls/text clear of status bar, Dynamic Island, home indicator, tab bar; backgrounds may bleed. (/layout)
H2 Touch targets 44×44pt (28 min); ~12pt around bezeled, ~24pt around unbezeled controls. (/accessibility)
H3 Type: body 17pt, floor 11pt, Large Title 34pt; use a consistent text-style scale. (/typography)
H4 Dynamic Type up to 200%+; stack instead of truncating. (/typography)
H5 Contrast ≥4.5:1 small text (3:1 large/bold); dark mode aim 7:1 for small text; color never the only cue. (/dark-mode, /accessibility)
H6 Dark mode: base vs elevated backgrounds — sheets/cards lighter than page; soften white images. (/dark-mode)
H7 Tab bar: top-level destinations only, ≤5, every tab labeled + symbol, never hidden/disabled, badges only for critical info. (/tab-bars)
H8 Liquid Glass/blur only on controls & navigation layer, never on content. (/materials)
H9 Sheets: brief scoped tasks, grabber when resizable, Cancel leading / Done trailing, swipe-down dismiss, one sheet at a time, not used as navigation. (/sheets)
H10 Hierarchy: most important content top-leading; group by whitespace then separators; progressive disclosure. (/layout)
H11 Accounts: let people browse before sign-in; offer Sign in with Apple; findable account deletion. (/managing-accounts)
H12 Onboarding fast and skippable; ask permissions at the moment of need with context. (/onboarding)
H13 Empty states say why it is empty and give one next action. (/tab-bars)
H14 One icon family with consistent weight; no emoji standing in for icons. (/dark-mode, /tab-bars)

## AI-look tells (avoid) → instead
A1 Indigo/purple(-to-blue) gradient or default indigo accent everywhere → accent derived from the product, one dominant accent used for function. (S1,S2)
A2 Font/size with no decision → deliberate type scale; on iOS the tell is arbitrary sizes, not the system font. (S1,F)
A3 Emoji as icons → one real icon set. (S2)
A4 Identical rounded cards, same radius/shadow, 3-up grids → vary weight, let one item lead, use dividers/whitespace. (F,S1)
A5 Cards inside cards → flatten; group with spacing and type. (S2)
A6 Uniform spacing/radius, no focal point → primary element bigger/heavier. (S2)
A7 Generic copy that fits any product → specific plain copy tied to the action. (S1,F)
A8 Neon on dark, aurora/radial glow → 4–6 named colors, one accent, no decorative glow. (S2,F)
A9 Near-black + single acid accent as the whole look → deliberate surface levels (H6) and brand-tied accent. (F)
A10 Colored dots/badges/stripes on every item → one accent for active state; text labels for status; dots only for live. (S2)
A11 Template chrome: eyebrow labels, "A · B · C" meta strings, arrows on every link → label only when it carries information. (F)
A12 Only the happy path designed → real empty/loading/error states with a next action. (S2)
A13 Uniform fade-up motion or none → motion responds to actions. (S2,F)
A14 Glassmorphism on content → glass only on navigation/controls (H8).
A15 Everything exposed at once → progressive disclosure.
A16 Generic 3D placeholder illustrations (gift boxes, calendars) repeated across empty states; over-rounded everything; meaningless badges → product-specific imagery or real user content. (unverified as a sourced tell; consistent with A4/A6/A10)

Master question (S1): for every visible decision — was it chosen, or defaulted?
