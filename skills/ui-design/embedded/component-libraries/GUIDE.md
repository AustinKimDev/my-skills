> Bundled supporting guide. Preserve the calling workflow's scope and project authority. Use [local support](references/dependencies.md) for named dependencies; this guide does not grant additional tool or mutation permissions.

# Existing component-library integration

Read this only when the project already uses shadcn/ui, daisyUI, or Magic UI, or the user explicitly selects one. This is a portable integration guide, not a bundled component library or a copy of those separate skills. Do not install a library merely because the project uses React, HTML, or Tailwind.

## Resolve the project contract

Inspect package manifests, the lockfile, configured aliases, theme tokens, and actual component imports. Reuse existing components and variants before adding equivalents. Determine the installed version and package runner; use the matching official documentation when exact APIs or installation behavior are needed. A supporting guide does not authorize dependencies, migrations, or replacing the design system.

## shadcn/ui

Inspect `components.json` when present and the actual local component source. Components are maintained in the project; an upstream example need not match the installed API. Preserve aliases, base primitives, variant conventions, semantic colors, and accessibility behavior. Compose existing components and providers rather than copying a second implementation.

Use the installed CLI's documented help/docs/search capabilities when available. Consult [official documentation](https://ui.shadcn.com/docs) for the relevant component and the project's CLI version. Do not execute a package runner's `@latest` command merely to discover context: it may download a package. Add registry components only within the user's authorized installation scope, inspect the resulting diff and dependencies, and verify the actual interaction.

## daisyUI

Use the project's installed daisyUI and Tailwind versions, theme configuration, and prefix. Read the relevant [component](https://daisyui.com/components/) and [theme/color](https://daisyui.com/docs/colors/) documentation before using unfamiliar classes. Preserve semantic role pairs such as a surface and its content color. Do not mix an arbitrary literal palette into themed components or assume a v5 setup applies to another version.

Select the component from the user task, then verify native semantics, keyboard/focus behavior, open/closed and disabled states, responsive layout, and the actual rendered contrast. Class names alone do not implement a dialog lifecycle or accessible input validation. Installation/configuration changes remain separately scoped.

## Magic UI

Use [official Magic UI documentation](https://magicui.design/docs) for the requested component and registry requirements. Reuse existing shadcn setup, aliases, CSS variables, and locally installed animation tools. Preserve useful static content, client/server boundaries, reduced-motion behavior, and keyboard/touch equivalents. Do not stack effects or initialize a second component system to reproduce one decorative example.

When a requested registry addition is authorized, inspect its generated source, imports, assets, and dependency changes. Remove only artifacts introduced by that addition when they are unused. Check narrow layouts, long content, cleanup/offscreen animation costs, and failure states relevant to the component. A visual demo is not permission to add tracking, remote data calls, or unrelated packages.
