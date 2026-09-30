---
id: apple-wallet
name: Apple Wallet
status: visual-verified
checked_at: 2026-09-06
---

# Apple Wallet

Source: [Apple Korea Wallet](https://www.apple.com/kr/wallet/), inspected 2026-09-06 with Aside Browser MCP at 1440 × 900 CSS px, device scale 2. Native screens below are official website illustrations, not an operated personal wallet.

## Card collection: exposed identity in overlapping objects

- Evidence: [card-stack capture](captures/apple-wallet-stack-20260906.png), hero illustration scrolled into view.
- Observed: a portrait phone shows the Wallet heading with add, search, and overflow controls. Cards overlap vertically, retaining issuer/category identity in exposed top bands. One foreground card is more fully visible; another group of passes appears below. Color and imagery distinguish objects against a dark app background.
- Borrow for: a small collection of owned passes, memberships, bookings, or access credentials where recognition matters. Preserve identifying text when collapsed; reveal current state and actions when opened.
- Tradeoff: overlap hides details and weakens price/date comparison across many records. Use a readable list or search when those tasks dominate. A card stack is not an automatic default for a feed or dashboard.
- Limits: selection, reorder, expansion motion, screen-reader order, and card gestures were not exercised. Depth in a still illustration does not specify spring constants or transitions.

## Boarding-pass context: current status before secondary details

- Evidence: [expanded information card](captures/apple-wallet-pass-20260906.png). Opened the website's “탑승권” button and closed its information panel.
- Observed: the panel pairs explanatory text with a phone lock-screen illustration. A compact travel-status surface emphasizes origin/destination codes and route progress; arrival terminal, gate, and baggage claim form a secondary group. The website panel has a close control; its accessibility tree exposed a named dialog and focused heading.
- Borrow for: status-first grouping in active reservations, delivery progress, appointments, or live sessions. Keep the next needed information close to the ongoing task rather than giving historical details equal weight.
- Avoid: irrelevant airport fields or assuming sensitive details belong on a lock screen. The page labels the illustrated Southwest pass as coming later; do not claim current local availability from this image.
- Limits: website disclosure was operated; native pass updates, lock-screen behavior, payment, and device authentication were not. This is not a security or accessibility certification.

## Comparison prompts

- Is the task recognizing an owned item, comparing alternatives, or taking a time-sensitive action?
- What identity must remain visible when collapsed, and what status should require no extra navigation?
- Would a plain list better support many items, long labels, or assistive technology?

Combine with [Toss](toss.md) for explicit values and actions. Native continuity follows the Apple Design foundation, with separate prototype/device verification.
