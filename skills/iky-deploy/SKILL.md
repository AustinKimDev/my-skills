---
name: iky-deploy
description: Safely execute and verify project deployments by following the nearest repository instructions, project-native scripts, approval boundaries, and post-deploy checks. Use when the user asks to deploy, redeploy, publish, release, promote to staging or production, submit a mobile build, run an OTA update, or ship changes when shipping explicitly includes deployment.
---

# Deploy

Deploy only the requested surface and environment. Treat repository instructions and a more specific project deployment skill as authoritative.

## 1. Resolve scope and authority

1. Read the nearest `AGENTS.md` and any imported deployment instructions before running commands.
2. Identify the repository, environment, service or app, source revision, and deployment mechanism from existing documentation, configuration, CI, or scripts.
3. Treat an explicit deploy request as approval for the named deployment only. Do not infer approval to push, merge, migrate data, rotate secrets, submit to an app store, or deploy additional services unless the same request clearly includes it.
4. If multiple plausible targets or environments would change the outcome, stop and ask one concise question.
5. If a more specific installed skill matches the target, read and follow it while retaining these authorization boundaries.

## 2. Classify the artifact

Inspect the actual diff and runtime compatibility, not filenames alone.

- Web or service: identify the affected service, API, worker, database, environment, and infrastructure surfaces.
- Expo or React Native: distinguish OTA-compatible JavaScript, TypeScript, styles, and bundled assets from native runtime changes requiring a new store build.
- Mobile release: distinguish build creation, staged rollout, and store submission; each is a separate mutation unless the user authorizes the full chain.
- Mixed changes: list every required deployment and order dependencies before executing any of them.

Stop if the requested deployment cannot safely deliver the actual change.

## 3. Run preflight

1. Check the current branch, worktree cleanliness, source and remote revision, and divergence.
2. Respect the repository's PR and branch flow. Never locally merge when the project requires pull requests.
3. Run the smallest required checks that prove the deployable artifact is ready. Prefer existing project commands and CI results.
4. Confirm the deployment tool is authenticated without printing credential values.
5. Record the current deployed revision and health when discoverable so success and rollback can be evaluated.

Do not use force-push, destructive reset, implicit stash, broad cleanup, or secret-copying shortcuts. Do not use `rsync` unless the repository explicitly requires it.

## 4. Deploy

1. Use documented project scripts, provider commands, or CI workflows. Do not invent an undocumented production procedure.
2. Deploy one independently verifiable surface at a time in dependency order.
3. Capture the target, channel or environment, release identifier, and deployed revision from command output.
4. On failure, stop dependent steps. Follow an automatic rollback only when the project runbook explicitly defines it; otherwise report the failure and current production state before taking another mutation.

## 5. Verify production

Exercise the shipped behavior, not only the deployment command's exit code.

- Verify provider or pipeline completion and revision identity.
- Check the relevant process, container, function, OTA channel, build, or store status.
- Run documented health checks and a focused user-path smoke test.
- Check recent errors when an approved observability source is available.
- State any surface that could not be verified and never claim success from a partial check.

## Report

Return a compact Korean report containing:

- target and environment
- deployed revision or release identifier
- push, merge, migration, store-submission, and deployment actions actually performed
- preflight and production checks with their results
- skipped or failed checks and remaining risk
- rollback state or recovery path
- the repository-required deployment verdict and next action

Create a deployment report file only when the project already requires one or the user asks for it.
