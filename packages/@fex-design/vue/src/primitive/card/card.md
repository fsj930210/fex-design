# Vue Primitive Card

## Import
```vue
<script setup lang="ts">
import { Card, CardContent, CardDescription, CardExtra, CardFooter, CardHeader, CardTitle } from '@fex-design/vue/primitive/card'
</script>
```

## Components
| Component | Host | Description |
| --- | --- | --- |
| Card | div | Root clipping, radius, border, and shadow. |
| CardHeader / CardTitle / CardDescription / CardExtra | div | Slot-composable Header regions; Extra is supplementary content. |
| CardContent / CardFooter | div | Independent Content and Footer surfaces. |

## Examples
`examples/basic`, `examples/surface`, and `examples/custom-header` are the documentation-preview sources.

## API and styling
All parts forward native div attributes, events, `class`, and `style`; the exposed element is the host div. Use --card-radius, --card-border, --card-shadow, --card-background, region `-background` / `-padding`, and Header/Footer divider variables.
