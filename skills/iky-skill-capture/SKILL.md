---
name: iky-skill-capture
description: Turn a repeated or just-demonstrated way of working (a standing instruction pattern, a multi-agent routine, a checklist) into an iky-* skill in the personal skills repository, avoid duplicating existing skills, register it for discovery, update the repository docs, run its checks and commit locally. Use when the user says "이걸 스킬로 만들어", "반복되는 작업이니까 스킬화", "스킬 만들고 깃헙 업데이트", or when iky-pm-run notices a repeated pattern.
---

# IKY Skill Capture

Capture a working method as a skill, once, with the repository kept consistent.

## Steps

1. **Define the method.** From the conversation, write what triggers it, the steps the user actually asked for, the boundaries they set, and what evidence closes it. Use the user's real instructions, not generic advice.
2. **Check for overlap.** List `~/.agents/skills/iky-*` and the repo table in `~/Workspace/my-skills/README.md`. Extend an existing skill when the method fits it; create a new one only for a distinct trigger. Also check built-in and plugin skills the user names.
3. **Draft** `~/Workspace/my-skills/skills/iky-<name>/SKILL.md`: front matter `name` (must start with `iky-`) and a `description` that says what it does plus concrete trigger phrases (Korean and English). Write the body in English, short and imperative; user-facing output in Korean. Keep it under about 150 lines; move bulk to `references/`. Add `agents/openai.yaml` like sibling skills. Never include private paths, accounts or credentials.
4. **Register.** Run `python3 ~/.agents/scripts/sync-shared-skills.py` and then `--check`. Do not make per-harness copies.
5. **Update the repository.** In `~/Workspace/my-skills`: add the skill to the README table and the stated count, add a dated line under the scope notes, update `CONTRIBUTING.md` counts, and declare direct dependencies in `skill-dependencies.json` only when the skill truly loads support skills. Then run `python3 scripts/bundle_skills.py build`, `python3 scripts/bundle_skills.py check` and `python3 -m unittest discover -s scripts -p 'test_*.py'`.
6. **Validate** the front matter with the skill-creator validator if present, and read the skill once as a fresh agent would: can it run without this conversation?
7. **Commit locally** with a clear message. **Never push without the user's approval**; ask, naming what will be published.
8. **Report in Korean**: skill name, trigger, files changed, checks run with results, push status. Wait for the user's reply.
