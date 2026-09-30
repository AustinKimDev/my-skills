# Maintaining standalone skill bundles

The 15 owned skills remain the only top-level installable entries. Their live discovery links point to `skills/<name>/`. This repository's dependency manifest is the authority for bundled support, not an instruction to run every connected workflow.

## Sources and generated files

- Edit owned guidance, scripts and assets in `skills/<name>/`, excluding `embedded/` and `references/dependencies.md`.
- Edit portable runtime integration guides in `resources/`. They must not claim to supply tools, credentials or packages.
- `vendor/skills/` holds selected third-party snapshots with licenses. `vendor/sources.json` records upstream locations, license evidence and imported file hashes. Existing local adaptations are identified as such, not represented as a pristine upstream checkout. Preserve those records when making a new snapshot; record subsequent adaptations explicitly.
- Define direct dependencies and their task-specific loading conditions in `skill-dependencies.json`. Artifact inputs, excluded workflows and later handoffs are not automatically runtime dependencies.
- Run `python3 scripts/bundle_skills.py build`, then `python3 scripts/bundle_skills.py check`. Generated `GUIDE.md` entrypoints omit discovery metadata, preserve the body and point at local resources. The builder translates Markdown links, creates a flat transitive closure, copies licenses and source records, and records source/output hashes in each `embedded/.bundle.json`.

Never edit a generated copy as its own source. The builder rejects changed generated files and unknown files instead of silently overwriting them. If such a change is intentional, preserve it outside the generated directory, reconcile it into the canonical source, restore the generated file to its recorded revision, and rebuild. Do not remove the guard or replace an entire skill folder to bypass it.

## Verification

Run `python3 -m unittest discover -s scripts -p 'test_*.py'` for packaging changes. The tests exercise transitive and cyclic dependencies, moving a standalone folder, executing its helper with local assets, source-update propagation, removal of obsolete managed files, preservation of local changes, and rejection of undeclared dependencies and unsafe paths.

For new connections, check the resulting skill in a temporary location without sibling skill installations. Confirm that only its root `SKILL.md` remains discoverable, local links stay inside the folder, and the affected helpers use bundled assets. Run existing relevant helper tests after changes to those helpers or their packaging. The bundle check is not a rendered UI audit, a live browser test, a successful image-generation call, or production deployment evidence.

Validate owned skill metadata with the available skill-creator validator when present. Preserve invocation policy and project/user authority. Optional expertise remains conditional; loading a dependency does not authorize installations, subagents, deployment, remote pushes, or external communication.

Keep the public repository free of private project provenance and credential values. Preserve independent public/private histories and their existing visibility. Publishing requires the user's applicable authorization.
