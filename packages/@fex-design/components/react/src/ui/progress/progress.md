# Progress

用于展示任务完成程度的 UI 进度组件，提供线性、环形、仪表盘和步进形态。

## Import

```tsx
import { Progress } from '@fex-design/react/ui/progress'
```

## Examples

| ID | Title | Description |
| :--- | :--- | :--- |
| `basic` | 基础用法 | 在线性进度条中显示标签和数值。 |
| `status` | 状态 | 展示未开始、进行中、成功和失败状态。 |
| `color` | 颜色 | 自定义填充色、轨道色和渐变。 |
| `segmented` | 分段进度 | 展示带断点的线性和环形进度。 |
| `step-line` | 线性步进 | 展示离散的线性步进格。 |
| `step-circle` | 环形步进 | 展示带间隙的环形步进格。 |
| `size` | 尺寸 | 对比不同线条粗细。 |
| `linecap` | 端点形状 | 对比圆角、平截和方角端点。 |
| `circle` | 环形进度 | 展示完整环形进度。 |
| `dashboard` | 仪表盘 | 展示带缺口的仪表盘进度。 |
| `dynamic` | 动态进度 | 通过交互更新进度值。 |

## Props API

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number \| null` | `0` | Current progress value; null means pending without a numeric value. |
| `min` | `number` | `0` | Minimum value boundary. |
| `max` | `number` | `100` | Maximum value boundary. |
| `variant` | `'line' \| 'circle' \| 'dashboard'` | `'line'` | Shape variant of the progress indicator. |
| `status` | `'pending' \| 'active' \| 'success' \| 'error'` | `'pending'` | Task lifecycle status. |
| `size` | `'sm' \| 'md' \| 'lg' \| number` | `'md'` | Preset size or diameter dimension. |
| `thickness` | `number` | `variant === 'line' ? 8 : 6` | Track thickness / stroke width in pixels. |
| `steps` | `number` | `undefined` | Number of discrete stepped segments for linear or circular steps. |
| `gap` | `number` | `2` | Gap spacing in pixels between circular steps. |
| `showInfo` | `boolean` | `true` for line, `false` for circle | Whether to display progress percentage or icon. |
| `infoPlacement` | `'outside' \| 'inside' \| 'top' \| 'none'` | `'outside'` | Placement position of the progress text label. |
| `label` | `ReactNode` | `undefined` | Title label displayed alongside the progress bar. |
| `format` | `function` | `undefined` | Custom formatter function returning text or icon for progress. |
| `color` | `ProgressColor` | `undefined` | Custom fill color, hex, variable, or gradient object. |
| `trackColor` | `string` | `undefined` | Background track color override. |
| `linecap` | `'round' \| 'butt' \| 'square'` | `'round'` | Stroke line cap style for progress range. |
| `trackLinecap` | `'round' \| 'butt' \| 'square'` | `'round'` | Stroke line cap style for background track. |
| `gapDegree` | `number` | `75` | Gap angle in degrees for dashboard variant. |
| `gapPlacement` | `'top' \| 'bottom' \| 'start' \| 'end'` | `'bottom'` | Location of the gap opening for dashboard variant. |
| `classNames` | `object` | `undefined` | Fine-grained class overrides for root, track, range, info, label, step. |
| `styles` | `object` | `undefined` | Fine-grained style overrides for root, track, range, info, label, step. |
