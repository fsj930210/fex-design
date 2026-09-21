# Solid Primitive Empty

使用 Solid 原生 JSX 属性的有样式空状态区域。

## 引入

    import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@fex-design/solid/primitive/empty'

## API

各区域不增加状态属性，原生 JSX 属性、事件、class、style、ARIA 属性和 children 均可透传。

## 示例

`basic`、`content`、`image`、`direction` 与 UI Empty 的文案、布局和最终展示一致。

## 书写方向

原生 `dir` 控制继承的 LTR 与 RTL 布局。

## 无障碍

仅在动态更新需要播报时添加实时区域语义。
