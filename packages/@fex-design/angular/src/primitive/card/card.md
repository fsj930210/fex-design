# Angular Primitive Card

## Import
```ts
import { Card, CardContent, CardDescription, CardExtra, CardFooter, CardHeader, CardTitle } from '@fex-design/angular/primitive/card'
```

## Components
| Component | Host | Description |
| --- | --- | --- |
| Card | div | Root clipping, radius, border, and shadow. |
| CardHeader / CardTitle / CardDescription / CardExtra | div | Explicit Header regions; Extra is supplementary content. |
| CardContent / CardFooter | div | Independent Content and Footer surfaces. |

## Examples
`examples/basic`, `examples/surface`, and `examples/custom-header` are the documentation-preview sources.

## API and styling
Each part uses a native div host and accepts native attributes, events, `class`, and host element access. Use --card-radius, --card-border, --card-shadow, --card-background, region `-background` / `-padding`, and Header/Footer divider variables.
