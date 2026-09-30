# Brand Pink Button Foreground Decision

Status: current for explicitly filled brand-pink buttons; neutral gradient-corner emphasis is governed by the later 09+04 selection.

## Decision

Explicitly filled brand pink uses the white on-action foreground (`#ffffff`) for text, icons, and progress indicators in both light and dark appearances. Keep it for default, hover, pressed, and busy states. Disabled buttons continue to use the appearance-specific neutral disabled recipe.

This decision changes only the brand tone. Other semantic tones retain their current dedicated foreground recipes.

## Authority and scope

This is an explicit user-approved correction from 2026-09-08 and is authorized as portable IKY maintenance. It supersedes the earlier brand-specific dark-foreground direction. It does not override a closer explicit user direction or an established project-specific brand contract.

## Contract sources

- [Tokens](tokens.json): `color.onAction` and `themes.light.color.onAction` for the existing filled action.
- [Rules](rules.md): COLOR-02, COLOR-03, and CONTROL-07.
- [Component recipe](component-recipes.md#semantic-gradient-corner-buttons).
- [Audit procedure](audit.md): the COLOR-02 and COLOR-03 / CONTROL-07 checks.
- [Runnable button lab](../assets/reference/index.html#button-tones).

## Later palette revision

The user requested more saturated, primary-like button faces on 2026-09-09 after rejecting the contrast-darkened palette in light appearance. That request authorizes the current tone fills in [tokens](tokens.json) and supersedes the prior darker faces; it does not change this brand white-foreground decision. Report measured COLOR-02 failures separately from visual agreement.

## Verification requirement

Check the rendered nested label, `currentColor` icon, and progress indicator in both appearances and every enabled interaction state. Measure contrast against the actual face separately; the approved foreground must not be described as compliant from preference alone. Confirm disabled remains neutral and that unrelated tone recipes were not changed by this correction.

## Current semantic emphasis selection

On 2026-09-09 the user selected 09+04 (gradient perimeter plus corner light) for portable semantic emphasis. This supersedes the above vivid-palette exploration for that component. Its neutral face uses the appearance-specific foreground from `buttonEmphasis.foreground`, including dark text in light appearance. The white foreground decision continues only for explicitly filled brand-pink actions.
