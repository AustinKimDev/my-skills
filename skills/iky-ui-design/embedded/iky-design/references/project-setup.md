# Project IKY guide, initialization and overrides

## Authority and location

The default new project record is **`DESIGN.md` at the project root** (explicit user naming decision, 2026-09-10; supersedes the initial `IKY_GUIDE.md` default). It owns the project's relationship to IKY and its continuing overrides. `.ui-design/` holds task briefs, explorations and verification evidence; it is not the default location for a second active override ledger.

First read the nearest project instructions and their linked design authority. Reuse an existing authoritative `DESIGN.md`, custom guide or `.ui-design/iky-overrides.md` when it already owns these decisions. Do not create competing rules merely to obtain the default filename. A project that explicitly uses another system or excludes IKY remains independent; invoking a supporting workflow or finding an old IKY file does not restore inheritance.

Precedence remains explicit user direction → established project authority → IKY defaults within inherited scope → optional references. The guide may link source tokens, themes, shared components and ADRs instead of repeating their values. Scope a monorepo guide to its named apps/packages; the nearest guide applies within that scope, without silently replacing parent policy elsewhere.

## `$iky-design init`

This is a conversational skill request, not an installed shell command. It initializes a project record; it does not restyle UI, install a component library, publish a package or upgrade a pinned baseline.

1. Resolve the requested project/worktree and read its authority. Do not assume the home directory, another checkout or a focused browser workspace is the requested project.
2. Locate any existing guide and override records, including the singular/plural legacy names `.ui-design/iky-override.md` and `.ui-design/iky-overrides.md`. Read their current/superseded status and links. A file's name does not establish its authority.
3. Reuse a current record. When none exists, create root `DESIGN.md` with the helper and populate it from actual project evidence. Record inherited scope (`all`, `selective`, or `none`), platforms/appearances, the reviewed baseline and links to implementation authority. Omitted or uninspected settings remain unspecified; initial structure is not a completed design decision.
4. Record any already established differences using the override format below. Follow prior user decisions without asking for approval again. Proposals remain proposals until the user selects them or delegates the choice; record that delegation when used.
5. Link the chosen guide from the relevant existing project `AGENTS.md`/`CLAUDE.md` and design brief when within setup scope. Keep that pointer short and do not duplicate the guide. If instructions explicitly exclude IKY, preserve that policy rather than adding a contradictory read-IKY requirement.
6. Report the authoritative path, inherited scope, recorded differences and unresolved decisions. Ask only about a material uncertainty that inspection cannot resolve. No full questionnaire or new visual exploration is required for known settings.

Run from the resolved skill directory:

```bash
python3 scripts/init_iky_guide.py --project /absolute/path/to/project
```

Optional arguments:

- `--guide docs/design/DESIGN.md`: an explicitly resolved project-relative authority path.
- `--inheritance all|selective|none`: a known project policy; the helper does not prove its approval.
- `--source path/to/theme.ts`: repeat for inspected project-relative authority files. The helper checks file existence, not their meaning.

The dependency-free helper creates only a missing guide. It preserves existing bytes and has no force-overwrite option. Without `--guide`, it detects root `DESIGN.md`, the prior `IKY_GUIDE.md`, `.ui-design/DESIGN.md` and the two legacy override filenames; multiple candidates return a non-writing `review_required` result. A single existing candidate is reused without modification, including an independent design contract. After inspection, resolve this with the appropriate `--guide`, not an automatic rename or merge. An existing record returns `existing`; supplied flags never update it implicitly. Paths must remain within the selected project, including symlink resolution.

The bundled manifest version/hash is recorded as the inspected candidate baseline, not as proof that the project adopted or visually passed it. Preserve an existing project pin on subsequent runs. Refresh a pin only within an authorized baseline update after reviewing applicable differences; never overwrite project overrides with the new defaults.

## `$iky-design override`

Treat this as recording or updating an explicit project decision in the same authoritative guide. A user can also request it in ordinary language. When the task also requests implementation, apply the authorized UI change and record its actual verification; writing the decision alone does not complete that task. Discover or initialize the guide as needed within the current task, then edit the scoped entry; do not create a new `.ui-design/iky-overrides.md` for each task.

Use a stable project-local ID, for example `IKY-OVR-001`. Every active entry records:

| Field | Required meaning |
| --- | --- |
| Status | Current, proposed or superseded; distinguish decisions from observed drift. |
| Target | IKY rule ID/token path or named design domain; never invent a rule ID. |
| Project requirement | The actual replacement requirement or a link to the existing source of truth. |
| Scope | Relevant app/package, platform, appearance, component/route and state; state deliberate exclusions. |
| Authority | User decision/date, existing project document, or explicit delegation and resulting rationale. Never invent approval or a reason the user did not give. |
| Verification | Performed checks and missing target/state evidence; visual agreement and accessibility/functional results stay separate. |
| Supersedes | Prior entry/source when replacing a decision; otherwise none recorded. |

Keep the active summary concise and link detailed records where necessary. If a code token already owns the value, link its symbol/path; do not maintain an independent copied palette. Scope a one-off exception to its feature/task rather than promoting it to a project default. An isolated implementation mismatch is a finding, not an authorized override. An override does not excuse unrelated accessibility or behavior defects, and a task description does not prove implementation or verification.

When a decision changes, update the active entry, mark the previous one superseded and retain its source/evidence. Do not leave contradictory entries both marked current. Portable IKY maintenance remains a separate scope from a project-specific decision.

## Existing `.ui-design` records and migration

Existing records can contain binding project decisions and historical evidence; they are not disposable temporary files. Prefer reuse when they remain authoritative. If the user requests canonicalization or migration, inspect links and copy the complete current decisions and provenance to the selected authority, preserving detailed exceptions. Convert the old file to a clear historical pointer (or retain its historical body with a superseded header), update known incoming links and verify them. Resolve relative links from their new location. Do not delete historical captures, silently drop decisions or merge conflicting records by timestamp alone.

When a project has moved away from IKY, retain the old override file as history and use its independent design contract. Do not create an IKY inheritance requirement as a side effect of cleanup.

## Review and audit

Read the project authority before judging IKY conformance. Check that current overrides have target/scope/authority and distinct verification status; follow linked token sources. Evaluate deliberate overrides against their project requirement and mark replaced IKY checks not applicable with the cited scope. Keep other accessibility, behavior and runtime checks active.

A missing guide by itself is not proof of a visual defect or authorization to migrate the project. Reconstruct established authority from existing instructions and evidence, report ambiguous ownership when it affects the verdict, and remain read-only unless changes are authorized. An `inheritance: none` policy makes IKY-default checks inapplicable; audit the actual selected project contract instead. Document integrity is not browser/native acceptance.
