# React Primitive Separator

Low-level semantic separator with native `div` attribute passthrough.

## Import

    import { Separator } from '@fex-design/react/primitive/separator'

## Examples

Examples are stored in `examples/<name>` as the source for the documentation preview.

| Name | Covers |
| --- | --- |
| basic | Semantic horizontal separator. |
| vertical | Semantic vertical separator. |

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| orientation | `'horizontal' \| 'vertical'` | `horizontal` | Separator direction. |
| native attributes | `ComponentProps<'div'>` | — | Native attributes and events. |

## Accessibility

Separator always renders `role="separator"` and exposes its direction through `aria-orientation`.
