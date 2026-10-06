---
name: find-partner
description: Research prospective creators, community partners, ambassadors, or collaborators; verify fit, public content, contact routes, and outreach history, then deliver a sourced shortlist or photo-rich HTML report. Use for partner prospecting, not employee hiring or automatic outreach.
---

# Find Partner

Turn a recruitment brief into a reviewable, evidence-backed candidate pool. Keep the skill independent of any product, social platform, audience, gender, budget, and target count.

## Establish the actual partnership

Resolve the brief from the conversation and project records before asking questions. Distinguish participation in a product/community from buying an advertisement, a sponsorship, a content commission, or an employment role. Do not substitute one for another.

Identify the product or organization, proposed partner activity, audience, required criteria, exclusions, geography/language, target count, budget if relevant, preferred platforms, known contacts, and requested output. Carry corrections forward; do not hardcode previous projects' criteria. Ask only for material missing information while continuing independent research.

Use a project-local brief or existing outreach ledger when available. Keep account identities, private conversations, product features, pricing and recruitment terms in that project; never copy them into this portable skill. Read product facts before writing a pitch. Research and report creation do not authorize outreach.

## Find and verify people

Use the browser selected by the user/session. Read the bundled [browser runtime guide](embedded/browser-runtime/GUIDE.md) when operating it. This skill supplies no browser, login, cookies or search API.

- Search across relevant categories and query variants; inspect candidate profiles and representative first-party posts. Search snippets are discovery evidence, not proof of current profile state. Tag snippet-only findings separately.
- Confirm the account belongs to the proposed person. Exclude fan pages, repost aggregators, organizations when individuals are requested, and duplicate accounts for the same person.
- Meet the requested count with qualifying candidates. Do not pad it with inactive, unverified or unsuitable accounts. If an honest shortfall remains, report verified and pending counts separately and explain the specific unresolved criterion.
- When an explicitly requested eligibility condition involves identity or age, use public self-description or relevant first-party evidence, never appearance, names, clothing, voice, follower demographics or birth-year-like hashtags. Record an unknown state when evidence is missing. Employment selection requires a separate applicable workflow.
- Capture current follower/subscriber counts with observation date and exact/approximate status. Do not call a single post's views an average, assume audience demographics, fabricate conversion estimates or invent fit scores.
- Read a few representative posts for activity, topic, format, fan interaction and recency. Record actual publication dates when visible; pinned posts and search indexing dates do not establish current activity.
- Rank using the brief's fit: proposed activity, content consistency, relevant audience, communication style, contactability and practical constraints. Keep observed facts separate from interpretation and participation willingness.

Store structured evidence as you work rather than reconstructing it at the end. For the report helper, read [the data format](references/report-data.md).

## Contact routes and prior outreach

Read public contact preferences: DM, email, form, agency, business-only contact, or no DM replies. A visible message button means a route exists, not that the person will respond. Honor explicit preferences. Advertising-only email is not automatically a partner recruitment address.

When authorized to read prior communications, inspect the existing project ledger and candidate-specific conversation. Use precise states: messages found, no messages visible, not checked, or unavailable. An empty DM panel does not prove the person has never been contacted; deleted conversations, email, secondary accounts, and request folders may remain unchecked. Do not treat an access failure as a clean history.

Never send a DM/email, follow, comment, submit a contact form, publish, or update an external CRM without explicit authorization for that action. With authorization, carry the agreed scope forward and respect the candidate's contact route. Drafts should match the requested tone and format; recruitment copy must describe the actual activity and verified product facts. Plain prose still needs paragraph breaks: separate the greeting and tailored proposal, the product explanation, and the links and closing with blank lines. Do not turn a request for prose into one uninterrupted block. Preserve normal word spacing.

## Collect useful content and photographs

Attach content to the corresponding candidate card, not a detached global photo gallery. Unless the user specifies otherwise, collect five recent posts and three representative posts per candidate. Recent posts exclude pinned items; use visible publication dates where available, otherwise explicitly label profile-feed order as the ordering basis. Choose representative posts for relevant activity and explain the selection, not as an invented popularity ranking. Label overlap between the two groups. Show real shortages or inaccessible items rather than filling with unrelated photos. Prefer images that demonstrate the relevant activity: performances, broadcasts, events, craft, finished work, or community interaction.

Use public first-party posts and user-authorized account access. Preserve creator attribution, canonical post URL, caption summary, publication date when known, capture date, and whether the image is a screenshot/thumbnail/original. Do not put private-message screenshots or unrelated personal material in the report.

Use the active browser's documented method to save a visible image or capture its post area. A practical fallback is: inspect the profile, open the observed post link, scroll the selected element into view, take a fresh snapshot, wait only if loading is observed, then capture the image area. Inspect each capture before accepting it. Reject black/loading tiles, wrong-post captures, adjacent-post mixtures and unintended UI/private-message overlays. Save the source URL separately from expiring CDN URLs. Never bypass restricted visibility or replace a missing real photo with a generated face.

Summarize content rather than copying long captions. Preserve uncertainty about dates, authorship and collaborator identity. Collecting examples for a local research report is separate from permission to reuse them in a public campaign.

## Deliver and verify

Match the user's requested output. For HTML, use the standard-library helper or adapt its bundled template:

```sh
python3 scripts/render_report.py /absolute/path/brief-and-candidates.json --output /absolute/path/report.html
```

The helper creates one offline-capable file with embedded local images, candidate-specific recent/representative strips, source links, search, category/priority/contact filters, and print support. It does not scrape websites or send messages. Paths to photos resolve relative to the input JSON. Keep the data and report in the user's authorized artifact directory.

Show candidate activity, source evidence, proposed recruitment angle, public contact route, outreach-history state, uncertainties and representative content. Label facts, fit judgments and unknowns distinctly. Use narrative text for requested message drafts; use comparable cards or rows for candidate lists.

Open the report in the selected browser. Verify candidate count, image identity/loading, source links, filters, empty results and reset path. Inspect desktop and narrow layouts when supported. If browser access is unavailable, deliver the saved file and state what remains unverified. Return a concise link and the material limitations; do not claim outreach or willingness that was not confirmed.
