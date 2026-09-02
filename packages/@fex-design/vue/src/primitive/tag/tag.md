# Vue Primitive Tag

Styled Tag primitives for compact categories, attributes, and status values. Primitive exposes the root `Tag` and the composable `TagAction` button without prescribing the action or owning application state.

## Import

    import { Tag, TagAction } from '@fex-design/vue/primitive/tag'

## Components

| Component | Element | Purpose |
| --------- | ------- | ------- |
| Tag | span | Inherits the native span; renders variant, color, size, and disabled styling. |
| TagAction | button | Inherits the native button; renders CloseIcon by default and accepts complete custom content. |

## Examples

Examples are stored in `examples/<name>` as the source for the documentation preview.

| Name          | Covers                                                        |
| ------------- | ------------------------------------------------------------- |
| basic         | Regular tags, three sizes, closable composition, and disabled. |
| variants      | Filled, solid, and outlined visual variants.                  |
| colors        | Five semantic colors and custom CSS colors.                   |
| dynamic       | Adding and removing tags with application-owned state.        |
| css-variables | Instance-level semantic color overrides.                      |
| direction     | Native LTR and RTL direction with logical close placement.    |

## Tag API

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| variant | 'filled' \| 'solid' \| 'outlined' | 'filled' | Visual treatment. |
| color | TagColor | — | primary, success, warning, danger, info, or any valid CSS color. |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Tag size. |
| disabled | boolean | false | Applies disabled semantics and styling to the tag. |
| content | default slot | — | Tag content. |
| native attributes | Vue span attrs | — | Native span attributes and events. |

## TagAction API

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| disabled | boolean | false | Disables the native action button. |
| content | default slot | CloseIcon | Completely replaces the default close icon when provided. |
| events | native `click` listener | — | Native button events; Primitive adds no action-specific event. |
| native attributes | Vue button attrs | — | Native button attributes and events. |

## Variants and colors

`variant` controls visual emphasis: `filled` uses a light color surface, `solid` uses a solid background and foreground pair, and `outlined` uses a transparent surface with a colored border. `color` accepts the five semantic names or a custom CSS color such as `#7c3aed` or `oklch(...)`.

No default semantic color is injected. When `color` is omitted, the neutral fallback is used.

## CSS variables

Preset colors can be overridden globally, by region, or on one Tag instance.

| Variable                         | Purpose                                |
| -------------------------------- | -------------------------------------- |
| `--tag-color-primary`            | Primary semantic color.                |
| `--tag-color-primary-foreground` | Foreground used by solid primary tags. |
| `--tag-color-success`            | Success semantic color.                |
| `--tag-color-success-foreground` | Foreground used by solid success tags. |
| `--tag-color-warning`            | Warning semantic color.                |
| `--tag-color-warning-foreground` | Foreground used by solid warning tags. |
| `--tag-color-danger`             | Danger semantic color.                 |
| `--tag-color-danger-foreground`  | Foreground used by solid danger tags.  |
| `--tag-color-info`               | Info semantic color.                   |
| `--tag-color-info-foreground`    | Foreground used by solid info tags.    |

Tag dimensions are controlled by the `size` API; no public size variables are exposed.

## Content and composition

Content follows Vue's native model: default slot. Place `TagAction` inside `Tag` for an inline operation. It defaults to CloseIcon, while custom content can represent remove, edit, more, or another action. `TagAction` does not prescribe behavior or coordinate the parent disabled state.

## Accessibility

Use concise visible text. Give every `TagAction` an accessible name that describes its operation and target. Handle the operation in the native click event; after destructive actions, move focus to a predictable nearby control.
