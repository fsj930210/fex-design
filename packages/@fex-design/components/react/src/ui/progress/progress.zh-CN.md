# Progress 进度条

展示操作或任务当前完成进度的反馈组件。基于 Progress Primitive 构建，开箱即用支持线性进度条、环形进度条、仪表盘以及离散分段步进格。

## 导入

```tsx
import { Progress } from '@fex-design/react/ui/progress'
```

## 示例清单

| 示例 ID | 场景标题 | 说明 |
| :--- | :--- | :--- |
| `basic` | Basic 基础条形 | 基础线性进度条，支持顶部展示标签与百分比数值。 |
| `status` | 状态 | pending、active、success、error 四种任务生命周期状态。 |
| `color` | Color 自定义色彩 | 支持自定义纯色、背景轨道底色以及双色渐变。 |
| `segmented` | Segmented 分段渐变 | 多断点硬停靠渐变进度条。 |
| `step-line` | Step Line 线性步进 | 线性离散小方块步进格进度条。 |
| `step-circle` | Step Circle 环形步进 | 环形离散分段格进度条，支持间隙定制。 |
| `size` | Size 尺寸与粗细 | 预设尺寸与不同线条粗细演示。 |
| `linecap` | Linecap 端点样式 | 支持 round (圆角), butt (平截), square (直角方形) 端点风格。 |
| `circle` | Circle 环形进度 | 360 度闭环圆环形进度条。 |
| `dashboard` | Dashboard 仪表盘 | 带有底部或顶部缺口的弧形仪表盘进度条。 |
| `dynamic` | Dynamic | 外部动态联动增减。 |

## Props 属性规范

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `value` | `number \| null` | `0` | 当前进度值 (0 ~ 100)。传入 `null` 时自动进入不确定流动动画。 |
| `min` | `number` | `0` | 进度最小值边界。 |
| `max` | `number` | `100` | 进度最大值边界。 |
| `variant` | `'line' \| 'circle' \| 'dashboard'` | `'line'` | 进度条的展现形态变体。 |
| `status` | `'pending' \| 'active' \| 'success' \| 'error'` | `'pending'` | 任务生命周期状态。 |
| `size` | `'sm' \| 'md' \| 'lg' \| number` | `'md'` | 预设尺寸等级或具体的环形直径数值。 |
| `thickness` | `number` | 线性为 `8`，环形为 `6` | 轨道高度或描边粗细（像素）。 |
| `steps` | `number` | `undefined` | 离散步进格数，支持线性分段块与环形分段块。 |
| `gap` | `number` | `2` | 环形分段步进格之间的间距角度（像素/弧度）。 |
| `showInfo` | `boolean` | 线性为 `true`，环形为 `false` | 是否在末端或中心显示进度百分比或状态图标。 |
| `infoPlacement` | `'outside' \| 'inside' \| 'top' \| 'none'` | `'outside'` | 进度数值文本的排版位置。 |
| `label` | `ReactNode` | `undefined` | 进度条标题，配合 `infoPlacement="top"` 实现两端对齐排版。 |
| `format` | `function` | `undefined` | 自定义格式化函数，返回自定义进度文字或图标。 |
| `color` | `ProgressColor` | `undefined` | 自定义填充色、CSS 变量、Hex 或双色渐变对象 `{ from, to }`。 |
| `trackColor` | `string` | `undefined` | 覆盖底轨背景色彩。 |
| `linecap` | `'round' \| 'butt' \| 'square'` | `'round'` | 进度填充弧线的端点形状。 |
| `trackLinecap` | `'round' \| 'butt' \| 'square'` | `'round'` | 轨道底弧线的端点形状。 |
| `gapDegree` | `number` | `75` | 仪表盘开口角度（度数）。 |
| `gapPlacement` | `'top' \| 'bottom' \| 'start' \| 'end'` | `'bottom'` | 仪表盘开口缺口的朝向方位。 |
| `classNames` | `object` | `undefined` | 细粒度 className 自定义覆盖（root, track, range, info, label, step）。 |
| `styles` | `object` | `undefined` | 细粒度行内 style 自定义覆盖。 |
