#!/usr/bin/env python3
"""Initialize a project IKY guide without replacing established authority."""

import argparse
import json
from pathlib import Path
import re
import sys


CANDIDATES = ("DESIGN.md", "IKY_GUIDE.md", ".ui-design/DESIGN.md", ".ui-design/iky-overrides.md", ".ui-design/iky-override.md")


def contained(root, value):
    if Path(value).is_absolute():
        raise ValueError("Use a project-relative path: " + value)
    candidate = root / value
    if candidate.is_symlink() and not candidate.exists():
        raise ValueError("Guide/source is a broken symlink: " + value)
    path = candidate.resolve()
    try:
        relative = path.relative_to(root)
    except ValueError:
        raise ValueError("Path must remain inside the project: " + value)
    return path, relative.as_posix()


def emit(status, **fields):
    print(json.dumps({"status": status, **fields}))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--project", required=True)
    parser.add_argument("--guide", help="Explicit project-relative authority path")
    parser.add_argument("--inheritance", choices=["all", "selective", "none"])
    parser.add_argument("--source", action="append", default=[], help="Project-relative authority file; repeatable")
    args = parser.parse_args()
    try:
        root = Path(args.project).expanduser().resolve()
        if not root.is_dir():
            raise ValueError("Project directory does not exist")
        value = args.guide
        if value is None:
            found = [v for v in CANDIDATES if (root / v).exists() or (root / v).is_symlink()]
            if len(found) > 1:
                emit("review_required", candidates=found, modified=False,
                     reason="Resolve current authority, then pass --guide; no files changed.")
                return 2
            value = found[0] if found else CANDIDATES[0]
        guide, guide_rel = contained(root, value)
        if guide.exists():
            if not guide.is_file():
                raise ValueError("Guide target exists but is not a file")
            emit("existing", path=str(guide), relative_path=guide_rel, modified=False)
            return 0
        sources = []
        for value in args.source:
            source, relative = contained(root, value)
            if not source.is_file():
                raise ValueError("Supplied authority source is not a file: " + value)
            sources.append("- `" + relative + "` — supplied source; decision authority requires inspection.")
        manifest = json.loads((Path(__file__).resolve().parents[1] / "references/manifest.json").read_text())
        version, digest = manifest["version"], manifest["contractHash"]
        if not isinstance(version, str) or not re.fullmatch(r"[0-9a-f]{64}", digest):
            raise ValueError("Bundled IKY manifest has invalid version/hash metadata")
        policy = args.inheritance or "Unspecified — establish the project's actual design authority."
        source_text = "\n".join(sources) or "No sources recorded yet; inspect existing project instructions, design documents and tokens."
        content = f"""# Project IKY guide

## Status and scope

Structurally initialized; project inspection and decision provenance are incomplete.
Supplied options record inputs, not proof of approval. Paths are project-root-relative.

IKY inheritance: {policy}
Project/app/package scope: Unspecified.
Platforms, appearances and relevant component domains: Unspecified.
For selective inheritance, name the inherited and excluded domains before applying defaults.
For no inheritance, use the independent project contract; do not fill gaps from IKY.

## Authority and implementation sources

Apply explicit user direction, then established project authority, then IKY only within inherited scope.
Link authoritative tokens, themes, shared components and decisions rather than copying their values.

{source_text}

## Reviewed baseline

Candidate bundled IKY version: `{version}`.
Candidate contract hash: `{digest}`.
Project adoption/pin: Unspecified; this initialization does not adopt or upgrade the candidate.
Visual/runtime verification: Unverified.

## Current project overrides

No overrides recorded yet; this is not confirmation that the project has none.
Only current, evidence-backed entries define replacements; proposals and implementation drift do not.

| ID / status | IKY rule, token or domain | Project requirement / source | Scope | Authority / date | Verification | Supersedes |
| --- | --- | --- | --- | --- | --- | --- |

Use stable IDs such as IKY-OVR-001 when adding a real decision. Keep detailed rationale and evidence
in the existing authoritative record and link it. Do not invent an approval or unstated rationale.

## Open decisions and history

Resolve project authority, inheritance and scope from actual evidence. Record remaining material
questions here, without treating unspecified values as accepted IKY defaults.
When decisions change, retain the prior source/evidence and identify the replacement explicitly.
Task briefs under `.ui-design/` link this guide; they do not create another current override ledger.
"""
        guide.parent.mkdir(parents=True, exist_ok=True)
        try:
            with guide.open("x", encoding="utf-8") as output:
                output.write(content)
        except FileExistsError:
            if not guide.is_file():
                raise ValueError("Guide target exists but is not a file")
            emit("existing", path=str(guide), relative_path=guide_rel, modified=False)
            return 0
        emit("created", path=str(guide), relative_path=guide_rel, decisions_verified=False)
        return 0
    except (ValueError, OSError, KeyError, TypeError) as error:
        emit("error", message=str(error))
        return 1


if __name__ == "__main__":
    sys.exit(main())
