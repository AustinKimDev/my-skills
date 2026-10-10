# Project asset contract and initialization

## One project-owned file

Create `ASSET_GUIDE.md` at the project root by default, following the [current location decision](../GUIDE.md#project-setup-and-init). Keep runtime images under `assets/images/` or the project's established equivalent. First inspect project instructions and known design documents to locate an existing authoritative asset contract. If it is already in `assets/ASSET_GUIDE.md`, `DESIGN.md`, another explicit path or a linked document, keep that location. A pointer is preferable to duplicate rules. Preserve the existing guide's full tables, reference links and exceptions.

The portable skill supplies process and optional recipes. The project file supplies decisions:

| Project setting | Content |
| --- | --- |
| Scope and precedence | Which images the guide governs; explicit task overrides; excluded user media/logos/icons |
| Style family | Chosen recipe or a custom visual contract; allowed differences between object and scene assets |
| Palette | Dominant/supporting/accent roles, color temperature, saturation and tone; references to project brand/theme sources |
| Shape and rendering | Silhouette, proportions, material, outline, detail density, lighting and view |
| Visual anchors | Actual image paths, style/composition/identity roles, inspected versions and dates |
| Text modes | Live, hybrid or complete-banner default and exceptions; exact-copy and accessibility requirements |
| Delivery | Typical placements, alpha/opaque behavior, ratios/crops, formats, density and repository destination |
| Evidence and open decisions | Source for each decision, scoped overrides and unresolved choices |

Do not copy every UI hex token into the illustration guide. Link the authoritative theme/token file and explain the intended relationship, for example warmer/lower-saturation promotional accents. Exact illustration hex values are optional project decisions, not an automatic conversion from brand color. Distinguish current UI surface colors from art palette roles. Dark/light UI may share one illustration or need separate art treatments; decide from actual placement.

## `$iky-image-assets init` flow

1. Resolve the requested project root and existing contract from the current workspace, project instructions and design files. This is setup, not permission to change another checkout.
2. If a guide exists, read it and return its path with only material missing decisions. Preserve it; do not reinitialize or replace detailed rules with a generic template.
3. Otherwise inspect available brand/theme settings and candidate reference images. Use project authority over a generic recipe. Infer only justified decisions and label proposals separately from user decisions.
4. Create the default file with the helper below, passing known fields. Populate additional sections with evidence from the project. `Unspecified` is a real unknown, not a style preference or successful setup value. A minimal guide can be structurally initialized while still having open design decisions.
5. If choices that affect imminent generation remain, ask a focused question about those choices only. When the user delegates design, make a justified choice and record that delegation. Do not block unrelated UI work or ask for facts already in the project.
6. Link the authoritative path from an existing UI brief or suitable project instructions when helpful and within the setup scope. Report the guide path, established settings and open decisions. Do not generate samples unless requested or needed by an authorized implementation.

The initializer is intentionally non-destructive and dependency-free. Without `--guide`, it reuses an existing root `ASSET_GUIDE.md` or legacy `assets/ASSET_GUIDE.md`, or creates the root file when neither exists. If both exist, resolve project authority and supply `--guide` explicitly; do not silently pick or merge conflicting contracts. It creates only a missing guide and required parent directories. Existing files return `existing` without modification. For later edits, update the authoritative guide normally with scoped changes; there is no force-overwrite flag.

Run from the skill's resolved directory, replacing the example project and selecting only known fields:

```bash
python3 scripts/init_asset_guide.py --project /absolute/path/to/project
```

Optional fields: `--guide` for a project-relative authoritative path, `--style` for an already chosen style, `--palette-source` for a project-relative token/design document, repeated `--reference` image paths, and `--text-mode live|hybrid|complete-banner`. Omitted settings stay explicitly unspecified. Relative paths are resolved within the project; the helper rejects missing supplied sources and paths outside it. It does not visually inspect a reference, certify a palette, or install anything.

For example, if the user has already chosen soft 3D and hybrid text and the listed files really exist:

```bash
python3 scripts/init_asset_guide.py --project /absolute/path/to/project \
  --style soft-toy-3d --palette-source docs/brand.md \
  --reference assets/images/reward-reference.png --text-mode hybrid
```

This command records supplied choices, not proof of approval or visual inspection. Add their actual provenance while completing the guide. A custom style name is valid; the template catalog is not a whitelist.

## Ongoing use

Read the project guide before selecting a generic style recipe. When a task explicitly overrides color, material or lettering, record the override at that task's scope; update the project default only when the user intends a continuing change. Retain one current authoritative decision and link earlier superseded guidance. Do not silently synchronize one project's taste into other projects or the portable templates.
