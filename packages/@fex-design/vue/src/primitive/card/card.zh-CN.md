# Vue Primitive Card

## 导入
```vue
<script setup lang="ts">
import { Card, CardContent, CardDescription, CardExtra, CardFooter, CardHeader, CardTitle } from '@fex-design/vue/primitive/card'
</script>
```

## 组件
| 组件 | 宿主元素 | 说明 |
| --- | --- | --- |
| Card | div | Root 的裁切、圆角、边框和阴影。 |
| CardHeader / CardTitle / CardDescription / CardExtra | div | 可通过 slot 组合的 Header 区域；Extra 是补充内容。 |
| CardContent / CardFooter | div | 独立 Content 和 Footer surface。 |

## 示例
`examples/basic`、`examples/surface`、`examples/custom-header` 是文档预览源码。

## API 与样式
所有部件透传原生 div 属性、事件、`class`、`style`；暴露元素为宿主 div。使用 --card-radius、--card-border、--card-shadow、--card-background、区域 `-background` / `-padding` 与 Header/Footer divider variables。
