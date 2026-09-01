# Angular Primitive Badge

Composable primitives for short values, status dots, ribbons, and badge collections. Primitive owns badge rendering and collection overflow; attachment positioning belongs to UI.

## Import

    import { Badge, BadgeDot, BadgeGroup, BadgeRibbon } from '@fex-design/angular/primitive/badge'

## Components

| Component | Host | Purpose |
| --- | --- | --- |
| Badge | `badge` | Short value or count with semantic or custom color. |
| BadgeDot | `span[badgeDot]` | Standalone status dot without numeric content. |
| BadgeGroup | `badge-group` | Badge layout with optional `maxCount` and `+N` overflow. |
| BadgeRibbon | `span[badgeRibbon]` | Standalone ribbon marker; the consumer owns its containing block. |

## Examples

Examples in `examples/<name>` cover values, custom content, zero handling, numeric overflow, dots, colors, groups, direction, and ribbons.

## Badge API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| count | framework-native content | — | Badge value; numbers can be capped by `overflowCount`. |
| showZero | boolean | false | Shows numeric `0`; otherwise a count-only zero badge is hidden. |
| overflowCount | number | — | Replaces larger numeric counts with `N+`. |
| color | preset or CSS color | danger | Semantic preset or any CSS color. |
| size | 'sm' \\| 'md' \\| 'lg' | md | Badge size. |
| content | content projection | — | Content used when `count` is absent. |
| native attributes | native host bindings | — | native host attributes and `element`. |

## BadgeDot API

`BadgeDot` accepts `color`, `size`, and native host attributes. It has no count or status-name mapping.

## BadgeGroup API

`BadgeGroup` accepts `maxCount` and projected Badge children plus optional overflow TemplateRef. Without `maxCount`, all items remain visible; the default overflow node is `+N`.

## BadgeRibbon API

`BadgeRibbon` accepts `color`, logical `placement="start" | "end"`, and content projection. Default placement is `end`; default color is `primary`.

## Direction and accessibility


## CSS Variables

`--badge-height`, `--badge-min-width`, `--badge-padding-inline`, and `--badge-font-size` customize Badge geometry. `--badge-dot-size` customizes BadgeDot; `--badge-color` and `--badge-color-foreground` customize colors.

## Direction and accessibility
Logical placement follows native `dir="ltr"` / `dir="rtl"`. Badge is presentational by default; add an accessible label when color or a number carries otherwise unavailable meaning.
