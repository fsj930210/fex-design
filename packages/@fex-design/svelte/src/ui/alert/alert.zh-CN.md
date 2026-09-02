# Alert

UI Alert 将 Primitive 部件与圆形内置图标、关闭行为、Svelte snippets 和结构化样式组合为一个组件。

## 导入
```svelte
import { Alert } from '@fex-design/svelte/ui/alert'
```

## 示例
示例固定按基本展示、Type/自定义颜色、Variant、可关闭、循环公告、自定义图标与操作、LTR/RTL、语义化样式排列。

## Props 与 Snippets
`type` 默认 `info`，`variant` 默认 `filled`。`title`、`description`、`icon`、`action`、`closeIcon` 使用 Svelte 5 snippet。`showIcon` 开启内置或自定义图标，`closable` 调用 `onClose`，事件未被阻止时隐藏。原生 div 属性正常透传，`classNames`、`styles` 可定制全部语义区域。

## 无障碍
图标为装饰内容，关闭控件使用原生按钮。循环公告在悬停或聚焦时暂停，并遵循减少动态效果设置。
