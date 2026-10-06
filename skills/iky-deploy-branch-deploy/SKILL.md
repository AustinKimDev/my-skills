---
name: iky-deploy-branch-deploy
description: "Use when a repository has a deploy integration branch and the user explicitly asks to sync it from main, integrate the current PR or branch into deploy, promote deploy to main and develop, then deploy and verify production."
---

# Deploy Branch Deploy

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides and resources are included in this folder; load only the relevant support and keep this workflow primary. Resolve a supporting guide's scripts and assets from its own directory. Runtime tools and project packages still come from the active environment.


The release is anchored to **one verified `deploy` SHA**. Push, PR merge, and production deployment require the user's explicit authorization for this task. Nearest repository instructions and deployment runbooks take precedence.

## Execution sequence

1. **Preflight**
   - Read repository instructions and deployment runbooks; inspect git status, remote branches, current branch/PR, GitHub authentication, and related open PRs.
   - Preserve user changes. Do not arbitrarily stash, reset, or check out files.
   - Fetch remotes and inspect ancestry and tree differences.
   - Classify the actual diff as JS/TS, native, server, DB, or infrastructure to select the deployment path.

2. **Finalize the current work**
   - Verify, commit, and push only in-scope files.
   - If the previous current PR is already merged and new commits exist, create a new PR; do not treat the merged PR as updated.

3. **Perform every integration through PRs**
   1. Merge a `main → deploy` PR to bring deploy up to current main history.
   2. Merge a PR from the current PR's head branch into deploy.
   3. Merge `deploy → main`.
   4. Merge `deploy → develop`.

   For each PR, inspect base/head SHAs, changed files, mergeability, and required checks; use the repository's existing merge strategy. Do not replay already included history. If trees match but GitHub allows a history-sync PR, merge it.

4. **Handle develop conflicts**
   - Do not force-merge a conflicting PR.
   - Create a sync branch from latest develop and replay/cherry-pick commits newly added only to deploy.
   - Resolve conflicts while preserving develop's ahead changes; run the same verification and create a replacement PR.
   - Once the replacement is ready, close the conflicting PR and leave a link to the replacement.

5. **Deploy the exact deploy SHA**
   - Apply the [bundled deployment workflow](embedded/iky-deploy/GUIDE.md) for preflight, execution and verification, retaining the exact SHA and authorized branch sequence below.
   - Reconfirm the deploy SHA in a clean checkout. If the current working folder is dirty, use an isolated temporary clone.
   - Pass lockfile-frozen installation and project preflight checks, then use only the repository's existing deployment commands.
   - Respect DB migration → server → client dependency order. Use OTA only for JS/TS-only changes compatible with the existing native runtime.

6. **Verify production**
   - Requery remote deploy/main/develop SHAs and merged PR states.
   - For OTA, verify per-platform update IDs, runtimeVersion, gitCommitHash, latest update listings, manifest HTTP 200, and expected update selection.
   - For servers, verify deployed SHA, health, process status, and recent logs. Do not report unverified behavior as complete.

## Stop conditions

- Missing push/merge/deployment authorization.
- Failed required checks, unresolved conflicts, or mismatched deployment SHA.
- Unclear deployment method or environment.
- Required but unapproved dependency, migration, public-contract, or authentication-boundary changes.

## Quick decisions

| Situation | Action |
|---|---|
| New commits on a branch whose prior PR was merged | New head → deploy PR |
| main/deploy trees match but history differs | main → deploy sync PR, or record ancestry evidence |
| deploy → develop conflicts | Replacement sync PR based on latest develop |
| User changes in the working folder | Preserve them and deploy from a clean clone |
| JS/TS-only changes with the same runtime | EAS Update/OTA |
| Changed native fingerprint | Request approval for a new store build |
