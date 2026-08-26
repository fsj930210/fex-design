# Svelte Card

## 导入
```svelte
<script lang="ts">
  import { Card } from '@fex-design/svelte/ui/card'
</script>
```

## 示例
`examples/basic`、`examples/custom-header`、`examples/styling` 覆盖默认 Header、Header 替换和区域样式。

## Card API
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| title / description / extra | string 或 Snippet | 生成默认 Header 的内容。 |
| header | Snippet | 完整替换默认 Header。 |
| footer | string 或 Snippet | 独立 Footer 内容。 |
| classNames / styles | CardClassNames / CardStyles | 稳定的区域样式入口。 |
| 原生属性 | HTMLAttributes<HTMLDivElement> | 透传至 Root。 |

`header` 优先于 title、description 和 extra。
