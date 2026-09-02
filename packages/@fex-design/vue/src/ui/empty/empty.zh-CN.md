# Vue UI Empty

通过字符串 props 和 Vue 原生 slots 快速创建空状态。

## 引入

    import { Empty } from '@fex-design/vue/ui/empty'

Props 包括 `image?: string | null`、`title?: string`、`description?: string`、`classNames` 和 `styles`。Slots 包括 `image`、`title`、`description` 和默认内容；具名 slot 覆盖对应简单 prop，默认 slot 渲染到 EmptyContent。

`basic`、`content`、`image`、`direction` 与 Primitive 展示一致；`styling` 展示结构化样式。

