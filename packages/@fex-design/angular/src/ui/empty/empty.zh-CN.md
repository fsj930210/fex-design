# Angular UI Empty

基于原生 div 宿主的快捷 Empty。

## 引入

    import { Empty } from '@fex-design/angular/ui/empty'

## 示例

四个公共示例与 Primitive 展示一致，`styling` 为 UI 专属。

## API

使用 `<div empty>`。输入包括 `image: string | TemplateRef | null`、`title`、`description`、`classNames` 和 `styles`，投影内容进入 EmptyContent。`image` 未定义时使用内置图形，`null` 隐藏媒体。

## 结构化样式

`classNames` 和 `styles` 定制六个语义区域。Empty 不提供组件专属 CSS 变量。

## 书写方向

原生 `dir` 控制继承的 LTR 与 RTL 布局。

## 无障碍

仅在动态变化需要播报时添加实时区域语义；投影控件保留原生无障碍行为。
