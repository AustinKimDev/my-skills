# Overview board: connected screens and state coverage

## Purpose and when to use

Use this reusable review approach without imposing a product layout, role count, palette or port. Keep project-specific boards, screenshots and private provenance in that project's review directory.

Use an overview board when multiple personas, independent capabilities, related screens or conditional states are difficult to inspect one at a time. Show the same selected design direction across representative contexts. The existing workbench compares directions and stores selections/feedback; the overview explains coverage and connects the screens. A small component correction does not require a new board.

## Composition recipe

| Region | Purpose and useful contents |
| --- | --- |
| Header | Project/revision, short design thesis, actual scope and a link to the direction/feedback workbench |
| Section navigation | Jump links to screen overview, proposed information architecture, connected screens and conditions |
| Direction controls | Named alternatives with concise differences, the selected direction's tradeoff and a reasoned recommendation |
| Shared inspection controls | Relevant screen, appearance and data-state controls; optional independent capability/status controls |
| Parallel screen frames | Representative personas/states, each labeled with its meaning and a link to inspect at actual size |
| Information architecture | Proposed menu/feature groups plus a current → proposed → reason table where useful |
| Connected-screen directory | Working links grouped by user purpose; distinguish full prototypes, connection specimens and unimplemented destinations |
| Conditions matrix | Visibility/eligibility by actual role, capability or state, with links to important combinations and recovery paths |
| Scope footer | Prototype/implementation/verification status and limits, without implying deployment or production authorization |

Include only regions that help the current review. User roles are one possible comparison axis; account stages, plans, device contexts or a connected journey can be more useful. The source's six personas and five directions are example coverage, not a new universal quota. Apply the parent workflow's alternative-count rule only to design alternatives, not to role/state columns.

Keep the review shell subordinate to the product frames. Follow [the workbench's established styling and controls](preview.md#define-a-comparison), retaining independent product themes inside the frames. The source includes native select controls for secondary conditions; that is an observed implementation detail, not an override of the current workbench's no-select guidance. Use its accessible named controls when adapting the pattern.

## Interaction contract

- Keep design direction, user context, screen, theme and data state as independent axes. Account role must not silently imply an independently assigned capability or verification status. Use representative fixtures and explicit overrides, not invented permission rules.
- A shared change updates the relevant frames together. Build frame URLs and all “open larger”/directory links from the same current state so links do not open a different direction or theme. Preserve relevant originating state during navigation and return paths.
- Support **fit overview** and **actual size**. Fit mode scales width and height by the same factor; it helps compare structure, not certify text legibility. Actual-size mode preserves the intended logical viewport and allows horizontal scrolling or a focused frame. Do not stretch portrait previews across a desktop column or crop away bottom content.
- Derive dimensions from the target platform. The source uses 390 × 844 mobile frames; this is an example, not a desktop or tablet default. Keep descriptive labels outside scaled frames. On narrow review screens, retain access to original-size inspection rather than forcing all columns into unreadable thumbnails.
- Use one screen renderer and a shared scenario/route catalog for the board and workbench. Query parameters can initialize context; validated same-origin messages can synchronize supported in-frame state. Do not claim controls work unless the receiving screen implements them. Keep actual data mutations local in a prototype.
- Mark a previewed direction separately from an explicitly saved design choice. Link to the existing workbench's selection and feedback flow unless a properly integrated equivalent is in scope; do not silently create a second decision store.
- Label mutually exclusive states shown together as review specimens. Missing/loading/error must stay distinct from confirmed empty, denied or successful results. A condition matrix documents intended behavior; fixture rendering does not establish server authorization.
- Support keyboard operation, visible focus, selected-state semantics, iframe titles and meaningful link names. The observation of an attractive board is not an accessibility pass.

## Authoring and reopening

Author a supplemental page in the existing task review directory; this is a recipe, not an `overview` generator command or a required new dependency:

```text
.ui-design/<task>/review/
  manifest.json          # Existing workbench subjects and alternatives
  overview.html          # Authored overview board
  screen.html           # Existing reusable screen specimen, or its equivalent
  data.js               # Shared scenarios/routes/directions, if the stack uses it
  screen.js / screen.css
```

Those filenames except the documented `overview.html` route are illustrative. Reuse the project's actual screen/data modules. Do not create duplicate prototype implementations just to match this tree.

Use the normal `preview.mjs check` and `serve` workflow in [preview.md](preview.md). Reuse a running server only for the confirmed same review root; otherwise follow the port policy and open the URL returned by the actual server. The workbench is at `/`, and a root `overview.html` is served at `/preview/overview.html`. Do not create a redundant `preview/` directory or hardcode port 4324 into reusable instructions.

Include both workbench and overview links in the task's existing brief when they serve different review needs. Before replacing alternatives or shared files, apply [revision history](preview.md#revision-history) so the overview, dependencies, fixtures and decision evidence remain consistent. A live URL or screenshot alone is not a replayable interactive archive.

## Scoped verification

Verify shared controls update frames and links consistently; fit/actual-size geometry; frame scrolling; accessible controls; meaningful condition combinations; connected navigation and return paths. Test required light/dark/system behavior and narrow layouts. Inspect text at actual size, not only in scaled screenshots. The manifest checker is not proof that an authored overview's controls or every destination work. Distinguish implemented, connection-only, untested and out-of-scope screens in the directory and report.

For native products, this board is an HTML review surface. Simulator/device verification remains separate. Showing many linked destinations does not mean all those production screens have been implemented.

## Public example boundary

This distribution preserves the composition recipe and interaction contract. Project-specific overview screenshots, source paths and task evidence are not bundled. Build the board from the current project's renderer and scenario catalog; do not imply that a saved source screenshot demonstrates the current implementation.

The reusable workbench assets and its example manifest remain available in this skill. An authored overview is a separate review surface, not an automatically generated or preverified product screen.
