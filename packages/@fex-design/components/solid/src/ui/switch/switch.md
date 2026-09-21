# Solid UI Switch

An immediate boolean control. Rounded and pill are equal shape options, and every example shows both.

## Import

    import { Switch } from '@fex-design/solid/ui/switch'

## API

| Name                              | Type                     | Default   | Description                                  |
| --------------------------------- | ------------------------ | --------- | -------------------------------------------- |
| checked                           | boolean                  | —         | Controlled checked state.                    |
| defaultChecked                    | boolean                  | false     | Initial uncontrolled state.                  |
| onChange / change                 | (checked, event)         | —         | Fires when the user requests a state change. |
| size                              | 'sm' \| 'md' \| 'lg'     | 'md'      | Switch size.                                 |
| shape                             | 'rounded' \| 'pill'      | 'rounded' | Track and thumb shape.                       |
| loading                           | boolean                  | false     | Shows progress and prevents interaction.     |
| disabled                          | boolean                  | false     | Prevents interaction.                        |
| checkedContent / uncheckedContent | Framework content        | —         | Text or icon shown for each state.           |
| classNames                        | root/content/thumb class | —         | Classes for semantic parts.                  |
| styles                            | root/content/thumb style | —         | Inline styles for semantic parts.            |

## Examples

Examples are ordered as basic, shape, size, content, loading, disabled, validation, controlled/uncontrolled, LTR/RTL, and CSS variables, and semantic styles. The controlled example is driven by external buttons.

## CSS Variables

| Name                                | Description           |
| ----------------------------------- | --------------------- |
| --switch-track-height               | Current track height. |
| --switch-track-background           | Switch visual token.  |
| --switch-track-checked-background   | Switch visual token.  |
| --switch-track-border-color         | Switch visual token.  |
| --switch-track-checked-border-color | Switch visual token.  |
| --switch-color                      | Switch visual token.  |
| --switch-checked-color              | Switch visual token.  |
| --switch-thumb-background           | Switch visual token.  |
| --switch-thumb-color                | Switch visual token.  |
| --switch-thumb-size                 | Switch visual token.  |
| --switch-thumb-radius               | Switch visual token.  |

## Accessibility

The root is a native button with role=switch and aria-checked. Give every switch an accessible name. Use aria-invalid with aria-describedby for validation messages.
