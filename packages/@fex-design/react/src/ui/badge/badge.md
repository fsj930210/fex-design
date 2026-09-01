# React UI Badge

Ready-to-use attached Badge and Ribbon components. UI adds attachment structure, offset, and part styling; BadgeGroup is re-exported from Primitive.

## Import

    import { Badge, BadgeGroup, BadgeRibbon } from '@fex-design/react/ui/badge'

## Components

| Component | Purpose |
| --- | --- |
| Badge | Standalone badge or count/dot attached to content. |
| BadgeGroup | Primitive collection layout with `maxCount` and `+N`. |
| BadgeRibbon | Content wrapper with a ribbon at its logical start or end edge. |

## Badge API

Badge keeps Primitive `count`, `showZero`, `overflowCount`, `color`, and `size`, then adds:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dot | boolean | false | Attaches a dot instead of a count. |
| size | 'sm' \\| 'md' \\| 'lg' | md | Standalone or attached indicator size. |
| offset | `[inline, block]` | — | Moves the indicator from the default top-end position. |
| classNames | `{ root?, content?, indicator? }` | — | Classes for attachment parts. |
| styles | `{ root?, content?, indicator? }` | — | Styles for attachment parts. |
| children | ReactNode | — | Attached content; without children the badge is standalone. |

## BadgeGroup API

BadgeGroup keeps the Primitive `maxCount`, `overflow`, children, and native div behavior.

## BadgeRibbon API

`text` supplies the ribbon marker; `children` supplies wrapped content. `color` and `placement` keep Primitive Ribbon semantics.

## Structured styling

`classNames` and `styles` target `root`, `content`, and `indicator` without replacing the attachment structure.

## Examples


## CSS Variables

Badge and BadgeDot use the Primitive variables. `--badge-color` overrides one indicator; `--badge-color-{primary|info|success|warning|danger}` and the matching `-foreground` variables override semantic colors within a scope.

## Examples
Examples cover attachment, zero, overflow, dots, colors, groups, LTR/RTL, standalone badges, offset, structured styling, and ribbons.
