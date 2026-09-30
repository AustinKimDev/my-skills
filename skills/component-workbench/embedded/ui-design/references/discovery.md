# Guided discovery and decisions

## Understand the request

Read the request, existing code/screens, project documentation, and prior decisions. Establish users, context, primary action, content, brand constraints, platform, and allowed scope. Reuse existing answers. A clear small edit uses the direct implementation path.

## Dialogue and reference loop

Ask 1–3 focused questions at a time. Continue through answers, saved reference observations, and visual comparisons when decisions remain open. Do not impose a fixed number of interview rounds or approval gates. Use asynchronous questions when available and continue independent preparation; elapsed time is not an answer to a required question.

1. **Purpose and constraints:** identify the user, task, actual content, and confirmed constraints. Ask only what is missing.
2. **Reference evidence:** start with established project settings and relevant IKY rules/examples. Use [the bundled library](brands/index.md), its analysis, and local captures only when they add useful supporting evidence; a brand comparison is not mandatory. Compare 3–5 saved screen observations when useful; no fresh website visits or reference-count quota is required. Explain where the patterns fit or fail in this project. Research externally only under the library's targeted-research conditions.
3. **A recommendation inside the question:** offer concrete choices grounded in those observations. For example: “클래스를 고를 때 사진·날짜·가격·위치 중 무엇을 먼저 보나요? 일정이 정해진 사용자라면 날짜 우선 구성을 추천해요.”
4. **Overall directions:** present five alternatives (minimum four), a common comparison table, and recommendations. Ask about a specific decision, such as which information order to keep, rather than only “어때요?”.
5. **Detailed decisions:** summarize what stays, changes, and remains unresolved. Propose the next comparisons; hold already selected attributes fixed.
6. **Implementation:** proceed once purpose, primary action, content, and direction are concrete or the user delegates remaining design choices. Do not repeatedly request permission for already authorized work.

For page exploration, suggest 2–4 relevant detailed comparison types as next steps, such as layout, typography, key components, and interaction/states. Sequence the actual comparisons from user answers rather than generating every mode at once. For a narrow component request, compare that component's expression, states, sizes, and context without expanding into a whole page.

Useful question topics: the primary action and its frequency; what information users compare; content that is missing; existing brand elements to retain; target environments; and the current decision boundary. Avoid abstract labels such as “minimal / modern / premium” without concrete consequences.

## Creative synthesis

Begin with tensions specific to this task: speed versus discovery, simultaneous evidence versus focus, spatial versus linear work, or guidance versus expert control. Derive alternatives from different hypotheses, not from catalog slots or brand names. Mix patterns across references and propose an original composition when the problem warrants it. Explain the useful departure and how to evaluate it. Novelty should improve the task or expression; accessibility, truthful content, and confirmed constraints still apply.

## Optional generated image concepts

When a visual uncertainty would benefit from a rendered concept, offer image mockups as an optional reference step, explaining the decision they would clarify and the extra generation cost. Keep full-screen/component concept generation off unless the user explicitly selects it or has already authorized it for the current scope. This restriction concerns exploratory mockups, not illustrations, backgrounds or image-led cards needed by an authorized implementation; route those through [image-assets](../../image-assets/GUIDE.md). Do not make this offer a required question on every invocation, and do not block ordinary research or coded previews while an optional offer is unanswered.

Prefer GPT Image 2 through the available image-generation tool and its skill. Check the exposed model selection before promising that model; if selection or availability cannot be confirmed, say so before using a substitute. Continue with existing references and coded previews if the optional image step cannot run. Agree on a small batch, such as one or two selected concepts, within the user's requested budget; do not automatically render every alternative, upscale, or regenerate. Prior authorization covers the agreed batch, not an unlimited revision loop. The four-to-five direction policy governs design alternatives, not the number of paid image calls.

Base prompts on the actual task, content hierarchy, target viewport/orientation, confirmed project style, and IKY defaults for unspecified decisions; additional aesthetic references are subordinate to that contract. Generate **screen or component mockups for reference**, not just isolated decorative assets. Inspect the result with the user, then translate the selected composition, shadow softness, color falloff, and atmosphere into real UI. Preserve exact product copy, data, responsive behavior, and interactions in implementation; do not use a screenshot as the functional screen. Label generated concepts separately from observed service evidence: they cannot validate interaction, accessibility, or implementation feasibility. Record the prompt, image path, available model metadata, selected details, and intentional implementation departures in the existing brief.

