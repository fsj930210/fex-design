# Alert

UI Alert 在 Primitive 之上提供圆形状态图标、可选关闭行为和结构化样式。

## 导入
```tsx
import { Alert } from '@fex-design/solid/ui/alert'
```

## 示例
示例固定按基本展示、Type/自定义颜色、Variant、可关闭、循环公告、自定义图标与操作、LTR/RTL、语义化样式排列。

## API
`type` 默认 `info`，`variant` 默认 `filled`。`title`、`description`、`icon`、`action`、`closeIcon` 接收 Solid `JSX.Element`。`showIcon` 控制图标渲染；`closable` 触发 `onClose`，事件未被阻止时隐藏。原生 div 属性保持可用，`classNames`、`styles` 可定制每个语义区域。

## 无障碍
状态图标为装饰内容，关闭按钮支持键盘。循环公告在悬停或聚焦时暂停，并遵循减少动态效果设置。
