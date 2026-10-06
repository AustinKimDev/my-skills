# Production and verification

## Generate and preserve

Use the selected backend's installed skill and exposed tool schema. Load local references with the available image viewer before generating or editing. Preserve their role distinctions: style matching does not authorize copying every subject or changing an edit target's identity.

Keep generation sources in the task's established design-artifact directory, such as `.ui-design/<task>/sources/`, and runtime derivatives under the project's asset path. Copy returned generation files into the workspace; do not rely on a generator cache as the final source of an import. Capture exact prompt, tool/mode, available model metadata, reference paths, source and derivative paths, intended display sizes and processing in one existing task record. Link the record from the UI brief instead of duplicating prompts.

A source around 1024px or larger is useful for many generated illustrations when the tool requires it; this is not a universal runtime size. Use the actual tool's supported ratios and sizes without silently switching backends. Preserve originals before changing alpha, size or encoding. Version revisions before replacing any referenced asset.

## Alpha and edge cleanup

Apply this section to cutouts, not intentionally opaque scenes.

1. Inspect output format and actual transparency. An RGBA channel can still be entirely opaque; a checkerboard or white rectangle can be baked into pixels. Measure alpha extrema and transparent/partial/opaque counts with an available image tool. Confirm a nonempty subject, truly clear outer margin and transparent interior openings where expected. `hasAlpha: yes` alone is insufficient.
2. If alpha is absent, use an available local foreground extraction/masking tool on the planned flat contrasting background. Removal, edge cleanup and optimization are included in this workflow's artwork deliverable. Respect current harness constraints on image processing; do not install a dependency without authorization.
3. Build a subject-aware mask. Flood filling only from the border misses enclosed openings. Removing every pixel matching the backdrop can destroy same-colored subject details. Use foreground/region evidence, inspect openings and preserve intentional detached accents. Do not erase all small components automatically.
4. Remove backdrop color spill and halos from antialiased edge pixels without thinning the silhouette or clipping tips. Preserve internal highlights and shadows; do not confuse them with a white background. Avoid threshold-only cleanup that creates jagged edges.
5. Composite on the intended light/banner surface and a dark surface; inspect magnified edges and the final logical size. Check residue, opaque rectangles, dark fringes, clipped extremities, accidental fragments and gaps inside the subject. Fix mask defects before accepting.

When extraction is difficult, improve the mask or regenerate a simpler cutout-ready source within the task budget. Difficulty alone is not a reason to ask whether routine cleanup is allowed. If no permitted tool can produce a correct alpha output, report the specific tooling limit and retain the deliverable as incomplete; never call opaque output a transparent PNG.

## Derivatives and integration

- Size for the largest intended display and crop at an appropriate density, commonly up to 3× for small UI illustrations. Preserve aspect ratio; the display box need not equal the image ratio. Follow existing native density suffix conventions when applicable. Do not upscale a small bitmap and claim additional detail.
- Reinspect alpha edges after resize; downsampling can introduce fringes. Use nearest-neighbor/integer scaling for intentional pixel art and suitable resampling for continuous illustrations.
- Record actual dimensions and bytes; apply an existing project size budget. Do not invent a universal byte threshold or ship a large source by habit. Select formats supported by the current platforms, retaining true alpha for cutouts.
- Connect the repository asset to the real component when implementation is in scope. Set intrinsic dimensions/aspect ratio or reserved layout space; use the appropriate contain/cover behavior and focal crop. Do not shrink touch targets or displace essential copy to fit art.
- Follow [the selected text mode](text-in-images.md). Default changing copy and controls to live UI; allow selected static lettering/complete banners with exact-copy verification, accessible equivalent content and actual actions. Decorative art should be hidden from assistive technology; semantic imagery needs useful equivalent text.
- For remotely loaded imagery, preserve existing loading/error fallback and layout stability; do not introduce a new CDN/upload pipeline for a local asset request.

## Acceptance and return

Inspect only the requested placements and platforms. A standalone artifact does not require building a new screen. Report pass/fail/unverified/not-applicable accurately:

| Check | Evidence |
| --- | --- |
| File validity | Readable final file; exact dimensions, format, bytes and repository path |
| Style match | Side-by-side with inspected anchor at equal visual size: shapes, material, lighting, palette, view and detail |
| Cutout | Actual alpha values, nonempty subject, clean outer margin/openings; edge composites on intended light and dark surfaces |
| Background | Required aspect ratios/crops, focal subject intact, live-copy contrast and quiet zone |
| Small placement | Actual logical display size; recognizable subject and restrained detail |
| Runtime integration | Consuming file/component, correct sizing/crop, narrowest supported layout and relevant appearance/text-size states |
| Content and accessibility | No invented offers/benefits/odds; selected text mode, exact included copy, genuine controls and appropriate decorative/semantic treatment |
| Texture, if applicable | Repeated arrangement visibly checked for seams |

Web verification does not establish React Native or other native renderer parity. Report simulator/device checks only when actually performed. Reference images can establish art direction without proving their own alpha quality; do not reproduce known artifacts to match them.

Return a compact result to `iky-ui-design` or the user: saved paths, source/prompt-record link, placement/crop and accessibility intent, verification evidence, remaining defects or untested targets. Do not mark the UI work complete merely because generation returned a file.
