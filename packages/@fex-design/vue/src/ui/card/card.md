# Vue Card

## Import
```vue
<script setup lang="ts">
import { Card } from '@fex-design/vue/ui/card'
</script>
```

## Examples
`examples/basic`, `examples/custom-header`, and `examples/styling` cover the default Header, Header replacement, and component styling.

## Card API
| Name | Type | Description |
| --- | --- | --- |
| title / description / extra | prop or slot | Generated Header content. |
| header | named slot | Fully replaces the generated Header. |
| footer | prop or named slot | Independent Footer content. |
| classNames / styles | CardClassNames / CardStyles | Stable region styling. |
| native attributes | attrs | Forwarded to Root. |

The `header` slot takes precedence over title, description, and extra.
