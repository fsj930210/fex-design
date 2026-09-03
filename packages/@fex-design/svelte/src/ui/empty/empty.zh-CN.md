# Svelte UI Empty

使用 Svelte 原生字符串和 Snippet 的快捷 Empty。

## 引入

    import Empty from '@fex-design/svelte/ui/empty'

## 示例

四个公共示例与 Primitive 展示一致，`styling` 为 UI 专属。

## API

`image`、`title`、`description` 接受字符串或 Snippet，`children` 渲染到 EmptyContent。

## 结构化样式

`classNames`、`styles` 定制六个语义区域。Empty 不提供组件专属 CSS 变量。

## 书写方向

原生 `dir` 控制继承的 LTR 与 RTL 布局。

## 无障碍

仅在动态变化需要播报时添加实时区域语义；子 Snippet 内控件保留原生无障碍行为。
