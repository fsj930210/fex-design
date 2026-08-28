# Angular Primitive Separator

Low-level semantic separator with native host attribute passthrough.

## Import

    import { Separator } from '@fex-design/angular/primitive/separator'

## Examples

Examples are stored in `examples/<name>` as the source for the documentation preview.

| Name     | Covers                         |
| -------- | ------------------------------ |
| basic    | Semantic horizontal separator. |
| vertical | Semantic vertical separator.   |

## Separator API

| Name              | Type                   | Default    | Description                        |
| ----------------- | ---------------------- | ---------- | ---------------------------------- |
| orientation       | horizontal or vertical | horizontal | Separator direction.               |
| native attributes | Angular host attrs     | —          | Native host attributes and events. |

## Accessibility

Separator always renders `role="separator"` and exposes its direction through `aria-orientation`.
