# Scenes

Each card gets its own full-bleed scene. Do not reuse one image set across the carousel and the reel, or across two carousels, unless the user asks for it; the same picture seen three times reads as a template.

Use the session's image backend through the project's image workflow (the image-assets skill and whatever image-generation route the session provides). Generation is slow: dispatch it as soon as the copy is settled, in one job per set, and build the renderers meanwhile.

## Brief template

State these in every job, with real paths:

- **Role and scope.** Image-generation only; the job directory is the only place to write; no code changes, installs or fallbacks to drawn SVG.
- **Purpose.** Each image becomes the whole background of a 4:5 card with a headline over its lower part, a tag top right and stickers around the subject.
- **Style lock.** Material, palette and light from the project's asset guide, the room or setting mood, and "the same object designs as the references so the set stays one family".
- **Prohibitions.** No text, letters, numerals, logos, watermarks, real UI, people, faces or hands. Screens and signs carry plain surfaces or simple shapes.
- **Format.** Portrait 1024x1536.
- **Composition rules** (code depends on them):
  - the card shows roughly the top 85% of the image;
  - the subject sits between 12% and 58% of the height, centred, about 70% of the width, sharp, with the background softly out of focus;
  - from 62% down: only a dark, calm floor or tabletop;
  - the top-right and top-left corners carry nothing important.
- **Scenes.** One line of subject and one line of what it conveys per file, with exact filenames.
- **References.** Earlier accepted images, named as style references whose composition must not be copied.
- **Review loop.** View every result; regenerate at most twice and only for a named defect (text, a person, a busy lower third, a wrong palette).
- **Result record.** A JSON file with status, tool, model, effort, absolute paths, pixel sizes, attempts and notes.

Generate one image first and use it as the style reference for the rest of the set. For a second set, pass several accepted scenes from the first as references.

## Real artwork inside a scene

When product artwork must be exact (gift icons, badges), ask for an empty display in the scene (flat shelves, empty frames) and note in the brief that code will fill it. After viewing the result, measure the display's slot centres in the scene's own pixels and place the artwork with a contact shadow. Do not estimate them: generated displays are tilted and unevenly spaced, and a guess puts icons across slot borders or on top of each other. Use `scripts/grid.mjs <image> <out.png> <x> <y> <w> <h> <scale> <step> [marks]` to get an enlarged, gridded crop with your candidate points marked, read the centres off it, then check a close-up of the rendered result with every icon in place. Size icons to about three quarters of the slot.

## Using a scene

- Open every delivered file yourself; a worker's success message is not evidence.
- Draw the scene at card width, shifted up so the subject clears the headline (`zoom` and `top` per card in the card template). A scene that crowds the headline was drawn too large.
- In the reel, draw by height with a slow push-in and map overlays through the same transform so they stay attached to the scene.
- Scenes often begin with a dark ceiling strip. Cover it with the top scrim or the card's own crop instead of leaving a hard band.
- Keep originals, the brief and the result record in the task's source folder, outside runtime imports. Note in the hand-off that scenes are generated and are not app screens.
