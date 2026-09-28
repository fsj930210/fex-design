# Progress Primitive 进度条原子组件

无头且开箱附带高质感样式的原子进度指示器组件族。将进度条拆解为完全解耦的原子零件，支持用户以最高的自由度拼装排版线性或环形进度条，同时保证完整的 WAI-ARIA 可访问性语义。

## 导入

```tsx
import {
  Progress,
  ProgressTrack,
  ProgressRange,
  ProgressValue,
  ProgressLabel,
  ProgressCircle,
  ProgressCircleTrack,
  ProgressCircleRange,
} from '@fex-design/solid/primitive/progress'
```

## 部件构成

| 组件名 | 槽位 / 标识 | 说明 |
| :--- | :--- | :--- |
| `Progress` | `div[data-slot="progress"]` | 根容器组件，提供 `role="progressbar"`、ARIA 无障碍属性以及进度 Context。 |
| `ProgressTrack` | `div[data-slot="progress-track"]` | 线性进度条的背景轨道容器。 |
| `ProgressRange` | `div[data-slot="progress-range"]` | 填充指示条，自带平滑宽度过渡动画。自动从 Context 读取百分比或接收独立数值。 |
| `ProgressValue` | `span[data-slot="progress-value"]` | 数值展示文本，支持格式化函数与自定义插槽。 |
| `ProgressLabel` | `span[data-slot="progress-label"]` | 进度条名称/标签文本，关联无障碍语义。 |
| `ProgressCircle` | `svg[data-slot="progress-circle"]` | 环形/仪表盘 SVG 根容器，自动计算尺寸与旋转偏移行程。 |
| `ProgressCircleTrack` | `circle[data-slot="progress-circle-track"]` | 环形底圈描边。 |
| `ProgressCircleRange` | `circle[data-slot="progress-circle-range"]` | 环形填充圆弧，自动根据百分比与周长计算描边虚线偏移。 |

## 示例清单

| 示例 ID | 场景标题 | 说明 |
| :--- | :--- | :--- |
| `basic` | 基础条形原子组合 | 由 ProgressRoot、ProgressTrack 与 ProgressRange 构成的标准条形进度条。 |
| `circle` | 环形进度条组合 | 使用 SVG 原子零件组合的环形进度指标。 |
| `compound` | 复合布局排版 | 顶部展示标题与百分比，中间展示进度条的经典两行排版。 |
| `multi-range` | 多段复合进度条 | 在同一个轨道内放置多条不同色彩的 Range，用于磁盘配额等占比展示。 |
| `custom-style` | 自定义样式扩展 | 通过 className 与 style 深度定制圆角、高度与色彩渐变。 |

## API 规范

### Progress (Root 根组件)

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `value` | `number \| null` | `0` | 当前进度值；null 表示尚未提供进度值。 |
| `min` | `number` | `0` | 进度最小值边界。 |
| `max` | `number` | `100` | 进度最大值边界。 |
| `variant` | `'line' \| 'circle' \| 'dashboard'` | `'line'` | 几何形态变体。 |
| `status` | `'pending' \| 'active' \| 'success' \| 'error'` | `'pending'` | 任务生命周期状态。 |
| `size` | `number` | `48` | 环形或仪表盘的直径尺寸。 |
| `thickness` | `number` | `4` | 轨道高度或环形描边粗细。 |
| `color` | `ProgressColor` | `undefined` | 自定义填充色彩或双色渐变配置。 |
| `trackColor` | `string` | `undefined` | 自定义底轨背景色或描边色。 |

### ProgressRange (填充指示条)

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `context.value` | 独立段落数值，常用于单轨道内的多段复合排布。 |
| `offset` | `number` | `0` | 百分比起始偏移位置，用于多段进度拼接。 |
| `color` | `ProgressColor` | `context.color` | 覆盖当前填充条的特定色彩或渐变。 |

## 无障碍设计

- 严格遵循 W3C WAI-ARIA Progressbar 设计规范。
- 根元素默认声明 `role="progressbar"`，并实时同步 `aria-valuenow`、`aria-valuemin`、`aria-valuemax` 与 `aria-valuetext`。
- 自动对外输出 `data-status="pending | active | success | error"` 属性选择器，方便结合 CSS 实现状态样式。
