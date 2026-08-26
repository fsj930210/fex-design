# Svelte Card

## Import
```svelte
<script lang="ts">
  import { Card } from '@fex-design/svelte/ui/card'
</script>
```

## Examples
`examples/basic`, `examples/custom-header`, and `examples/styling` cover generated Header, replacement Header, and region styling.

## Card API
| Name | Type | Description |
| --- | --- | --- |
| title / description / extra | string or Snippet | Generated Header content. |
| header | Snippet | Fully replaces the generated Header. |
| footer | string or Snippet | Independent Footer content. |
| classNames / styles | CardClassNames / CardStyles | Stable region styling. |
| native attributes | HTMLAttributes<HTMLDivElement> | Forwarded to Root. |

`header` takes precedence over title, description, and extra.
