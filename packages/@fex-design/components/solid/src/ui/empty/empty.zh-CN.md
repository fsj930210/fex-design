# Solid UI Empty

由 Primitive 区域组成的快捷 Empty。

## 引入

    import { Empty } from '@fex-design/solid/ui/empty'

## 示例

`basic`、`content`、`image`、`direction` 与 Primitive 展示一致；`styling` 为 UI 专属。

## API

`image`、`title`、`description` 和 `children` 提供内容；原生 div 属性继续透传。

## 结构化样式

`classNames`、`styles` 定制六个语义区域。Empty 不提供组件专属 CSS 变量。

## 书写方向

原生 `dir` 控制继承的 LTR 与 RTL 布局。

## 无障碍

仅在动态变化需要播报时添加实时区域语义；children 内控件保留原生无障碍行为。
