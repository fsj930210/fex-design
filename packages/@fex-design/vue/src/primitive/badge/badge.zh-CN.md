# Vue Primitive Badge

用于短值、状态点、Ribbon 和徽标集合的可组合原子组件。Primitive 负责徽标渲染与集合溢出；附着定位属于 UI。

## 导入

    import { Badge, BadgeDot, BadgeGroup, BadgeRibbon } from '@fex-design/vue/primitive/badge'

## 组件

| 组件 | 宿主 | 说明 |
| --- | --- | --- |
| Badge | span | 展示短文本或计数，支持语义色和自定义颜色。 |
| BadgeDot | span | 展示不带数字内容的独立状态小圆点。 |
| BadgeGroup | 分组容器 | 排列徽标，并可用 `maxCount` 收起为 `+N`。 |
| BadgeRibbon | span | 展示独立 Ribbon 标记；包含块由使用方提供。 |

## 示例

`examples/<name>` 覆盖基础值、自定义内容、零值、数字封顶、小圆点、颜色、集合、书写方向和 Ribbon。

## Badge API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| count | 框架原生内容类型 | — | 徽标值；数字可由 `overflowCount` 封顶。 |
| showZero | boolean | false | 是否显示数字 `0`。 |
| overflowCount | number | — | 数字超过限制后显示为 `N+`。 |
| color | 预设色或 CSS 颜色 | danger | 语义预设色或任意 CSS 颜色。 |
| size | 'sm' \\| 'md' \\| 'lg' | md | 徽标尺寸。 |
| 内容 | default slot | — | 未传 `count` 时展示的内容。 |
| 原生属性 | Vue span attrs | — | attrs and exposed element behavior。 |

## BadgeDot API

`BadgeDot` 接受 `color`、`size` 和原生宿主属性，不提供额外的 status 名称映射。

## BadgeGroup API

`BadgeGroup` 接受 `maxCount`，集合内容使用 default slot plus scoped `overflow` slot with `{ count, items }`。不传 `maxCount` 时显示全部项目，默认溢出节点为 `+N`。

## BadgeRibbon API

`BadgeRibbon` 接受 `color`、逻辑位置 `placement="start" | "end"` 和 default slot。默认位置为 `end`，默认颜色为 `primary`。

## 书写方向与无障碍


## CSS Variables

`--badge-height`、`--badge-min-width`、`--badge-padding-inline` 和 `--badge-font-size` 用于调整 Badge；`--badge-dot-size` 用于调整 BadgeDot；`--badge-color` 和 `--badge-color-foreground` 用于调整颜色。

## 书写方向与无障碍
逻辑位置跟随原生 `dir="ltr"` / `dir="rtl"`。Badge 默认是展示元素；当颜色或数字承载独立含义时，应补充无障碍标签。
