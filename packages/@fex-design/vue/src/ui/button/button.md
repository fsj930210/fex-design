# Vue UI Button

Recommended Button with variants, sizes, effects, icons and loading state. ButtonGroup is re-exported from this entry.

## Import

    import { Button, ButtonGroup } from '@fex-design/vue/ui/button'

## Examples

Examples are stored in `examples/<name>` as the source for the documentation preview.

| Name              | Covers                                                                        |
| ----------------- | ----------------------------------------------------------------------------- |
| basic             | Default and outline buttons.                                                  |
| variants          | Every visual variant.                                                         |
| sizes             | Text and icon-only sizes.                                                     |
| effects           | Every opt-in interaction effect.                                              |
| icons             | Start, end, and icon-only content.                                            |
| loading           | Default loading states and placement.                                         |
| loading-indicator | Custom loading indicator.                                                     |
| states            | Native form behavior, disabled state, attributes, events, and element access. |
| group             | Connected, spaced, horizontal, and vertical groups.                           |
| combinations      | Multi-prop combinations plus LTR and RTL direction.                           |

## Button API

| Name              | Type                                                                                                                          | Default              | Description                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------- |
| variant           | 'solid' \| 'outlined' \| 'dashed' \| 'filled' \| 'text' \| 'link'                                                               | 'solid'              | Structural variant.                               |
| color             | 'primary' \| 'danger' \| 'warning' \| 'success' \| 'info'                                                                    | —                    | Optional semantic color; unset uses the default white button. |
| size              | 'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl' \| 'icon-xs' \| 'icon-sm' \| 'icon' \| 'icon-lg' \| 'icon-xl'                       | 'default'            | Control size.                                     |
| effect            | 'expand-icon' \| 'ring-hover' \| 'shine-hover' \| 'gooey-start' \| 'gooey-end' \| 'underline' \| 'hover-underline' \| 'press' | undefined            | Optional interaction effect; disabled by default. |
| icon              | framework content                                                                                                             | undefined            | Normal-state icon.                                |
| iconPlacement     | start or end                                                                                                                  | start                | Icon or indicator position.                       |
| loading           | boolean                                                                                                                       | false                | Loading state; disables interaction.              |
| loadingIndicator  | framework content                                                                                                             | built-in LoadingIcon | Loading visual override.                          |
| disabled          | boolean                                                                                                                       | false                | Disabled state.                                   |
| type              | native button type                                                                                                            | button               | Native button type.                               |
| native attributes | Vue button attrs                                                                                                              | —                    | Native attributes and events.                     |
| element access    | exposed ref                                                                                                                   | —                    | Native HTMLButtonElement.                         |

## Variants

`default`, `outline`, `secondary`, `ghost`, `destructive`, `link`, and `dashed`.

## Effects

`expand-icon`, `ring-hover`, `shine-hover`, `gooey-start`, `gooey-end`, `underline`, `hover-underline`, and `press`.

All effects are opt-in. `press` only provides feedback while pressed. `gooey-start` and `gooey-end` use logical directions and mirror automatically with `dir="ltr"` / `dir="rtl"`. Button has no infinitely looping decorative effect while idle.

## Direction

Set the native `dir="ltr"` or `dir="rtl"` attribute. Icon placement, gooey direction, underline motion, and connected ButtonGroup layout all use logical `start` / `end` directions.

## Content API

default / icon / loadingIndicator slots

## ButtonGroup API

ButtonGroup keeps the Primitive API: orientation, spacing, native div attributes, and native element behavior.
