# Service references

This library is optional support beneath established project design settings and IKY defaults. Read it only for a useful interaction or composition example; do not require a service-reference round on every task. Keep each service in an independent file. Recommendations are screen-specific hypotheses, not fixed brand stereotypes or measured rankings. Distinguish marketing sites, consumer apps, and operator tools.

| Service | Inspected evidence | Useful reasoning lens | Limits |
|---|---|---|---|
| [Toss](toss.md) | Business landing; official ListRow illustration and component docs | Label/value/action hierarchy; composed rows | Native interaction untested |
| [Daangn](daangn.md) | Consumer web home; SEED loading-pattern table | Direct discovery plus shortcuts; scoped feedback | Loading timing not measured |
| [Naver](naver.md) | Signed-out desktop portal capture | Global discovery plus local module controls | Search/mobile/personalization untested |
| [Kakao](kakao.md) | Official conversation-list illustration | Identity, message context, recency, unread state | Illustration, not operated app |
| [Hyundai Card](hyundai-card.md) | Official events/magazine desktop landing | Editorial hierarchy plus comparable offer tiles | Application flow untested |
| [Baemin](baemin.md) | Official self-service dashboard/form illustrations | Responsive task grouping and view/edit consistency | Historical 2021 article |
| [Yogiyo](yogiyo.md) | Public discovery page before location entry | Context-first search and recognizable categories | No location-specific order flow |
| [Apple Music](apple-music.md) | Korean web discovery and album detail | Editorial/list density; identity and item actions | Signed-out desktop; native playback untested |
| [Apple Wallet](apple-wallet.md) | Official card-stack and travel-status illustrations; website disclosure | Object recognition; current status | Native interactions untested; illustrated pass includes future availability |
| [Apple website](apple-web.md) | Campaign hero, product story, two-column grid | Proposition/action hierarchy; parallel offer structure | Desktop marketing, not an app or comparison table |

See [pattern synthesis](patterns.md) for cross-service combinations and what to verify. Each file contains dated observations, captures, adaptation hypotheses, and limits. A visual observation applies only to its recorded region; it is never a service-wide certification.

## Use saved knowledge during design

1. Read relevant project decisions and [pattern synthesis](patterns.md), then only the service cases needed for the decision. Do not load the whole library on every invocation.
2. Use the saved analysis directly for hierarchy, composition, and adaptation. Inspect the linked local captures when reasoning about visual detail; source URLs identify provenance and do not require a website visit.
3. Compare 3–5 saved screen observations when useful, without browsing to fill a quota. Explain the applicable pattern, tradeoff, and what not to copy; recommend supporting patterns without replacing the project/IKY design contract.
4. Connect these observations to focused questions and the user's 4–5 design alternatives. New directions can synthesize existing knowledge; an unfamiliar composition does not itself require external research.

Preserve the observation's date, surface, and limits. Older inspiration remains useful without claiming that it describes today's product. This library is reusable reference knowledge, not model training or proof of untested behavior. Local IKY examples, coded previews, and verification of the user's implementation are separate from external reference browsing.

## Targeted research and library maintenance

Research externally only when the user requests research or refreshed references, a material design question lacks adequate local evidence, or a claim requires current verification. State the gap and inspect only the needed official source or actual screen. Do not automatically refresh the library by age, session, new screen, or comparison round. When local evidence suffices, proceed directly to questions, alternatives, and implementation.

For a visual claim, inspect and capture the relevant region; page text alone does not verify pixels or interaction. Follow the browser routing for the current session. Save the reusable observation, local capture, adaptation guidance, exclusions, and limits in the service file so later invocations can reuse the work. Update this index and pattern synthesis only where new evidence adds a useful distinction; preserve earlier dated observations. Do not crawl an entire service to resolve one gap.

When a site is inaccessible, mark the gap and use available evidence or a clearly labeled design hypothesis. Do not block unrelated work, invent a screenshot, or authenticate, order, send messages, or change account/location settings without applicable authorization. Captures are research evidence, not licensed product assets.

## Screen observation record

For every reusable case, include: screen title and source URL; observation date; product surface and viewport/state; local capture path; observed hierarchy/layout/type/component/interaction details; applicable task; pattern to borrow; features not to borrow; limitations and untested behavior. Record exact values only when measured. Never label a whole service visually verified from one screen.

Instruction prose stays English. Preserve Korean screen names and quoted UI labels where they identify actual product content.

## Add a service or observation

Add `<service-id>.md` using a lowercase/hyphen ID, register it in this index, and optionally add its ID to relevant `brand_candidates` in [catalog.json](../screens/catalog.json). The router does not need editing. Catalog hints are optional; references may support any new or hybrid screen purpose.

Keep `id`, `name`, `status`, and `checked_at` metadata. Retain earlier evidence when adding cases. Use `candidate` for inaccessible/unconfirmed sources, `text-verified` for read content, and `visual-verified` only on the particular screen record actually inspected. Store captures under `captures/` and link them relatively so the evidence travels with the skill.
