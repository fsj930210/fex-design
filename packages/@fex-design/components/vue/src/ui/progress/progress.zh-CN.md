# Progress

基于 Progress Primitive 组装线性、圆环、仪表盘及分段进度，支持信息位置和语义样式定制。

## 导入

```ts
import { Progress } from '@fex-design/vue/ui/progress'
```

```vue
<Progress :value="65" label="Upload progress" infoPlacement="top" />
```

## 示例

| ID | 场景 |
| --- | --- |
| `basic` | 基础用法 |
| `status` | 状态 |
| `color` | 颜色 |
| `segmented` | 分段进度 |
| `size` | 尺寸 |
| `linecap` | 圆角 |
| `circle` | 环形进度 |
| `dashboard` | 仪表盘 |
| `dynamic` | 动态进度 |
| `direction` | LTR / RTL |
| `structured` | 结构化样式 |
| `custom-gap` | 自定义分段间隔 |
| `format` | 格式化与信息位置 |
| `gradient` | 渐变颜色 |
| `multi-range` | 多个填充段 |

## API

| 属性 | Type / Default |
| --- | --- |
| value / min / max | number / null; 0 / 0 / 100 |
| variant | line / circle / dashboard; line |
| status | pending / active / success / error; 自动推导 |
| size | sm / md / lg / number; line: 8, circle: 48 |
| thickness | number; line: 8, circle: 4 |
| steps / gap | number; gap: 2px |
| color | string / { from, to, direction? } / { stops, direction? } |
| trackColor | string |
| linecap / trackLinecap | round / butt / square; round |
| gapDegree | number; 75 |
| gapPlacement | top / bottom / start / end / left / right; bottom |
| showInfo / showValue | boolean / undefined |
| infoPlacement | outside / inside / top / bottom / none; outside |
| label | string |
| format | (percent, value) => string / number |
| success | boolean; false |
| classNames / styles | root, track, range, info, label, step |

信息显示优先级为 showInfo ?? showValue ?? 默认值。线性默认显示；圆环和仪表盘在 infoPlacement 为 inside 时默认显示。format 优先于成功图标，percent 为 0–100。bottom 不重复渲染顶部标签，none 不渲染信息。

普通圆环渐变使用独立的 SVG gradient ID；分段圆环按段取色。gapDegree 只用于普通仪表盘，top 使用 315° 旋转，其他 gapPlacement 值保持 React 当前默认几何旋转。线性 trackColor 和分段 trackColor 生效，普通圆环背景沿用 Primitive 的默认样式。

classNames 与 styles 作用到对应语义部件；原生根节点 style 优先于 styles.root。原生属性、事件与元素访问遵循当前框架方式。

通过 label slot 扩展标题，info 作用域 slot 接收 { percent, value }，优先于 format。

## CSS

--progress-remaining 控制未完成轨道颜色。

`ranges` 接收 `{ value, color? }` 数组，自动累计线性填充段的偏移。每项 value 为区段长度，合计值取代 value，并在 max - min 处截断；仅在 variant 为 line 且未设置 steps 时生效。

线性条圆角使用原生 class/style 或 classNames/styles；linecap、trackLinecap 仅用于圆环和仪表盘的 SVG 描边端点。
