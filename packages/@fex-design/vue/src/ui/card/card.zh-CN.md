# Vue Card

## 导入
```vue
<script setup lang="ts">
import { Card } from '@fex-design/vue/ui/card'
</script>
```

## 示例
`examples/basic`、`examples/custom-header`、`examples/styling` 覆盖默认 Header、Header 替换和组件样式。

## Card API
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| title / description / extra | prop 或 slot | 生成默认 Header 的内容。 |
| header | 具名 slot | 完整替换默认 Header。 |
| footer | prop 或具名 slot | 独立 Footer 内容。 |
| classNames / styles | CardClassNames / CardStyles | 稳定的区域样式入口。 |
| 原生属性 | attrs | 透传至 Root。 |

`header` slot 优先于 title、description 和 extra。
