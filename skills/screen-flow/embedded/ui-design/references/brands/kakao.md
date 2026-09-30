---
id: kakao
name: 카카오
status: text-verified
checked_at: 2026-09-05
---

# 카카오

- Official source: [Reference page](https://www.kakaocorp.com/page/service/service/KakaoTalk).
- Optional pattern hints: chat.inbox, chat.conversation, chat.channels, service.profile.
- Status applies to the recorded source/observation, not to the entire service.

## Earlier evidence

The official service description discusses organizing conversations, editing messages, profiles, and related features. These are product descriptions, not tested app behavior.

## Observed screen: official chat-list illustration

- Source: [KakaoTalk service introduction](https://www.kakaocorp.com/page/service/service/KakaoTalk); inspected 2026-09-05.
- Surface: desktop webpage at 1440 × 900 CSS pixels, scrolled to the conversation section. [Capture](captures/kakao-chat-folders-20260905.png).
- Observed: explanatory text is paired with a phone illustration. Visible conversation rows align avatar/name/message preview on the left and time/unread badges on the right. The webpage text explains folder-based organization; the captured region does not establish folder interaction.
- Useful for: inbox row hierarchy and explaining a feature beside its interface illustration.
- Borrow: separate identity, latest-message context, recency, and unread status in predictable positions.
- Do not borrow automatically: unrelated social-sharing controls, promotional illustration style, or native navigation in a desktop workbench.
- Limits: this is an official static product illustration, not an operated app. IME, scrolling, focus, live updates, message editing, and AI chat behavior remain unverified.

Follow the [shared observation format](index.md#screen-observation-record) when adding evidence. Preserve dates and limitations. Do not fabricate measurements or reuse brand assets without the required rights.

## Research update: Conversation-list illustration in a public service page

- Inspected: 2026-09-05 via Aside Browser MCP.
- Source: [Official page](https://www.kakaocorp.com/page/service/service/KakaoTalk).
- Evidence: [Capture](captures/kakao-inbox-20260905.png).
- Environment: 1440 × 900 CSS px; device scale 2.
- Observed: The captured phone illustration pairs avatars and conversation names with secondary message previews. Time and unread counts align at the opposite edge, while bottom navigation stays separate. Explanatory copy appears beside the phone, communicating the feature before asking the reader to interpret the miniature screen.
- Adaptation hypothesis: Use identity/context/recency as separate layers for an inbox. For a feature landing page, align a short explanation with the exact supporting screen region.
- Tradeoffs and exclusions: Do not turn every message into an equally prominent badge or confuse group size with unread count. Keep real conversation interactions separate from promotional carousels; native bottom navigation is not automatically suitable for desktop.
- Limits: Official static illustration only. The current crop does not show the entire folder control. Folder behavior, sending, editing, IME, scrolling, live updates, and screen readers remain untested.
