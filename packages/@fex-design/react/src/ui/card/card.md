# React Card

The UI Card creates a conventional Header while retaining the Primitive regions and native div attributes.

## Import

```tsx
import { Card } from '@fex-design/react/ui/card'
```

## Examples

Examples live in `examples/<name>` and are the source used by documentation previews.

| Name | Coverage |
| --- | --- |
| basic | Generated Header, extra content, body, and Footer. |
| custom-header | Complete Header replacement. |
| styling | classNames, styles, and Card variables. |

## Card API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | ReactNode | — | Default Header title. |
| description | ReactNode | — | Default Header supporting text. |
| extra | ReactNode | — | Default Header supplementary content. |
| header | ReactNode | — | Fully replaces the generated Header. |
| footer | ReactNode | — | Independent Footer content. |
| classNames | CardClassNames | — | Classes for root, header, title, description, extra, content, and footer. |
| styles | CardStyles | — | Inline styles for the same stable parts. |
| native attributes | ComponentProps<'div'> | — | Native attributes and events are forwarded to the Root. |
| element access | ref | — | Receives the root HTMLDivElement. |

## Replacement rules

`header` has precedence over `title`, `description`, and `extra`. Use Primitive parts in `header` when you need the default region surface with a custom layout. Card CSS variables can be placed on a single instance, a component wrapper, or `:root`.
