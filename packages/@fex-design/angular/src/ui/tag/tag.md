# Angular UI Tag

Recommended Tag composition. UI builds on Primitive Tag, creates TagClose when `closable` is enabled, coordinates disabled state, and exposes structured styling for the root and close parts.

## Import

    import { Tag, TagCloseIcon } from '@fex-design/angular/ui/tag'

## Components

| Component | Element | Purpose |
| --------- | ------- | ------- |
| Tag | span | Recommended composed Tag with optional close control and structured styling. |
| TagCloseIcon | projected node | Marks custom close-icon content with `[tagCloseIcon]`. |

## Examples

Examples are stored in `examples/<name>` as the source for the documentation preview.

| Name          | Covers                                                        |
| ------------- | ------------------------------------------------------------- |
| basic         | Regular tags, three sizes, closable composition, and disabled. |
| variants      | Filled, solid, and outlined visual variants.                  |
| colors        | Five semantic colors and custom CSS colors.                   |
| dynamic       | Adding and removing tags with application-owned state.        |
| css-variables | Instance-level semantic color overrides.                      |
| semantic-styles | UI-only root and close structured styling.              |

## Tag API

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| variant | 'filled' \| 'solid' \| 'outlined' | 'filled' | Visual treatment. |
| color | TagColor | — | Semantic name or any valid CSS color. |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Tag size. |
| disabled | boolean | false | Disables the generated close button and applies disabled styling. |
| closable | boolean | false | Renders the close control. |
| content | default content projection; `[tagCloseIcon]` projection | — | Tag content and optional close icon override. |
| close event | `close` output with `MouseEvent` | — | Reports activation of the generated close button. |
| classNames | TagClassNames | — | Classes for `root` and `close`. |
| styles | TagStyles | — | Framework-native styles for `root` and `close`. |
| native attributes | native span bindings | — | Native span attributes and events. |

## Close behavior

Enabling `closable` only renders and wires the close button. The component never hides itself or owns collection state. Remove the corresponding item in `close` output with `MouseEvent`. When `disabled` is true, the generated close button is also disabled.

A custom close icon completely replaces the built-in CloseIcon through default content projection; `[tagCloseIcon]` projection.

## Structured styles

`classNames.root` and `styles.root` extend the Tag root. `classNames.close` and `styles.close` extend the generated close button. Native root `class` / `className` and `style` are merged with the structured root values.

Use semantic CSS variables to change preset palettes. Use structured styles for instance-specific root or close presentation; they do not replace `variant`, `color`, or `size`.

## CSS variables

UI keeps the Primitive color contract.

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

## Content model

Angular uses default content projection; `[tagCloseIcon]` projection. This is the framework-native content API; no cross-framework slot abstraction is introduced.

## Accessibility

The generated close button has the built-in accessible name `Close`. Supply a more specific accessible name when the surrounding context does not identify the target clearly. Keep removal state in the application and restore focus predictably after removal.
