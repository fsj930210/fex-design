# Solid Primitive Card

## Import
```tsx
import { Card, CardContent, CardDescription, CardExtra, CardFooter, CardHeader, CardTitle } from '@fex-design/solid/primitive/card'
```

## Components
| Component | Host | Description |
| --- | --- | --- |
| Card | div | Root clipping, radius, border, and shadow. |
| CardHeader / CardTitle / CardDescription / CardExtra | div | Explicit Header regions; Extra is supplementary content. |
| CardContent / CardFooter | div | Independent content and Footer surfaces. |

## Examples
`examples/basic`, `examples/surface`, and `examples/custom-header` are the documentation-preview sources.

## API and styling
Every part forwards `JSX.HTMLAttributes<HTMLDivElement>`, events, `class`, `style`, and `ref`. There is no state. Use --card-radius, --card-border, --card-shadow, --card-background, each region's `-background` and `-padding`, and --card-header-divider / --card-footer-divider.