## Direction cards

For each new comparison target, create **five alternatives by default, at least four**. Use fewer only when requested or narrowing existing choices. Do not silently lower the count for a small comparison; direct edits do not require comparison at all.

Each card contains:

1. **Name and problem:** a memorable Korean name and the user difficulty it addresses.
2. **Design hypothesis:** a testable expectation, not a promised outcome.
3. **Changes and constants:** what varies in hierarchy, layout, interaction, or type, and which content stays identical.
4. **Evidence:** a specific inspected screen, the pattern borrowed, and features intentionally not borrowed. Label uncertainty.
5. **Expected observation and tradeoff:** how to inspect the hypothesis and when this alternative is less suitable.

For a class listing, candidate hypotheses could lead to “사진으로 발견”, “일정부터 결정”, “조건을 나란히 비교”, “목록과 상세 동시 확인”, and “목적별로 좁히기”. Keep dates, prices, descriptions, and other relevant facts constant. These are an example, not reusable names for every project.

Avoid filler variants. A color comparison holds layout fixed; a layout comparison holds styling fixed. If several alternatives are indistinguishable in the requested mode, research and revise the hypotheses rather than just renaming them.

## Comparison criteria

First define **acceptance conditions** applicable to the scope: primary task completion, required content, keyboard/focus behavior, contrast, necessary states and recovery, usable target viewports, and confirmed user constraints. Fix failures; do not trade them against visual appeal. Mark untested conditions as unverified. The review workspace's 14px default is a workspace constraint, not a universal product font size.

Then choose **4–8 choice criteria** across relevant perspectives: task fit, information structure, visual expression, and interaction. For each criterion state what to observe, why it matters, and priority (high/normal). Select only criteria that can distinguish the alternatives.

| Decision | Candidate observations |
|---|---|
| Landing/page | Primary-action discoverability, competing actions, claim/evidence order, brand expression, visual rhythm |
| Service/dashboard/layout/wireframe | Search path, aligned comparisons, simultaneous information, density, section order, responsive transformation |
| Chat/prototype/states | Task steps, context retention, recovery route, progress visibility, interruption and return |
| Component | Action clarity, target size, state distinction, keyboard behavior, alignment, space in real context |
| Typography | Korean paragraph readability, heading/body hierarchy, long labels, number alignment, mixed-script rhythm |
| Color/assets/motion | Semantic roles, contrast, cropping/context, non-color cues, reduced-motion equivalents, feedback and interruption |

Accessibility/recovery items used as acceptance conditions are not optional tastes in the choice table. You may compare further differences in interaction after the minimum requirements pass.

Use the same content, viewport, and state across alternatives. Publish `comparison.criteria`, `comparison.assessments`, and `comparison.recommendations` in the subject manifest, using [the schema](preview.md#comparison-data). The viewer renders criteria as rows and actual variant names as columns, recording **difference, evidence, and tradeoff**. Keep the browser table and conversation consistent; the viewer does not invent judgments or scores. Separate tables for different decisions, such as page direction versus typography. Show measured values with method and conditions; identify untested predictions as hypotheses. Never invent conversion uplift, task time, or numerical design scores.

Provide **multiple recommendations**: one overall choice with reasons; 2–3 criterion-specific recommendations (e.g. fast comparison, brand expression, long content); one useful hybrid when appropriate, including integration risks; and the next detailed comparison. Several criteria may favor the same variant. Do not invent a different winner for each criterion just to spread recommendations around.

## Transition and record

Move from dialogue to low-cost comparison, then develop the chosen direction at higher fidelity and test relevant flows. Do not force wireframes before every task. Keep previewing a variant, selecting a direction, and leaving feedback distinct. A mixed direction becomes a new revision, not an overwrite of its parents.

Record work path, questions/answers, purpose, environment, optional pattern hints, modes, agreed paths, acceptance conditions, choice criteria, evidence, decisions and reasons, unresolved questions, next comparisons, and archive paths in `.ui-design/brief.md`. User preferences are project facts, not universal design laws.
