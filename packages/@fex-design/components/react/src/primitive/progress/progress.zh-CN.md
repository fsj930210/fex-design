# Progress Primitive

内置主题样式的可组合进度组件。Root 管理数值、状态和 ARIA，子部件负责线性与圆环展示。

## 导入

```ts
import { Progress, ProgressTrack, ProgressRange, ProgressValue, ProgressLabel, ProgressCircle, ProgressCircleTrack, ProgressCircleRange } from '@fex-design/react/primitive/progress'
```

```tsx
<Progress value={65} className="flex w-full flex-col">
  <ProgressTrack><ProgressRange /></ProgressTrack>
  <ProgressValue>65%</ProgressValue>
</Progress>
```

## 示例

| ID | 场景 |
| --- | --- |
| `basic` | 基础用法 |
| `circle` | 环形进度 |
| `status` | 状态 |
| `color` | 颜色 |
| `segmented` | 分段进度 |
| `size` | 尺寸 |
| `linecap` | 圆角 |
| `dashboard` | 仪表盘 |
| `dynamic` | 动态进度 |
| `direction` | LTR / RTL |
| `custom-gap` | 自定义分段间隔 |
| `format` | 格式化与信息位置 |
| `gradient` | 渐变颜色 |
| `multi-range` | 多个填充段 |

## Root API

| 属性 | Type | Default |
| --- | --- | --- |
| value | number / null | 0 |
| min | number | 0 |
| max | number | 100 |
| variant | line / circle / dashboard | line |
| status | pending / active / success / error | 根据归一化进度推导 |
| size | number | 48 |
| thickness | number | line: 8; circle/dashboard: 4 |

Root 不接受 color、trackColor、linecap、trackLinecap、gapDegree 或 gapPlacement。颜色与端点通过对应子部件的原生 class/style 和 SVG 属性设置。

## 部件

| 部件 | 语义属性 |
| --- | --- |
| ProgressTrack | 继承 Root thickness，可用原生 style 覆盖 |
| ProgressRange | value, offset |
| ProgressValue | 提供内容时才显示文本 |
| ProgressLabel | 原生内容 |
| ProgressCircle | gapDegree, rotation |
| ProgressCircleTrack | gapDegree, trackLinecap |
| ProgressCircleRange | gapDegree, linecap; 原生 stroke |

使用原生 ref prop、元素属性与事件。

## CSS

--progress-remaining 控制未完成轨道颜色。

线性条圆角通过原生 class/style 设置；SVG 描边端点由 ProgressCircleRange 和 ProgressCircleTrack 设置。
