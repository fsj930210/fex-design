# React UI Empty

Convenience Empty built from the same Primitive regions.

## Import

    import { Empty } from '@fex-design/react/ui/empty'

## Examples

`basic`, `content`, `image`, and `direction` match Primitive output. `styling` demonstrates semantic-region `classNames` and `styles`.

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| image | ReactNode \| string \| null | Built-in image | Image URL or custom image; `null` hides media. |
| title | ReactNode | — | Main empty-state title. |
| description | ReactNode | — | Supporting description. |
| children | ReactNode | — | Content rendered in EmptyContent. |
| classNames | EmptyClassNames | — | Classes for root, header, image, title, description, and content. |
| styles | EmptyStyles | — | Inline styles by semantic region. |

All other native `div` attributes pass through to the root.

