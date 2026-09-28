# Progress Primitive

Progress 的原子部件集合。根组件负责进度语义和状态，轨道、填充条、数值、标签及 SVG 圆环部件由调用方组合。

## Import

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
} from '@fex-design/react/primitive/progress'
```

## Parts

| Component | Selector / Tag | Description |
| :--- | :--- | :--- |
| `Progress` | `div[data-slot="progress"]` | Root container providing `role="progressbar"`, ARIA state, and context value. |
| `ProgressTrack` | `div[data-slot="progress-track"]` | Background track container for linear progress. |
| `ProgressRange` | `div[data-slot="progress-range"]` | Filled indicator bar. Automatically synchronizes width with normalized percentage or custom value. |
| `ProgressValue` | `span[data-slot="progress-value"]` | Explicit value content slot; it renders only the children supplied by the consumer. |
| `ProgressLabel` | `span[data-slot="progress-label"]` | Accessible label associated with the progress bar. |
| `ProgressCircle` | `svg[data-slot="progress-circle"]` | SVG wrapper for circular and dashboard progress geometries. |
| `ProgressCircleTrack` | `circle[data-slot="progress-circle-track"]` | Background circle for circular progress. |
| `ProgressCircleRange` | `circle[data-slot="progress-circle-range"]` | Animated stroke circle showing filled percentage. |

## Examples

| ID | Title | Description |
| :--- | :--- | :--- |
| `basic` | Basic Linear Composition | Standard linear progress bar composed of Root, Track, and Range. |
| `circle` | Circular Progress | Circular progress indicator composed with SVG parts. |
| `compound` | Compound Layout | Top-aligned label and value header above linear progress track. |
| `multi-range` | Multi-segment Progress | Multiple indicators rendered inside a single track for segmented quotas. |
| `custom-style` | Custom Styling | Overriding track and range classes with gradient colors and custom radii. |

## API

### Progress (Root)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number \| null` | `0` | Current progress value; null means pending without a numeric value. |
| `min` | `number` | `0` | Minimum value boundary. |
| `max` | `number` | `100` | Maximum value boundary. |
| `variant` | `'line' \| 'circle' \| 'dashboard'` | `'line'` | Geometry type variant. |
| `status` | `'pending' \| 'active' \| 'success' \| 'error'` | `'pending'` | Task lifecycle status. |
| `size` | `number` | `48` | Diameter size for circle or dashboard variants. |
| `thickness` | `number` | `4` | Stroke width or track height. |

### ProgressRange

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `context.value` | Independent segment value for multi-segment tracks. |
| `offset` | `number` | `0` | Percentage offset for multi-segment positioning. |
| `color` | `ProgressColor` | `undefined` | Custom color for this indicator range. |

## Accessibility

- Follows WAI-ARIA Progressbar pattern.
- Root element has `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- Supports `aria-valuetext` when custom formatted text is used.
- Exposes `data-status="pending | active | success | error"` for styling state hooks.
