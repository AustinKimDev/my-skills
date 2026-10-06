---
name: iky-website-launch-readiness
description: Audits and implements website launch essentials across a 20-item checklist covering discoverability, conversion, accessibility, feedback, privacy, and assets. Use when the user requests a website launch-readiness review, asks to fill missing pre-launch essentials, or invokes this checklist. Ordinary UI edits and unrelated coding tasks do not trigger a full launch audit.
---

# Website Launch Readiness

Turn a visually finished website into a reviewable launch candidate. These 20 items are readiness checks, not proof of security, legal compliance, or production reliability. Do not claim those outcomes from checklist completion.

## Scope and entry

- Review/audit requests are read-only. Requests to fix missing essentials authorize implementation within the user's scope. If mode is ambiguous, begin with inspection and ask only about the unresolved mutation scope.
- Read the nearest project instructions and reuse the established stack, components, design, locale, and existing decisions. Do not start a redesign or install a new UI framework.
- Identify site purpose, public/private routes, route templates, dynamic content, forms, existing tracking, and deployment environment. Use available code and configuration before asking. Do not inspect secrets.
- For a supplied URL without repository access, inspect observable behavior and report implementation limits. Do not treat inaccessible source, authenticated routes, failed requests, or missing tools as a confirmed absence.
- Resolve only material unknowns: canonical domain, intended CTA/conversion, real operator/contact details, actual data processing, and approved analytics provider. Continue independent work while awaiting answers.

## Checklist and acceptance evidence

For a full review, account for all 20 items. For a requested subset, inspect that subset without silently expanding scope. Mark each item **verified**, **needs work**, **unverified**, **decision needed**, or **not applicable**, with evidence or a reason. Implementation alone is not verification.

| # | Item | Applicability and acceptance evidence |
|---|---|---|
| 1 | Custom 404 | An unknown route displays a useful recovery action and returns HTTP 404 where the hosting/router supports it. A styled page served with 200 is a soft-404 finding; disclose static-host limitations. |
| 2 | Page titles | Each intended public/indexable page has a meaningful title. Check route metadata and rendered output; shared brand templates must still distinguish page content. Private utility pages need not be indexed. |
| 3 | Meta descriptions | Public/indexable pages have content-specific descriptions in rendered head metadata, including dynamic templates. Avoid claiming fixed character counts guarantee search snippets. |
| 4 | Above-fold CTA | On conversion-oriented pages, the main action is clear in representative desktop/mobile initial viewports and leads to a working destination. Do not add sales CTAs to every documentation, legal, or utility page. |
| 5 | Favicon | Configured icon URLs resolve, use appropriate types, and render without a missing asset. Reuse approved branding; do not invent a new brand. |
| 6 | robots.txt | Public origin serves intentional crawl rules. Check against deployment environment and sitemap location. Robots rules are not access control; protect private content through existing authorization. |
| 7 | sitemap.xml | For indexable sites, sitemap contains canonical public URLs that resolve, excludes private/noindex/redirect/error routes, and handles dynamic content. Do not invent a production domain or last-modified dates. |
| 8 | Open Graph image | Shareable pages provide appropriate OG title, description, URL, and an accessible image with an absolute production URL. Validate metadata and image response; disclose if no actual social preview was tested. |
| 9 | Image alt text | Informative images have contextual alternatives; decorative images use empty alt text. Image-only controls have an accessible name. Do not add redundant keyword descriptions to decorative assets. |
| 10 | Mobile breakpoints | Representative narrow and wide layouts preserve reading order, navigation, controls, and content without unintended horizontal overflow. Use project breakpoints and inspect the affected layouts. |
| 11 | Sticky mobile CTA | Consider only when a persistent conversion action helps this page. If used, it respects safe areas, keyboard, focus, and overlays, and does not obscure content or duplicate competing primary actions. Omission can be intentional. |
| 12 | Loading states | Actual async work has appropriate pending feedback, prevents accidental duplicate actions, and exits pending on success/failure. Avoid artificial delays or spinners for synchronous actions. |
| 13 | Form error states | Existing forms show actionable field/server errors, retain safe input, associate messages with fields, and support accessible focus/announcement. Check validation, server failure, and retry without sending real submissions. |
| 14 | Thank-you page | Successful submission/purchase has a truthful confirmation and next action. An accessible inline confirmation may satisfy the requirement; a separate route is optional. Never display success before confirmed completion or put sensitive data in URLs. |
| 15 | Privacy policy | Assess against actual data collection, processors, retention, rights/contact, and target jurisdictions. Use verified operator facts and approved policy text; missing facts require a decision, not fabricated legal content. |
| 16 | Terms | Determine relevance from service, transactions, accounts, and jurisdiction. Reuse approved terms; distinguish a reviewable draft from approved/published terms. Do not present boilerplate as legal assurance. |
| 17 | Cookie/consent controls | Inventory actual cookies/storage/trackers before deciding applicability. Where consent is needed, gate nonessential tracking before consent and support rejection, preferences, withdrawal, and persistence. No cosmetic banner or banner added by default to a tracker-free site. |
| 18 | Analytics | Install/configure only when measurement is wanted and the provider, identifiers, and data handling are authorized. Reuse existing integration; check consent gating, event duplication, and absence of sensitive payloads. No invented IDs or silent external data transmission. |
| 19 | Real contact address | Use an owner-supplied or verified business contact appropriate to the site. Distinguish contact email from a legally required business/postal address. Do not fabricate details or expose a personal address without authorization. |
| 20 | Compressed images | Inspect delivered sizes, dimensions, formats, and responsive variants using the existing asset pipeline. Preserve visual quality and originals when appropriate; avoid upscaling, layout shifts, and lazy-loading the critical above-fold image. No arbitrary universal size threshold. |

