---
name: iky-product-plan-html
description: Create and maintain readable product planning HTML documents from Markdown, with a sidebar, feature explanations, policy details, release scope, search and print. Use when the user requests a browser-readable product plan, a release-specific planning document, or this planning-document format as a reusable workflow.
---

# Product Plan HTML

## Bundled support

Read [the dependency map](references/dependencies.md) when a step calls for another skill. The required guides and resources are included in this folder; load only the relevant support and keep this workflow primary. Resolve a supporting guide's scripts and assets from its own directory. Runtime tools and project packages still come from the active environment.


Turn an established plan into a readable local document. The included shell follows a sidebar-and-sections reference: restrained neutral surfaces, one accent, descriptive feature blocks, expandable details, tables, search, themes, and print. Preserve a different reference or brand when the user selects one.

## Work from the current plan

- Use the current conversation, authoritative planning documents and verified tracker mapping. Preserve accepted decisions; label proposals, open questions, observed code and deployment evidence separately.
- For new unresolved product decisions, use the [bundled iky-product-planner](embedded/iky-product-planner/GUIDE.md) only when needed. Formatting a plan does not authorize new policies, implementation, tracker mutations, or publication.
- Explain each feature through its purpose, a concrete example, user flow, work scope, policies/exceptions and observable completion criteria. Keep technical investigation in a separate linked section when it obscures the user-facing explanation.
- Split requested releases by the verified feature IDs. Keep their shared policies consistent and link sibling documents. A moved feature keeps its identity; do not silently move similarly named but different products.
- Treat calendar dates as planning windows unless a launch commitment is explicit. Do not invent ownership, estimates, implementation status or tested capacity.

## Save and build

Use the established project planning directory. Each document normally contains `spec.md`, `page.json`, and generated `index.html`. Markdown owns the content; the JSON file owns presentation metadata. Edit those inputs and regenerate HTML rather than maintaining two independent bodies.

Read [the format reference](references/format.md) when authoring inputs. The deterministic renderer uses Python's standard library; no package installation or server is needed.

```sh
python3 /absolute/path/to/iky-product-plan-html/scripts/render.py \
  --source /absolute/path/to/spec.md \
  --config /absolute/path/to/page.json \
  --output /absolute/path/to/index.html
```

The output embeds its CSS and JavaScript, uses local system fonts, and loads no external scripts. Configured sibling/source links may point to other files or explicitly selected web sources. Reference typography can be adapted without copying large font payloads into every document.

## Review the actual result

- Run the renderer and inspect its reported feature and section IDs. Check local links and compare release IDs/counts against the source mapping.
- Open the generated HTML using the session's browser workflow and the [bundled runtime guide](embedded/browser-runtime/GUIDE.md). Inspect desktop and narrow width, long tables, dark mode, feature search, detail controls, keyboard navigation and print preparation. A successful renderer is not visual validation.
- Before printing, the document reveals filtered features and expands details; after printing it restores the reading state. Verify this when changing print behavior.
- Preserve old reference URLs when possible. A superseded document should clearly link to its current release documents rather than presenting stale scope as current.
- Deliver clickable absolute local links; browser `file:///...` addresses can be included when the user specifically needs addresses. Never claim a public URL or publish an artifact merely to make local opening convenient.

## Boundaries

This skill produces planning documents. It does not by itself create PRDs in an external tracker, create issues, send messages, deploy code, or certify implemented behavior. Perform separately authorized tracker updates through the selected tracker workflow and verify them by rereading.

Example request: “기존 기획서처럼 2.5는 방송·후원, 2.6은 팬하우스로 나눠 HTML로 만들어줘.” Preserve the supplied release mapping, write each plan, link them, render, and verify. Do not copy these example release policies into unrelated products.
