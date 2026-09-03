# Solid UI Empty

Convenience Empty assembled from Primitive regions.

## Import

    import { Empty } from '@fex-design/solid/ui/empty'

## Examples

`basic`, `content`, `image`, and `direction` match Primitive output; `styling` is UI-only.

## API

`image?: JSX.Element | string | null`, `title?: JSX.Element`, `description?: JSX.Element`, and `children?: JSX.Element` provide content. `classNames` and `styles` target root, header, image, title, description, and content. Native `div` attributes pass through.

## Structured styles

`classNames` and `styles` customize the six semantic regions. Empty defines no component-specific CSS variables.

## Direction

Native `dir` controls inherited LTR and RTL layout.

## Accessibility

Add live-region semantics only for dynamic announcements; child controls keep native accessibility behavior.
