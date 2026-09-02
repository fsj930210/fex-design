# Alert

UI Alert 将 Primitive 部件封装为一个组件，提供语义化内置图标、可选关闭行为、自定义操作区和结构化样式。

## 导入

```tsx
import { Alert } from '@fex-design/react/ui/alert'
```

## 示例

示例固定按基本展示、Type 与自定义颜色、Variant、可关闭、循环公告、自定义 Icon/Action、LTR/RTL、语义化样式排列。

## API

`type` 支持 `success | info | warning | error`，默认 `info`；`variant` 支持 `filled | outlined | solid`，默认 `filled`。`title`、`description`、`icon`、`action`、`closeIcon` 接收 `ReactNode`。`showIcon` 开启内置图标或自定义替换，`closable` 创建关闭按钮；`onClose` 在隐藏前触发，调用 `preventDefault()` 可以阻止隐藏。

原生 `div` 属性、事件、`style`、`className` 和 `ref` 透传到 Primitive 根节点。`classNames` 与 `styles` 可分别定制 `root`、`icon`、`content`、`title`、`description`、`action`、`close`。

## 内置图标

success、info、warning、error 分别映射对应的圆形状态图标。只有 `showIcon` 为 true 时才会使用自定义 `icon`。

## 无障碍

内置图标为装饰内容。关闭按钮具有可访问名称、支持键盘激活并保留焦点样式。循环公告示例在鼠标悬停和内容聚焦时暂停，并在 `prefers-reduced-motion` 下停止动画。
