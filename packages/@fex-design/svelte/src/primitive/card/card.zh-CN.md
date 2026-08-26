# Svelte Primitive Card

## 导入
```svelte
<script lang="ts">
  import { Card, CardContent, CardDescription, CardExtra, CardFooter, CardHeader, CardTitle } from '@fex-design/svelte/primitive/card'
</script>
```

## 组件
| 组件 | 宿主元素 | 说明 |
| --- | --- | --- |
| Card | div | Root 的裁切、圆角、边框和阴影。 |
| CardHeader / CardTitle / CardDescription / CardExtra | div | 可通过 Snippet 组合的 Header 区域；Extra 是补充内容。 |
| CardContent / CardFooter | div | 独立 Content 和 Footer surface。 |

## 示例
`examples/basic`、`examples/surface`、`examples/custom-header` 是文档预览源码。

## API 与样式
每个部件透传 `HTMLAttributes<HTMLDivElement>`、事件、`class`、`style` 与 `bind:this`。使用 --card-radius、--card-border、--card-shadow、--card-background、区域 `-background` / `-padding` 与 Header/Footer divider variables。
