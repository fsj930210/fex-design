# Vue Primitive Empty

使用 Vue SFC 表达的有样式空状态区域。

## 引入

    import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@fex-design/vue/primitive/empty'

每个区域通过 attrs 继承原生属性并渲染默认 slot；`EmptyDescription` 使用 `p`，其他布局区域使用 `div`。`basic`、`content`、`image`、`direction` 与 UI 展示一致。

