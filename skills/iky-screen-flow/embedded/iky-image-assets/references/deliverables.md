# Delivery recipes

Select the recipe from how the image will be used, independently of its visual style. Existing project dimensions, file formats and runtime conventions take precedence over these defaults. The prompt additions below assume live UI copy unless stated otherwise; when hybrid lettering or a complete banner is selected, replace their no-text constraints with [the exact-copy text mode](text-in-images.md). Never send contradictory text instructions.

## Isolated decorative object

Examples: reward, membership pass, empty-state illustration, collectible.

- Prefer a square transparent PNG unless the placement requires another ratio. Keep roughly 5–10% clear space around the complete silhouette, including intentional detached accents.
- Design at the smallest actual logical placement first. Reduce detail instead of expanding the UI to accommodate decoration.
- Request true alpha when supported. Otherwise plan a single flat contrasting background and a crisp, opaque silhouette from the first prompt. Exclude background shadows, glow, haze, translucent boundaries and unnecessary tiny floating particles. Use white only if all outer subject edges separate from it.
- Preserve interior openings and intended detached objects during extraction; keep internal shading. See [production](production.md#alpha-and-edge-cleanup).
- For icons that communicate actions or state, prefer the project's accessible vector/icon system; decorative raster art is not a replacement.

Prompt addition:

```text
Composition: centered isolated {subject}, {aspect ratio}, generous clear margin,
recognizable at {logical size}. No clipped extremities.
Background: {genuine alpha if supported / chosen flat contrasting color for
subsequent extraction}; no ground shadow, glow, haze or simulated checkerboard.
Delivery: clean transparent PNG; preserve intentional openings and accents.
```

## Background or hero scene

Examples: membership background, landing hero, scene behind a promotion.

- Opaque output is usually correct. Do not apply cutout rules to a scene intended to have a background, or impose the square object ratio.
- Determine container ratios, cover/contain behavior, focal subject, text location and narrow-screen crop from the actual UI. Keep important subjects inside the intersection of required crops. Use a separate mobile composition only when those constraints cannot coexist.
- Reserve a quiet text-safe area matching the layout for live copy; for selected hybrid/complete-banner modes, design included lettering and imagery together using [text in images](text-in-images.md). Keep real action behavior in the UI, test contrast against the rendered composition, and add a UI-controlled scrim where appropriate. Image colors alone do not establish accessible contrast.
- Use deliberate lighting and shadows compatible with the chosen style. The prohibition on cutout background shadows does not ban shadows inside an intentional scene.
- Derive pixel dimensions from the largest displayed crop and project density/performance needs. Use a supported opaque format, typically the project's JPEG/WebP/AVIF convention; retain PNG when required. Do not install a new runtime decoder just for a format preference.

Prompt addition:

```text
Canvas: {target aspect ratio}; opaque {scene or material background}.
Subject position: {layout-derived focal region}; preserve subject in {required crops}.
Text-safe area: {layout-derived region} with low detail and controlled luminance.
Constraints: no baked-in UI copy, buttons, logos or device frame; keep requested
style and light direction consistent with related foreground assets.
```

## Editorial or character illustration

- Match panel/cover ratio and narrative purpose; use alpha for isolated characters or opaque output for an intentional setting.
- Lock recurring character/product identity to inspected references. Check anatomy, hands, props and interactions relevant to the requested story.
- Keep semantic meaning available in surrounding text or a concise alt description. Hide purely decorative versions from assistive technology.
- For exported posters, comics or other standalone pieces with requested lettering, specify and verify exact text. Do not use this exception to bake changeable product data into UI assets.

Prompt addition:

```text
Narrative: {requested meaning and action}; {subjects and identity constraints}.
Framing: {panel/cover ratio and focal hierarchy}.
Background: {isolated alpha / intentional setting}.
Text: {none / exact requested standalone lettering and position}.
```

## Texture or repeating background

- Decide whether this is a seamless tile or a single non-repeating surface. Do not claim seamlessness from the prompt alone.
- For tiles, inspect a repeated 2 × 2 or larger arrangement for seams, obvious motifs and brightness changes. Avoid a dominant focal object unless repetition is intended.
- Check apparent detail at actual scale and behind text. Use code for simple noise-free gradients or patterns already expressible by the existing stack.

Prompt addition:

```text
Surface: {material or abstract pattern}; {palette and contrast level}.
Repeat: {seamless in both axes / non-repeating}; uniform scale and lighting.
Constraints: no directional spotlight, edge vignette, text or prominent isolated
object unless part of the requested repeat; preserve legibility at {placement}.
```

## Shared prompt

Fill or remove every braced field before sending. Combine only the chosen style and delivery details, not every recipe.

```text
Use case: {appropriate backend use-case label, if used}.
Asset type and purpose: {what this image does in the product}.
Subject: {requested object, scene or concept and its meaning}.
Inputs: {each inspected image and its style/composition/identity/edit role}.
Style/medium: {selected recipe adjusted to the effective project contract}.
Palette/material/light/view: {relevant collection style lock}.
Composition and readability: {delivery recipe, size, margin, crop, text-safe area}.
Background/output intent: {alpha or opaque scene; extraction plan when needed}.
Preserve: {edit invariants or collection consistency requirements}.
Constraints: {relevant exclusions and truthful-content requirements}.
```

Prompts describe visual intent, not unavailable tool parameters. Record the exact submitted prompt and actual output metadata separately.
