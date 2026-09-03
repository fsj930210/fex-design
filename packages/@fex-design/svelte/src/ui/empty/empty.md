# Svelte UI Empty

Convenience Empty using Svelte-native strings and Snippets.

## Import

    import Empty from '@fex-design/svelte/ui/empty'

## Examples

`basic`, `content`, `image`, and `direction` match Primitive output; `styling` is UI-only.

## API

`image?: Snippet | string | null`, `title?: Snippet | string`, `description?: Snippet | string`, and `children?: Snippet` define content. `classNames` and `styles` customize the six semantic regions. Native div attributes pass through.


## Structured styles

`classNames` and `styles` customize the six semantic regions. Empty defines no component-specific CSS variables.

## Direction

Native `dir` controls inherited LTR and RTL layout.

## Accessibility

Add live-region semantics only for dynamic announcements; child snippets keep native accessibility behavior.
