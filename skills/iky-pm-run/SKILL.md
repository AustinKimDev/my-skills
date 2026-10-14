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
2. **Staff.** In Claude Code use Team mode below. Use the global company agents (see `iky-team-review/references/roster/`). Pick builders by the files they own: frontend-engineer, mobile-engineer, backend-engineer, data-engineer, qa-engineer, or the generic `builder`. One worker gets one to three related items. Never two workers on one file. Shared files (API definitions, types, manifests, lockfiles, build config, migrations, auth, global styles, entrypoints) stay with you.
3. **Brief** self-contained: task, model and effort (user's routing table), allowed files, success criteria, checks, output cap of ten lines, checkout path and branch. Workers decide no architecture, public API, dependency or auth boundary; they stop and report.
4. **Build, then verify yourself.** Review each diff for scope and run the typecheck, tests and lint. Exercise the changed behavior (screen, request). A worker's "done" is not evidence.
5. **Team review.** Call `iky-team-review` with roles you choose for this artifact; there is no fixed role-per-stage table. Use more roles for money, auth, data and launch, fewer for routine UI.
6. **Fix in one batch**, re-verify once. One retry per step: next attempt carries only the failure cause and check output; raise effort one level, then one model tier.
7. **Fire and hire.** Score workers per the roster rules; replace a failing role with a differently tempered persona.
8. **Report in Korean, then stop and wait for the user's answer.** Content: what was done, evidence (command tails, screens checked), team feedback and the decisions taken, open disputes, risks, what was not checked, proposed next stage. Do not begin the next stage, ship, or push before the reply. Carry earlier approvals forward; do not re-ask them.

## Team mode (agent teams)

Default staffing in Claude Code. You are the team lead; builders and reviewers are teammates, not one-shot subagents. Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (set in `~/.claude/settings.json`) and an interactive session. If teammates cannot be spawned, say so and fall back to named subagents with the same briefs.

- **When.** Use a team when a stage has two or more independent file-owned pieces (backend + frontend tracks, parallel screens) or a review that benefits from cross-reading. One small item, one file or a dependent chain stays in the main session or a single subagent; a team costs far more tokens.
- **Spawn.** Ask for each teammate by name, with its roster agent type (`frontend-engineer`, `backend-engineer`, `qa-engineer`, reviewers from `iky-team-review`), the model named in the spawn prompt (user's routing table; effort is inherited from the lead, a definition's `effort` applies to in-process teammates), and the stage brief. Teammates do not see this conversation or the pm-log; the spawn prompt is self-contained (task, allowed files, success criteria, checks, output cap, checkout path and branch). Name them predictably (`fe-onboarding`, `be-billing`, `qa-1`). Start with 3 to 5.
- **Tasks.** Put the stage's items in the shared task list, one to three related items per teammate, each with its owned files and its check command. Add dependencies instead of sequencing by hand. Never let two teammates own one file; shared files (API definitions, types, manifests, lockfiles, build config, migrations, auth, global styles, entrypoints) stay with you.
- **Lead discipline.** Wait for teammates to finish; do not implement their tasks yourself. Spawning teammates does not change the verification step: review each diff and run typecheck, tests and lint yourself, and nudge a teammate whose task status lags. Teammates cannot approve permission prompts or hard boundaries for you; a teammate that hits one stops and reports.
- **Review.** For `iky-team-review`, spawn the chosen roles as read-only teammates, let them message each other directly for the single cross-read, then write the thread file yourself. No extra debate rounds.
- **Continuity.** Teammates are not restored by `/resume`. Update `docs/team/pm-log.md` before each report and at the end of each stage; after a resume, spawn fresh teammates from it. Ask idle teammates to shut down by name when the stage closes (fire and hire counts here: replace a failing role with a new teammate).
- **Display.** Keep `in-process` (works in Orca); use `--teammate-mode auto` only inside tmux or iTerm2. Orca's branch and browser rules (§3, §7) bind every teammate: brief them to stay on the current branch and to use no browser tab but their own.
- **Cleanup.** Report which teammates ran and their rough cost; do not leave teammates running past the stage report.

## Hard boundaries

No pushes, dependency additions or upgrades, DB migrations, auth-boundary or public-contract changes without approval. Inside Orca never create, switch or delete branches or worktrees. Preserve user changes. Never claim a check you did not run.

## Close

When a pattern repeated (a brief shape, a checklist, a review routine), propose capturing it with `iky-skill-capture`. Update `docs/team/pm-log.md` before the final report.
