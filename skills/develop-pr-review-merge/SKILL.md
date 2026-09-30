---
name: develop-pr-review-merge
description: "Complete the develop PR workflow in repositories that use a develop integration branch: create or update the PR, review and fix findings until re-review is clear, merge, then provide a Korean summary and an HTML change report opened in Orca Browser. Use when the user requests this end-to-end workflow; requests to register or edit this skill do not execute it."
---

# Develop PR, review, merge, and report

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides and resources are included in this folder; load only the relevant support and keep this workflow primary. Resolve a supporting guide's scripts and assets from its own directory. Runtime tools and project packages still come from the active environment.


## Scope and authorization

This is a user-level skill for use across repositories. Resolve repository-specific checks, integration rules, deployment requirements, and artifact locations from the current project. If `develop` is absent or conflicts with the project's required target, clarify the integration target before pushing or merging; do not create `develop` or silently substitute a release branch.

Treat a request to run this complete workflow as authorization to push the task branch, create/update its PR, fix in-scope review findings, and merge that PR into `develop` once the conditions below are met. Carry this authorization through review iterations; do not ask again for the same actions. A narrower request, such as review-only, authorizes only that scope.

Skill discovery, installation, or editing alone does not authorize execution. Do not deploy, release to `main`, upgrade dependencies, change public contracts, migrate data, or change authentication boundaries under this workflow's merge authorization. Follow the repository's existing approval rules if a finding requires one of those actions. Complete independent authorized work while the specific decision is pending.

Follow the nearest `AGENTS.md` and its required rule files. Reuse an existing managed task worktree when available; otherwise follow the current project's worktree rules. Preserve unrelated user changes and stage only task files. Do not spawn subagents unless the user has authorized delegation. Identify self-review honestly; never present it as independent approval.

## 1. Establish the exact change

- Inspect the branch, working tree, remote, existing PR, and latest `develop`. Identify intended files and preserve unrelated modifications.
- Reuse the task's open PR when appropriate. If it is already merged and there are no new requested changes, verify that state and finish any missing report instead of creating a duplicate PR. New work after a squash merge needs a clean branch based on current `develop`, without replaying the old feature history.
- Review the actual base-to-head diff. Run applicable repository checks and targeted validation. Preserve before/after evidence where useful; distinguish real data, fixtures, and intermediate design drafts.
- Create or update a PR targeting `develop`. Describe the final problem, behavior, validation, and deployment impact. Write multiline GitHub bodies to a file and use `--body-file`, or use structured tool arguments.

## 2. Review, fix, and re-review

Review the implementation and available PR comments/checks against the user's intended outcome. Cover correctness, relevant regressions, error/loading/empty states, consequential data or authorization behavior, and maintainability. For UI changes, also check relevant responsive layouts, accessibility, actual rendered appearance, and connected actions using the selected design workflow.

Maintain a concise review record with round, finding, evidence/location, resolution, and validation. Keep it in a PR body/comment or a task artifact; do not add boilerplate source files for every run.

For each round:

1. Read current findings and check results. Confirm findings against the code; explain false positives with evidence instead of mechanically implementing them.
2. Fix actionable in-scope issues. Run targeted checks for those fixes and required repository checks.
3. Review the updated diff again, including interactions between fixes. Update the PR and review record.
4. Repeat while actionable findings remain. A clean round means no unresolved actionable findings in the reviewed scope, not a guarantee of bug-free software.

Do not manufacture findings or keep polishing after the scoped checks pass. Do not silently waive failures to reach zero. Separate pre-existing failures from introduced failures using evidence; a full check with baseline failures is not a passing check. Document remaining untested platform/transaction paths.

If progress requires missing authorization, credentials, unavailable infrastructure, or an unresolved product decision, report that exact blocker and leave the PR unmerged. Do not use an arbitrary iteration limit as permission to merge. If new edits or a changed PR head invalidate review, re-review the affected scope before merging.

## 3. Merge the reviewed revision

- Confirm the PR still targets `develop`, is mergeable, has no unresolved actionable review findings, and satisfies required CI and approval rules. Never bypass branch protections or manufacture an approval.
- Resolve integration conflicts within scope. Prefer a rebase when appropriate; preserve local changes first. For a rewritten task branch, use an explicit `--force-with-lease` tied to the observed remote SHA, never an unconditional force push.
- Merge through GitHub using the repository's supported strategy and match the reviewed head SHA (for example, `gh pr merge <number> --squash --match-head-commit <sha>` when squash is supported). Do not merge locally.
- Verify the final PR state, target branch, merge commit, and merge time. Report a failed or blocked merge as such; do not label the report merged in advance.

## 4. Create and open the change report

Produce a concise, attractive Korean HTML report and a short Korean chat summary. Scale the report to the change; avoid a tall generic template.

The HTML must include:

- Actual PR/merge status, PR link, target branch, and verified merge hash/time.
- What changed and why. Use comparable before/after screenshots for visual changes, or focused examples/diagrams for behavioral changes. Label sample data and intermediate drafts accurately; do not call an intermediate draft the previous production screen.
- Review findings and their resolutions, final review scope, checks actually run, baseline failures, and untested or blocked paths.
- A `Deployment` verdict with evidence and required next action, following the repository's runtime-compatibility rules. If the project has no reporting convention, identify the actual affected artifacts (web app, server, mobile OTA, or native store build), or report `No deployment` for documentation/tests/tooling-only changes. State compatibility uncertainty explicitly. A merge is not a deployment.

Use a standalone HTML artifact in a stable, reopenable location, with embedded images or reliable relative assets and no unnecessary dependencies. Include interactive comparisons only when they clarify the change; make controls keyboard-accessible and verify their state changes. Keep unrelated private data out of captures and report content.

Use the [bundled browser runtime guide](embedded/browser-runtime/GUIDE.md) for opening the report in Orca's embedded browser. Read the executable's version-matched CLI guide, navigate/create the intended tab, activate it, and verify content, image loading, layout, and controls. Use file URLs when supported; otherwise use a local server following the project's port rules. Do not substitute desktop computer-use or another browser for the requested Orca report. For application QA, retain the user's selected browser/tool (such as Aside Browser MCP).

Inspect a screenshot when available. If capture fails, report that limit honestly and verify what is possible through the browser snapshot/DOM; do not claim visual screenshot verification. If Orca is unavailable, provide the saved HTML path and the exact opening failure.

Finish with the key changes, review/merge result, material validation limits, clickable PR and HTML links, and the deployment verdict. State whether deployment was executed. Do not execute OTA, store, or server deployment without separate authorization.
