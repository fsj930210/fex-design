# Badge Primitive

Primitive 提供 `Badge`、`BadgeDot`、`BadgeRibbon` 和 `BadgeGroup`。`BadgeGroup` 负责集合布局、`maxCount` 与 `+N` 溢出；附着定位仍由 UI 层负责。

## 用途

`Badge` 用于状态、分类、标签和短计数展示，不内置业务映射。

## 导入路径

```tsx
import { Badge } from '@fex-design/react/primitive/badge'
```

## 核心示例

```tsx
<Badge color="warning">Pending</Badge>
```

## Props

| 参数        | 类型         | 默认值      | 必填 | 说明                                |
| ----------- | ------------ | ----------- | ---- | ----------------------------------- |
| `color`     | `BadgeColor` | —           | 否   | 五种内置语义颜色或任意 CSS 颜色值。 |
| `className` | `string`     | `undefined` | 否   | 合并到根元素的 class。              |
| `children`  | `ReactNode`  | `undefined` | 否   | 徽标内容。                          |

## 事件与状态

组件继承 `span` 原生属性与事件，没有受控状态。需要可点击语义时应使用合适的交互元素。
