# Text and imagery as one composition

Image-led UI can include lettering in the generated artwork; do not categorically require all image assets to be text-free. Choose a mode below within the current project contract. A supplied card may be an illustrative reference rather than a request to replace an existing asset or copy its wording.

Design the headline, supporting copy, visual subject, empty space and action as one composition regardless of rendering mode. A screenshot may be a composition reference without being the desired final bitmap or an edit target. Use the smallest approach that achieves the selected art direction.

## Choose a text mode

| Mode | Use when | Implementation |
| --- | --- | --- |
| Live text | Copy changes, personalization, localization, dense explanations or simple typography | Generate art/background with a planned text area; render actual text and controls over or alongside it |
| Hybrid lettering | A short stable headline benefits from illustrated, dimensional or scene-integrated type | Bake only the selected decorative words into artwork; keep supporting copy, changing data and controls live |
| Complete banner | The user selects a complete campaign/card composition with stable copy | Generate or compose the full visible artwork, including selected text and optional depicted CTA; connect actual accessible interaction separately |

Prefer live text when a background plus normal typography achieves the design. Recommend hybrid lettering when words must wrap around an object, have material depth or become part of a scene. Use the complete-banner mode when selected; do not silently downgrade it to a text-free illustration. If no direction is selected, resolve from placement and project conventions rather than requiring a separate interview. A full banner is a content asset, not authorization to rasterize an entire functional application.

## Exact copy and production

- Get exact copy from the current request or product source. Quote each line in the final prompt and identify the title, body and depicted action. Never invent offers, rewards, prices or actual odds. Treat example screenshot text as illustrative unless the user asks to reuse it.
- Specify the intended visual hierarchy, line breaks, scene/text overlap and legibility at actual display size. Reserve essential text inside all supported crops; a decorative crop cannot cut the title or action.
- Inspect all lettering after generation, including Korean syllables, spacing, punctuation and final word endings. OCR can support the check but cannot certify visual correctness alone. Compare against the authoritative copy.
- If generated lettering is inaccurate or cramped, correct it using the selected image tool or permitted local composition with available properly licensed fonts. Preserve the requested final text-inclusive artifact. Prefer deterministic composition for ordinary body text rather than repeatedly regenerating a paragraph.
- Store the exact text, text mode, editable background/layers when available, final prompt and processing in the existing image record. Do not claim a flat PNG has editable typography. Later copy changes require a new derivative and re-verification.

Prompt addition, filled before generation:

```text
Text mode: {hybrid lettering / complete banner}.
Exact title: "{approved title}".
Exact supporting copy: "{approved copy, or omit when live}".
Depicted CTA: "{approved label, or omit when live}".
Typography/art relationship: {material, hierarchy, placement, overlap and breaks}.
Readability: all included words legible at {smallest actual placement}; keep
essential lettering inside {crop-safe region}. No added or altered text.
Preserve space for: {remaining live text/actions, if any}.
```

## Keep the UI usable

- An arrow or button painted into a PNG has no behavior. Connect it to a real link/button with an accessible name, keyboard/focus behavior and the project's minimum target size. If the whole card has one action, one actual link/button around the card is usually sufficient. Multiple depicted actions require separate genuine controls or a different composition; do not make one indiscriminate click target stand in for them.
- Provide the meaningful image text once to assistive technology using appropriate alt text, real semantic text or a control label/description. Avoid redundant reading of both hidden text and identical alt text. Pure decoration remains hidden.
- Verify at the narrowest viewport and relevant text/zoom settings. A bitmap headline does not respond to dynamic type; provide a live-text responsive/accessibility variant or a layout that meets the project's actual enlarged-text needs. Screen-reader text alone does not solve small visual lettering. Do not accept clipped or illegible copy merely because alt text exists.
- Keep frequently changing/personalized values live by default. If the requested complete banner must carry such values, establish how it will remain correct before treating the asset as production-ready; do not silently introduce an image-generation service or new data pipeline.
- Verify text contrast in the delivered composition and focus visibility in the actual component. A visually beautiful card does not establish accessibility or click behavior without those checks.

For the user's illustrative quest-card pattern, either create a richer background with the title/body/action overlaid, integrate just the short headline into the art, or compose all selected copy into a complete banner. Which mode fits depends on the chosen art direction and whether the text changes; do not prescribe that sample as a new project default.
