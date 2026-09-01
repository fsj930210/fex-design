# React Primitive Badge

Composable primitives for short values, status dots, ribbons, and badge collections. Primitive owns badge rendering and collection overflow; attachment positioning belongs to UI.

## Import

    import { Badge, BadgeDot, BadgeGroup, BadgeRibbon } from '@fex-design/react/primitive/badge'

## Components

| Component | Element | Purpose |
| --- | --- | --- |
| Badge | span | Short value or count with semantic or custom color. |
| BadgeDot | span | Standalone status dot without numeric content. |
| BadgeGroup | div | Badge layout with optional `maxCount` and `+N` overflow. |
| BadgeRibbon | span | Standalone ribbon marker; the consumer owns its containing block. |

## Examples

Examples in `examples/<name>` cover values, custom content, zero handling, numeric overflow, dots, colors, groups, direction, and ribbons.

## Badge API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| count | ReactNode | — | Badge value; numbers can be capped by `overflowCount`. |
| showZero | boolean | false | Shows numeric `0`; otherwise a count-only zero badge is hidden. |
| overflowCount | number | — | Replaces larger numeric counts with `N+`. |
| color | preset or CSS color | danger | Semantic preset or any CSS color. |
| size | 'sm' \\| 'md' \\| 'lg' | md | Badge size. |
| children | ReactNode | — | Content used when `count` is absent. |
| native attributes | ComponentProps<'span'> | — | Native span attributes and events. |

## BadgeDot API

`BadgeDot` accepts `color`, `size`, and native span attributes. It has no count or status-name mapping.

## BadgeGroup API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| maxCount | number | — | Maximum visible child count. |
| overflow | `(count, items) => ReactNode` | built-in `+N` | Custom overflow renderer. |
| children | ReactNode | — | Badge items. |

## BadgeRibbon API

`BadgeRibbon` accepts `color`, logical `placement="start" | "end"`, children, and native span attributes. Default placement is `end`; default color is `primary`.

## Direction and accessibility


## CSS Variables

`--badge-height`, `--badge-min-width`, `--badge-padding-inline`, and `--badge-font-size` customize Badge geometry. `--badge-dot-size` customizes BadgeDot; `--badge-color` and `--badge-color-foreground` override one instance. Use `--badge-color-{primary|info|success|warning|danger}` and the matching `-foreground` variables to override Badge semantic colors within a scope.

## Direction and accessibility
Logical placement follows native `dir="ltr"` / `dir="rtl"`. Badge is presentational by default; add an accessible label when color or a number carries otherwise unavailable meaning.
