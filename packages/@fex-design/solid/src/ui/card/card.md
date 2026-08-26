# Solid Card

## Import
```tsx
import { Card } from '@fex-design/solid/ui/card'
```

## Examples
`examples/basic`, `examples/custom-header`, and `examples/styling` cover generated Header, replacement Header, and region styling.

## Card API
| Name | Type | Description |
| --- | --- | --- |
| title / description / extra | JSX.Element | Generated Header content. |
| header | JSX.Element | Fully replaces the generated Header. |
| footer | JSX.Element | Independent Footer content. |
| classNames / styles | CardClassNames / CardStyles | Stable root, header, title, description, extra, content, and footer styling. |
| native attributes | JSX.HTMLAttributes<HTMLDivElement> | Forwarded to Root. |

`header` takes precedence over title, description, and extra.
