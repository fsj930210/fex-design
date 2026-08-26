# Angular Card

## Import
```ts
import { Card } from '@fex-design/angular/ui/card'
```

## Examples
`examples/basic`, `examples/custom-header`, and `examples/styling` cover generated Header, template replacement, and region styling.

## Card API
| Name | Type | Description |
| --- | --- | --- |
| title / description | string | Generated Header content. |
| extra / header / footer | TemplateRef | Supplementary content, complete Header replacement, and Footer template. |
| classNames / styles | CardClassNames / CardStyles | Stable region styling. |
| native attributes | host attributes | Applied to Root. |

`header` takes precedence over title, description, and extra.
