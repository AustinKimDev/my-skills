# Style templates

Choose art direction separately from output shape. A 3D subject can be a transparent object or live in an opaque scene; an anime scene can be a background or a narrative panel. Use project references before a template. These recipes are recommendations based on visual and placement needs, not claims about conversion or current trends.

## Selection guide

| Recipe | Useful when | Main tradeoff |
| --- | --- | --- |
| Soft toy 3D | Friendly rewards, memberships, promotional objects | Surface detail and floating accents can disappear in tiny placements |
| Flat 2D | Clear onboarding, empty states, scalable visual families | Simple geometric work may be better authored as SVG |
| Editorial 2D | Warm stories, explainers, community or editorial covers | Grain and expressive shapes need restraint near UI copy |
| Anime / cel illustration | Character-led stories, entertainment, illustrated worlds | Character consistency and small-size facial readability require reference checks |
| Isometric 3D | Spatial systems, feature ecosystems, object groups | Perspective can confuse hierarchy; avoid it for precise data diagrams |
| Natural photography | Lifestyle context or an explicitly photographic brief | Generated scenes cannot establish real customer/product evidence |
| Abstract atmosphere | Decorative hero backgrounds, themes and ambient surfaces | Easily competes with text; simple gradients often belong in code |
| Pixel art | Deliberately retro games, collectibles and themed products | Native pixel grid constrains scale and crop choices |

For a new collection, recommend one suitable recipe with its reason. Use a second recipe only for a concrete complementary role, such as a scene background sharing a 3D object's material. If the user explicitly asks to compare styles, follow the parent workflow's comparison scope; do not infer permission to generate all eight.

## Collection style lock

Keep one project-local record, or link to the project's existing equivalent. Include only relevant fields:

- Scope: which app-created images this contract governs, and which media retain their own identity.
- Anchor: inspected reference path/version and date; distinguish style from copied subject/composition.
- Shape: proportions, silhouette, line/edge treatment, detail density and recurring motifs.
- Material/rendering: flat fills, paper, cel shading, soft gloss, photographic texture or pixel grid.
- Lighting/view: direction, softness, camera angle, perspective and depth of field where relevant.
- Palette: dominant/supporting/accent roles and contrast relationships; UI theme colors stay separately authoritative.
- Collection consistency: visual weight, subject scale, margin, shadow treatment and crop behavior.
- Delivery constraints: intended placements, alpha versus opaque scene, text-safe zones and output rules.

Fix observed source defects rather than treating every pixel as a style requirement. Do not convert a one-task override into a global preference. Add new styles by recording their visual contract and one inspected reference; no registration ceremony is needed.

## Prompt recipes

Combine one recipe with the shared prompt in [deliverables](deliverables.md#shared-prompt). Braced fields are authoring slots: fill or remove them before calling a generator. Prefer concrete visual attributes to vague adjectives or an artist name alone. For selected [hybrid lettering or complete banners](text-in-images.md), replace applicable no-text/no-lettering constraints below with exact-copy instructions; do not combine conflicting prompts.

### Soft toy 3D

```text
Style/medium: rounded, puffy 3D toy illustration with a strong simple silhouette.
Material: smooth softly glossy surfaces, broad soft highlights and gentle shading;
no chalky clay, gritty texture, chrome or mirror reflections.
Lighting/view: consistent soft studio light from above/front; front or gentle
three-quarter view matching {reference}; friendly proportions.
Palette: {dominant}, {supporting}, restrained {accent}.
Detail: one main subject; only meaningfully related supporting accents.
```

Inspect [the optional soft-toy reference](soft-toy-reference.md) when the project selects this family. A project's 3D may intentionally be matte or angular; this template does not override its contract.

### Flat 2D

```text
Style/medium: flat 2D illustration, simplified geometric silhouettes, clean opaque
edges, solid color regions and {no outlines / consistent outline treatment}.
Palette: {project palette roles}; strong separation between adjacent forms.
Composition: clearly separated subjects with generous negative space.
Constraints: no accidental 3D gloss, tiny ornamental strokes or pseudo-text.
```

Use deterministic SVG for simple editable shapes or an existing vector family. A generated PNG is raster, even when its appearance is vector-like; never claim it is editable vector artwork.

### Editorial 2D

```text
Style/medium: expressive editorial illustration with {cut-paper / gouache / ink}
forms, {specified edge treatment}, restrained texture inside major color shapes.
Narrative: communicate {specific idea} using {requested subjects}.
Palette/mood: {palette roles}, {desired emotional tone}.
Constraints: texture remains subordinate at {display size}; preserve the planned
quiet area for live UI copy; no incidental lettering.
```

Keep paper texture inside the subject for cutouts. Textured scene backgrounds remain opaque; do not confuse paper color with transparency.

### Anime / cel illustration

```text
Style/medium: anime-inspired 2D illustration with clean controlled linework,
readable cel-shaded color planes, {specified proportions} and {palette roles}.
Subject/action: {character or environment and requested action}.
Identity references: {reference roles and traits to preserve, when applicable}.
Lighting/view: {direction and camera framing}, consistent across the set.
Constraints: coherent anatomy, clothing and accessories; no unwanted characters,
speech bubbles or text; prioritize expression and silhouette at {display size}.
```

For a continuing character, lock face, hair, costume, proportions and distinguishing features to a reference. Do not invent a mascot for a product merely because this template is available.

### Isometric 3D

```text
Style/medium: simplified isometric 3D illustration with a consistent orthographic
three-quarter camera, {material}, soft directional light and clean object spacing.
Subject relationships: {requested objects and their meaningful relationships}.
Palette: {dominant/supporting/accent}; consistent scale and visual weight.
Constraints: no conflicting vanishing points, unreadable pseudo-labels or
unrequested miniature scenery.
```

For precise system relationships, retain labels and connectors as code-native elements and verify the actual logic independently of the illustration.

### Natural photography

```text
Style/medium: natural editorial photography, plausible materials and proportions,
{lighting condition}, {camera framing and focus behavior}.
Subject/context: {requested person, product or setting}.
Composition: {focal subject and text-safe/crop area}.
Constraints: preserve supplied product/identity details when required; no invented
logos, claims, product features or testimonial cues.
```

Use actual product imagery when the image must demonstrate the real item. Generated editorial imagery is not documentary evidence; label its status in the artifact record.

### Abstract atmosphere

```text
Style/medium: {soft color fields / sculptural abstract forms / layered paper /
subtle material texture}, using {palette roles} and {lighting or depth treatment}.
Composition: {focal region}, deliberately low detail in {live text region}.
Constraints: no literal objects, characters or lettering unless requested; avoid
hotspots behind text, distracting high-frequency detail and visible banding.
```

Use code for ordinary gradients. Generate a bitmap when organic texture, complex light or a specific requested art treatment materially benefits the design. Transparency and glossy 3D are not defaults for this recipe.

### Pixel art

```text
Style/medium: intentional pixel art on a {native width by height} logical grid,
limited {palette}, consistent pixel size and {outline/shading treatment}.
Subject: {requested subject}; silhouette readable at native resolution.
Constraints: no smooth gradients, mixed pixel scales, antialiased vector edges
or incidental text; {transparent sprite / opaque scene} as specified.
```

Inspect the generated grid; a pixel-art-looking high-resolution bitmap may not be a valid native sprite. Deliver at the required grid and use integer/nearest-neighbor scaling only when appropriate. Do not promise coherent animation frames from a single illustration.
