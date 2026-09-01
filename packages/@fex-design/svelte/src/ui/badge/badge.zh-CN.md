# Svelte UI Badge

可直接使用的附着式 Badge 与 Ribbon。UI 增加附着结构、位置偏移和结构化样式；BadgeGroup 直接重导出 Primitive 实现。

## 导入

    import { Badge, BadgeGroup, BadgeRibbon } from '@fex-design/svelte/ui/badge'

## 组件

| 组件 | 说明 |
| --- | --- |
| Badge | 独立展示徽标，或把数字/小圆点附着到内容上。 |
| BadgeGroup | Primitive 集合布局，支持 `maxCount` 和 `+N`。 |
| BadgeRibbon | 包裹内容，并把 Ribbon 定位到逻辑起始或结束边缘。 |

## Badge API

Badge 保留 Primitive 的 `count`、`showZero`、`overflowCount`、`color` 和 `size`，并增加：

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| dot | boolean | false | 附着小圆点而不是数字。 |
| size | 'sm' \\| 'md' \\| 'lg' | md | 独立或附着指示器的尺寸。 |
| offset | `[inline, block]` | — | 相对默认右上角位置移动指示器。 |
| classNames | root/content/indicator 映射 | — | 设置附着结构各部分 class。 |
| styles | root/content/indicator 映射 | — | 设置附着结构各部分样式。 |
| 内容 | children Snippet | — | 被附着内容；没有内容时作为独立徽标。 |

## BadgeGroup API

BadgeGroup 沿用 Primitive 语义：`items`, required `item` Snippet, and optional `overflow` Snippet，以及可选的 `maxCount`。

## BadgeRibbon API

BadgeRibbon 使用框架原生输入和 children Snippet 区分 Ribbon 标记与被包裹内容；`color` 和 `placement` 沿用 Primitive 语义。

## 结构化样式

`classNames` and `styles` props 分别作用于 `root`、`content` 和 `indicator`，无需替换组件结构。

## 示例


## CSS Variables

Badge 和 BadgeDot 沿用 Primitive 变量。`--badge-color` 覆盖单个指示器；`--badge-color-{primary|info|success|warning|danger}` 及对应的 `-foreground` 变量用于在组件作用域内覆盖语义色。

## 示例
示例覆盖附着、零值、封顶、小圆点、颜色、集合、LTR/RTL、独立使用、位置偏移、结构化样式和 Ribbon。