## Implementation and decisions

- Prioritize broken user journeys, inaccessible controls, and unintended tracking over cosmetic additions. Explain item-specific impact without declaring every missing item a launch blocker.
- Implement confirmed gaps using existing framework conventions, shared metadata helpers, route templates, and asset pipelines. Keep approved branding and product copy; write new user-facing text in the project's language (Korean by default).
- Honor existing authorization for dependency, public-contract, migration, authentication, or external changes. Creating this skill or asking for a readiness check does not authorize deployment, remote pushes, purchases, analytics accounts, or publishing legal drafts.
- When legal applicability or provider/framework behavior must be established, consult current authoritative sources through the available browsing workflow. State jurisdiction and uncertainty; avoid unsupported legal conclusions.
- Keep unresolved facts visibly pending in the work report. Do not ship placeholder contact details, fake success states, made-up domains, or unfinished legal copy as completed production content.

## Proportional verification

- Follow the project's required checks and verify the changed behavior. This skill is not a standing requirement to run 20 checks on every future edit.
- Inspect metadata/routes/assets using focused source, build, and HTTP checks. Inspect affected screens for visual changes; exercise changed interactions and relevant failure paths when behavior changes.
- Check route/template coverage for titles, descriptions, and indexing; a single screenshot does not establish every-page coverage. Use representative visual checks for shared templates and disclose unsampled variants.
- Use existing automated tests where useful. Do not add test artifacts solely for reversible copy, metadata, or configuration edits. For critical flows, use relevant automated and browser checks in a safe test environment.
- Browser work follows the host's routing and workspace ownership rules. Do not launch real purchases, send messages, or submit live forms merely to verify readiness.
- Stop after targeted and required checks pass unless new edits, failures, or specific unresolved concerns justify more testing. Distinguish local verification from production verification.

## Delivery

Lead with the concrete readiness result and material open decisions. For a full review, provide a compact 20-row table with item, status, and evidence/action; do not hide failed or unverified items behind a score. For a small scoped fix, a short outcome and verification line is enough. Link changed files and any existing project report rather than creating a mandatory new report, dashboard, or checklist artifact. Never equate completion with security certification, legal approval, or deployment.

Example requests:
- “출시 전 20개 항목을 점검하고 빠진 것만 알려줘.” → read-only review with evidence and applicability.
- “이 랜딩 페이지의 출시 준비 항목을 점검하고 수정해줘.” → inspect, implement authorized gaps, verify changed behavior, and surface unresolved operator/provider decisions.
- “메타 설명과 파비콘만 수정해줘.” → bounded work on those items; no mandatory full audit.
