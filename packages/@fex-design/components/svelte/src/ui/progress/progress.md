# Progress

A feature-rich, high-performance, and accessible progress component. Built on top of Progress Primitive to deliver out-of-the-box linear, circular, dashboard, and stepped progress bars.

## Import

```tsx
import { Progress } from '@fex-design/svelte/ui/progress'
```

## Examples

| ID | Title | Description |
| :--- | :--- | :--- |
| `basic` | Basic | Standard linear progress bar with top label and percentage display. |
| `status` | Status | Supports pending, active, success, and error task statuses. |
| `color` | Color | Custom solid colors, track background colors, and gradient configurations. |
| `segmented` | Segmented | Gradient stops segmented progress bar. |
| `step-line` | Step Line | Discrete stepped blocks progress bar. |
| `step-circle` | Step Circle | Circular segmented stepped progress bar with customizable gaps. |
| `size` | Size | Preset size and line thickness variations. |
| `linecap` | Linecap | Support for round, butt, and square line stroke ends. |
| `circle` | Circle | 360-degree closed circular progress indicator. |
| `dashboard` | Dashboard | Dashboard arch with configurable gap degree and placement. |
| `dynamic` | Dynamic | Interactive dynamic controls. |

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
