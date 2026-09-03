# React UI Empty

Convenience Empty built from the same Primitive regions with a built-in image and structured styling.

## Import

    import { Empty } from '@fex-design/react/ui/empty'

## Examples

| Name | Covers |
| --- | --- |
| basic | Built-in image, title, and description. |
| content | Custom children rendered in EmptyContent. |
| image | Image URL and custom React content. |
| direction | Chinese LTR and Arabic RTL layouts. |
| styling | Structured classNames and styles. |

The first four examples match Primitive Empty in copy, layout, and final appearance.

## Empty API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| image | ReactNode \| string \| null | Built-in image | Image URL or custom image; `null` hides media. |
| title | ReactNode | — | Main empty-state title. |
| description | ReactNode | — | Supporting description. |
| children | ReactNode | — | Content rendered in EmptyContent. |
| classNames | EmptyClassNames | — | Classes for root, header, image, title, description, and content. |
| styles | EmptyStyles | — | Inline styles for the six semantic regions. |
| native attributes | ComponentProps<'div'> | — | Native root attributes and events. |

## Structured styles

Use `classNames` and `styles` for per-instance root, header, image, title, description, and content customization. Empty defines no component-specific CSS variables.

## Direction

Pass native `dir="ltr"` or `dir="rtl"`. Alignment and content layout follow the inherited writing direction.

## Accessibility

Empty is presentational by default. Add live-region semantics only when dynamic changes need announcement; action controls supplied through children keep their native accessible names and keyboard behavior.
