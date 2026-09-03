# Angular UI Empty

Convenience Empty implemented on a native div host.

## Import

    import { Empty } from '@fex-design/angular/ui/empty'

## Examples

`basic`, `content`, `image`, and `direction` match Primitive output; `styling` is UI-only.

## API

Use `<div empty>`. Inputs are `image: string | TemplateRef | null`, `title: string`, `description: string`, `classNames: EmptyClassNames`, and `styles: EmptyStyles`. Projected content renders in EmptyContent.

An undefined `image` uses the built-in image; `null` hides media.

## Structured styles

`classNames` and `styles` customize the six semantic regions. Empty defines no component-specific CSS variables.

## Direction

Native `dir` controls inherited LTR and RTL layout.

## Accessibility

Add live-region semantics only for dynamic announcements; projected controls keep native accessibility behavior.
