# Angular Primitive Empty

使用独立组件和明确原生宿主约束的有样式空状态区域。

## 引入

    import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@fex-design/angular/primitive/empty'

## 组件与 API

分别使用 `<div empty>`、`<div emptyHeader>`、`<div emptyMedia>`、`<div emptyTitle>`、`<p emptyDescription>` 和 `<div emptyContent>`。宿主原生属性与事件继续可用。

## 示例

`basic`、`content`、`image`、`direction` 与 UI Empty 的文案、布局和最终展示一致。

## 书写方向

原生 `dir` 控制继承的 LTR 与 RTL 布局。

## 无障碍

仅在动态更新需要播报时向原生宿主添加实时区域语义。
