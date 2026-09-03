# React Primitive Empty

Styled empty-state regions for composing media, title, description, and content.

## Import

    import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@fex-design/react/primitive/empty'

## Components

| Component | Element | Purpose |
| --- | --- | --- |
| Empty | div | Root empty-state container. |
| EmptyHeader | div | Groups media, title, and description. |
| EmptyMedia | div | Media or image container. |
| EmptyTitle | div | Main empty-state title. |
| EmptyDescription | p | Supporting description. |
| EmptyContent | div | Actions or custom content. |

Every component passes through native attributes, events, class, style, ARIA attributes, children, and ref for its host element.

## Examples

| Name | Covers |
| --- | --- |
| basic | Built-in empty-state composition. |
| content | Custom action content. |
| image | Custom image content. |
| direction | Chinese LTR and Arabic RTL layouts. |

The four examples match UI Empty in copy, layout, and final appearance.

## API

The family adds no state props. Compose the regions directly and style each native host independently.

## Direction

Pass native `dir="ltr"` or `dir="rtl"` to `Empty`. Alignment and content layout follow the inherited writing direction.

## Accessibility

Empty is presentational by default. Add `role="status"` and `aria-live="polite"` only when a dynamically updated empty state should be announced.
