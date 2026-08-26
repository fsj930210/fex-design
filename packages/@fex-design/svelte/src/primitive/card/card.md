# Svelte Primitive Card

## Import
```svelte
<script lang="ts">
  import { Card, CardContent, CardDescription, CardExtra, CardFooter, CardHeader, CardTitle } from '@fex-design/svelte/primitive/card'
</script>
```

## Components
| Component | Host | Description |
| --- | --- | --- |
| Card | div | Root clipping, radius, border, and shadow. |
| CardHeader / CardTitle / CardDescription / CardExtra | div | Snippet-composable Header regions; Extra is supplementary content. |
| CardContent / CardFooter | div | Independent Content and Footer surfaces. |

## Examples
`examples/basic`, `examples/surface`, and `examples/custom-header` are the documentation-preview sources.

## API and styling
Each part forwards `HTMLAttributes<HTMLDivElement>`, events, `class`, `style`, and `bind:this`. Use --card-radius, --card-border, --card-shadow, --card-background, region `-background` / `-padding`, and Header/Footer divider variables.
