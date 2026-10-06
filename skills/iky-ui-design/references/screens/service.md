# Service screens

Use these as optional lenses for service tasks. [Catalog entries](catalog.json) are examples; compose or invent a more appropriate structure without registering a type. Do not classify an entire application as its home screen.

- Discovery: home, search, listing, map.
- Understanding/participation: detail, editorial, community.
- Account/personalization: profile, settings, auth, onboarding, notifications.
- Input/transactions: form, checkout, booking, history, upload, result.

The catalog supplies sample questions, states, connections, and reference candidates. Derive the actual screen and its states from the task; do not treat these examples as required coverage.

## Connections

Examples: home → search → listing → detail → checkout → result → history; detail → booking → checkout; detail/history → chat.support; community → detail → chat.thread. Implement only agreed paths and prefer existing project routes. Authentication returns to the original destination. Preserve search, filters, scroll, and entered values on back navigation.

## Decisions and checks

Use wireframe for unresolved information/action structure, layout for arrangement, page for overall direction, prototype for connected steps, component for a small element, and typography for reading/wrapping. Follow the shared dialogue and five-alternative policy during exploration.

Use better-layout for discovery; better-accessibility and better-writing for input/transactions; better-typography for content, only where relevant. Verify task completion, empty-result recovery, input preservation, duplicate-action prevention, keyboard/viewport occlusion, and modal focus return. Payment/auth/upload prototypes must not create external writes.
