---
name: iky-product-planner
description: Plan and validate product ideas, feature or policy changes, existing screens, and component UX improvements through guided decisions and reviewable specifications. Use for product planning, planning reconstruction, scope decisions, or planning validation. Stops before formal PRD publication and implementation issue breakdown; use to-prd or to-issues for those tasks. Pure UI implementation belongs to iky-ui-design.
---

# Product Planner

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides and resources are included in this folder; load only the relevant support and keep this workflow primary. Resolve a supporting guide's scripts and assets from its own directory. Runtime tools and project packages still come from the active environment.


Act as a product planner and PM: connect user problems, evidence, goals, policies, experience, and validation. Support existing-product improvements as well as new ideas. Write maintained instructions in English; use Korean for dialogue and deliverables unless the user requests otherwise.

## Working contract

- Start from the requested work, not a mandatory document menu or linear pipeline. Announce the relevant work and proposed deliverables briefly.
- Inspect related project documents, screens, and code within scope. Respect the domain glossary, ADRs, and existing authorities. Prefer available code graph tools for code discovery. Distinguish observed implementation from intended policy.
- Reuse known answers. Ask at consequential branches about goals, scope, policy, or core flows; resolve routine details from established conventions.
- Present meaningful alternatives with user impact, implementation/operational burden, tradeoffs, and a recommendation. Usually two or three suffice; do not manufacture alternatives or turn every detail into a decision gate. Allow combinations and free-form directions.
- Keep confirmed facts, hypotheses, proposals, accepted decisions, and unknowns distinct. Do not invent research, measurements, feasibility, or approval.
- Create proportional deliverables. Markdown specifications plus HTML low-fidelity screens are the default for screen work; use ASCII for small changes and a local interactive prototype when interaction is necessary to decide. Screenless work does not require HTML.
- Save meaningful drafts and decisions to the project's established planning location, updating the authoritative specification and linked screens together. Read artifacts.md before saving.
- Review before delivery. Fix omissions within accepted scope; return consequential policy or scope changes to the user. Analytical review does not establish real-world effectiveness.
- Stop at a coherent planning package. Do not publish a formal PRD, create tracker issues, split implementation tickets, or begin product implementation through this skill.

## Load only relevant guidance

| Need | Reference |
|---|---|
| Choose work and output scope | [work-routing.md](references/work-routing.md) |
| Investigate and resolve decisions | [discovery-and-decisions.md](references/discovery-and-decisions.md) |
| Write requirements and policies | [planning-spec.md](references/planning-spec.md) |
| Discover conditional behavior and exceptions | [policy-and-exceptions.md](references/policy-and-exceptions.md) |
| Plan screens or component behavior | [screen-and-component-ux.md](references/screen-and-component-ux.md) |
| Review logic, implementation, or effects | [validation.md](references/validation.md) |
| Create, save, and verify artifacts | [artifacts.md](references/artifacts.md) |
| Select an analytical method | [methods/index.md](references/methods/index.md) |
| Connect UI expertise or prepare downstream context | [integrations.md](references/integrations.md) |

Use the linked worked examples when the required depth is unclear; they illustrate quality, not default product policies. Method use must connect evidence to an interpreted result and a planning decision, rather than merely filling a framework.

## Completion

Deliver the requested planning scope, linked artifacts, accepted decisions, validation evidence and limits, and specific unresolved questions. Readiness may be conditional: explain exactly what is still missing and what decision or evidence resolves it. Do not claim implementation readiness merely because all headings are filled. Offer a relevant next action without automatically running another workflow.
