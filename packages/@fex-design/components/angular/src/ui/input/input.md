# Angular UI Input

Ready-to-use `Input`, `InputPassword`, and `InputSearch` built from the Primitive Input parts. `InputGroup` is re-exported unchanged.

## Import

    import { Input, InputPassword, InputSearch, InputGroup } from '@fex-design/angular/ui/input'

## Examples

| Name            | Covers                                                               |
| --------------- | -------------------------------------------------------------------- |
| basic           | Empty and clearable Input.                                           |
| sizes           | `sm`, `md`, and `lg`, matching the Primitive scenario.               |
| variants        | All four structural variants.                                        |
| controlled      | Controlled and uncontrolled values plus external updates.            |
| affixes         | Prefix, Suffix, Addons, icon content, and an inline text action.     |
| group           | Input with Button and Input with Input.                              |
| password        | Visibility toggle, hidden toggle action, clear, and `aria-invalid`.  |
| search          | Loading, Enter-only search, Prefix search, and Addon search actions. |
| states          | Disabled, read-only, and invalid Input family states.                |
| validation      | Invalid styling with an error message linked by `aria-describedby`.  |
| focus           | Imperative focus, blur, and select.                                  |
| semantic-styles | Part classes/styles, selector overrides, and base CSS variables.     |

## Input API

| Name                     | Type                                                                               | Default      | Description                                                           |
| ------------------------ | ---------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------- |
| value                    | string                                                                             | —            | Controlled value.                                                     |
| defaultValue             | string                                                                             | `''`         | Uncontrolled initial value.                                           |
| size                     | `'sm' \| 'md' \| 'lg'`                                                             | `'md'`       | 24px, 32px, or 44px height.                                           |
| variant                  | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'`                           | `'outlined'` | Visual structure.                                                     |
| clearable                | boolean                                                                            | false        | Enables the interaction-only clear action.                            |
| prefix / suffix          | Content inputs accept strings or `TemplateRef`; Primitive uses content projection. | —            | Content inside InputRoot; non-interactive on regular Input.           |
| addonBefore / addonAfter | Content inputs accept strings or `TemplateRef`; Primitive uses content projection. | —            | Content outside the Input focus ring.                                 |
| classNames               | part-class map                                                                     | —            | Classes for root, control, prefix, suffix, clear, addons, and action. |
| styles                   | part-style map                                                                     | —            | Native style values for the same semantic parts.                      |
| native attributes        | native attributes and events on `input[inputControl]`                              | —            | Native input attributes and events.                                   |

## InputPassword

Adds `visibilityToggle` (default `true`) and an unstyled internal action button. The toggle keeps the input value and focusable native control intact.

## InputSearch

The end addon is a search Button by default; set `addonAfter` to `null` to remove it. `loading` replaces the search icon with the loading indicator and blocks repeated search. Enter, Prefix, Suffix, AddonBefore, and AddonAfter report `source` with the current value. Only InputSearch makes configured search positions interactive.

## Element access

`InputControl.element` exposes the native input; UI Input exposes `focus()`, `blur()`, and `select()`.

## Styling

native `class`, `classNames`, and style bindings. Use `classNames` / `styles` for semantic parts, selectors for hover/focus/invalid states, and base variables such as `--input-background`, `--input-border-color`, `--input-color`, `--input-placeholder-color`, `--input-ring-color`, and `--input-group-radius` for reusable theming.

## Accessibility

UI Input keeps a real native input. Use Field or native labeling for an accessible name. Error state is expressed only with `aria-invalid`. Password and Search actions are native buttons with accessible labels and disabled behavior while loading.
