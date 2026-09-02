# Angular Primitive Tag

Styled Tag primitives for compact categories, attributes, and status values. Primitive exposes the root `Tag` and the composable `TagClose` button without owning removal state.

## Import

    import { Tag, TagClose } from '@fex-design/angular/primitive/tag'

## Components

| Component | Element | Purpose |
| --------- | ------- | ------- |
| Tag | span | Inherits the native span; renders variant, color, size, and disabled styling. |
| TagClose | button | Inherits the native button; renders CloseIcon by default and accepts complete custom content. |

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
| content | `<ng-content />` | — | Tag content. |
| native attributes | native span bindings | — | Native span attributes and events. |

## TagClose API

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| disabled | boolean | false | Disables the native close button. |
| content | `<ng-content />` | CloseIcon | Completely replaces the default close icon when provided. |
| events | native `(click)` event | — | Native button events; Primitive adds no close-specific event. |
| native attributes | native button bindings | — | Native button attributes and events. |

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

Content follows Angular's native model: `<ng-content />`. Place `TagClose` inside `Tag` when Primitive composition needs a close control. `TagClose` does not remove its parent and does not coordinate the parent disabled state.

## Accessibility

Use concise visible text. Give every `TagClose` an accessible name that identifies the affected tag. Removal must happen in the native click handler and focus should move to a predictable nearby control when the removed tag held focus.
