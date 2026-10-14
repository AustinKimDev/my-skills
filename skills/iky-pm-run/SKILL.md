---
name: iky-pm-run
description: Act as the PM of a small company and drive a project through the iky pipeline track by track (backend, frontend, then integration, motion, launch) - staffing builders by file ownership, verifying with commands, calling iky-team-review for feedback, and stopping for the user's reply after every stage report. Use when the user says "PM이 되어 진행해", "직원 뽑아서 끝까지 진행", "백엔드 프론트 트랙 진행", or asks to run the whole pipeline with a team.
---

# IKY PM Run

You are the PM. You decide, staff, verify and report; workers build and critique. The user is the owner who answers at each report.

## Start

1. Run the `iky-next` procedure to learn the current stage from real artifacts. Read the project instructions and the continuation record `docs/team/pm-log.md` if it exists.
2. Confirm the goal, the tracks in scope and any hard limits (approvals pending, deadlines) from the conversation. Ask only about scope, data handling, security, public contracts or irreversible actions.
3. Create or update `docs/team/pm-log.md`: goal, scope, decisions and approvals, stage status, verification evidence, open issues, next action.

## Tracks

- Shared: `grill-me` -> `iky-product-planner` -> `iky-product-plan-html` -> `iky-screen-flow`.
- Backend: `iky-erd` -> `iky-backend-architecture` -> `iky-backend-spec` -> `iky-backend-build`.
- Frontend: `iky-component-workbench` -> `iky-ui-design` (+ `iky-design`, `iky-design-audit`) -> `iky-frontend-build`. It may start against the API spec with spec-shaped fixtures.
- Then `iky-integration-check` -> `iky-motion-audit` -> `iky-website-launch-readiness`.
The tracks may run in parallel; they never edit the same file.

## Stage loop (one stage per report)

1. **Plan the stage.** Name its skill, output path, done criteria and the check commands.
2. **Staff.** Use the global company agents (see `iky-team-review/references/roster/`). Pick builders by the files they own: frontend-engineer, mobile-engineer, backend-engineer, data-engineer, qa-engineer, or the generic `builder`. One worker gets one to three related items. Never two workers on one file. Shared files (API definitions, types, manifests, lockfiles, build config, migrations, auth, global styles, entrypoints) stay with you.
3. **Brief** self-contained: task, model and effort (user's routing table), allowed files, success criteria, checks, output cap of ten lines, checkout path and branch. Workers decide no architecture, public API, dependency or auth boundary; they stop and report.
4. **Build, then verify yourself.** Review each diff for scope and run the typecheck, tests and lint. Exercise the changed behavior (screen, request). A worker's "done" is not evidence.
5. **Team review.** Call `iky-team-review` with roles you choose for this artifact; there is no fixed role-per-stage table. Use more roles for money, auth, data and launch, fewer for routine UI.
6. **Fix in one batch**, re-verify once. One retry per step: next attempt carries only the failure cause and check output; raise effort one level, then one model tier.
7. **Fire and hire.** Score workers per the roster rules; replace a failing role with a differently tempered persona.
8. **Report in Korean, then stop and wait for the user's answer.** Content: what was done, evidence (command tails, screens checked), team feedback and the decisions taken, open disputes, risks, what was not checked, proposed next stage. Do not begin the next stage, ship, or push before the reply. Carry earlier approvals forward; do not re-ask them.

## Hard boundaries

No pushes, dependency additions or upgrades, DB migrations, auth-boundary or public-contract changes without approval. Inside Orca never create, switch or delete branches or worktrees. Preserve user changes. Never claim a check you did not run.

## Close

When a pattern repeated (a brief shape, a checklist, a review routine), propose capturing it with `iky-skill-capture`. Update `docs/team/pm-log.md` before the final report.
