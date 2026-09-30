#!/usr/bin/env python3
"""Create a missing project asset contract without replacing existing guidance."""

import argparse
import json
from pathlib import Path
import sys


def project_path(root, value, must_exist=False):
    path = (root / value).resolve()
    try:
        relative = path.relative_to(root)
    except ValueError:
        raise ValueError("Path must remain inside the project: " + value)
    if must_exist and not path.is_file():
        raise ValueError("Supplied source is not a file: " + value)
    return path, relative.as_posix()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--project", required=True)
    parser.add_argument("--guide", help="Project-relative guide path; defaults to root ASSET_GUIDE.md, reusing a legacy guide")
    parser.add_argument("--style")
    parser.add_argument("--palette-source")
    parser.add_argument("--reference", action="append", default=[])
    parser.add_argument("--text-mode", choices=["live", "hybrid", "complete-banner"])
    args = parser.parse_args()
    root = Path(args.project).expanduser().resolve()
    try:
        if not root.is_dir():
            raise ValueError("Project directory does not exist")
        guide_value = args.guide
        if guide_value is None:
            candidates = ["ASSET_GUIDE.md", "assets/ASSET_GUIDE.md"]
            existing = [value for value in candidates if (root / value).exists() or (root / value).is_symlink()]
            if len(existing) > 1:
                raise ValueError("Both root and legacy guides exist; resolve project authority and specify --guide")
            guide_value = existing[0] if existing else candidates[0]
        guide, guide_rel = project_path(root, guide_value)
        if guide.exists():
            if not guide.is_file():
                raise ValueError("Guide target exists but is not a file")
            print(json.dumps({"status": "existing", "path": str(guide), "modified": False}))
            return 0
        palette = "Unspecified; inspect the project's brand/theme authority."
        if args.palette_source:
            _, source = project_path(root, args.palette_source, must_exist=True)
            palette = "Project-relative source: `" + source + "`; palette relationship requires inspection."
        references = []
        for value in args.reference:
            _, relative = project_path(root, value, must_exist=True)
            references.append("- `" + relative + "` — role and visual inspection pending.")
        reference_text = "\n".join(references) or "Unspecified; select and inspect an actual image when style matching is needed."
        style = args.style or "Unspecified; derive from project references or a scoped user decision."
        text_mode = args.text_mode or "Unspecified; choose live, hybrid, or complete-banner for the intended content."
        content = f"""# Visual asset guide

## Status and authority

Initialized project contract; visual inspection and decision provenance are not yet verified.
Supplied fields are recorded inputs, not proof of user approval. Unspecified fields remain open.
Apply explicit user direction before established project settings and optional generic templates.
Paths in this document are relative to the project root unless stated otherwise.

## Scope

App-created decorative illustrations, campaign imagery and backgrounds for the requested product scope.
Preserve user photos, creator uploads, logos, store icons and functional icon systems unless their modification is requested.

## Style and visual language

Style family: {style}

Shape, proportions, outline and detail density: Unspecified; derive from inspected references.
Material/rendering, lighting and view: Unspecified; derive from inspected references.
Keep related objects coherent; scene composition can differ from isolated-object delivery.

## Color tone

{palette}

Dominant/supporting/accent roles: Unspecified.
Temperature, saturation and brightness relationships: Unspecified.
UI theme tokens remain authoritative for UI surfaces and controls; do not treat them as exact required illustration pixels.
Appearance-specific treatment: Unspecified; verify against actual light/dark placements.

## Visual references

{reference_text}

## Text treatment

Text mode: {text_mode}

Design copy and imagery together. Verify exact included lettering, especially Korean text.
Keep changing content live by default. Image lettering requires equivalent accessible content;
depicted actions require real controls. Verify small-size and enlarged-text behavior.

## Composition and delivery

Intended placements, logical sizes and required crops: Unspecified; resolve per asset task.
Use clean-alpha PNG for isolated cutouts and intentional opaque output for scene backgrounds.
Plan cutout-ready source; preserve sources and complete background removal, edge cleanup and optimization.
Match runtime formats and density to existing platform conventions; inspect actual-size derivatives.
Runtime destination: follow existing conventions, otherwise `assets/images/<feature>/`.
Version revisions before replacing referenced assets. Keep exact prompts and processing in one task record.

## Verification and decision provenance

Reference inspection: pending.
Style/palette/text decisions and their sources: pending.
Per asset, verify file metadata, style match, alpha or crop, copy, actual placement and accessibility.
Record performed checks and unverified targets separately; source metadata alone is not visual approval.
"""
        guide.parent.mkdir(parents=True, exist_ok=True)
        try:
            with guide.open("x", encoding="utf-8") as output:
                output.write(content)
        except FileExistsError:
            if not guide.is_file():
                raise ValueError("Guide target exists but is not a file")
            print(json.dumps({"status": "existing", "path": str(guide), "modified": False}))
            return 0
        print(json.dumps({"status": "created", "path": str(guide), "relative_path": guide_rel,
                          "decisions_verified": False}))
        return 0
    except (ValueError, OSError) as error:
        print(json.dumps({"status": "error", "message": str(error)}), file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
