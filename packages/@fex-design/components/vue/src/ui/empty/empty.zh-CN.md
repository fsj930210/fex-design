# Vue UI Empty

通过字符串 props 和 Vue 原生 slots 快速创建空状态。

## 引入

    import { Empty } from '@fex-design/vue/ui/empty'

## 示例

`basic`、`content`、`image`、`direction` 与 Primitive 的文案、布局和最终展示一致；`styling` 展示结构化样式。

## Empty API

Props 包括 `image?: string | null`、`title?: string`、`description?: string`、`classNames` 和 `styles`。Slots 包括 `image`、`title`、`description` 和默认内容；具名 slot 覆盖对应简单 prop，默认 slot 渲染到 EmptyContent。

## 结构化样式

`classNames` 和 `styles` 定制 root、header、image、title、description、content。Empty 不提供组件专属 CSS 变量。

## 书写方向

原生 `dir` 控制继承的 LTR 与 RTL 布局。

## 无障碍

仅在动态变化需要播报时添加实时区域语义；默认 slot 内的控件保留原生无障碍行为。
