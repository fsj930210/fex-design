# React Primitive Input

Styled, composable Input primitives. `InputRoot` owns the shared value and state; `InputControl` remains the real native input.

## Import

    import { InputRoot, InputControl, InputPrefix, InputSuffix, InputAddonBefore, InputAddonAfter, InputClear, InputGroup } from '@fex-design/react/primitive/input'

## Components

| Component        | Element | Purpose                                                                   |
| ---------------- | ------- | ------------------------------------------------------------------------- |
| InputRoot        | div     | Styled input boundary and controlled/uncontrolled value owner.            |
| InputControl     | input   | Native text input and focus target.                                       |
| InputPrefix      | span    | Non-interactive content inside the start of InputRoot.                    |
| InputSuffix      | span    | Non-interactive content inside the end of InputRoot.                      |
| InputAddonBefore | span    | Start addon outside the InputRoot focus ring.                             |
| InputAddonAfter  | span    | End addon outside the InputRoot focus ring.                               |
| InputClear       | button  | Clear action connected to the nearest InputRoot.                          |
| InputGroup       | div     | Connects arbitrary direct children without assuming their component type. |

## Examples

| Name       | Covers                                                                  |
| ---------- | ----------------------------------------------------------------------- |
| basic      | Empty and clearable inputs.                                             |
| sizes      | `sm`, `md`, and `lg` (24px, 32px, and 44px).                            |
| variants   | `outlined`, `filled`, `borderless`, and `underlined`.                   |
| controlled | Controlled and uncontrolled InputRoot state.                            |
| affixes    | Prefix, Suffix, AddonBefore, and AddonAfter composition.                |
| group      | Input with Button and Input with Input.                                 |
| password   | Password visibility composed from Control, Suffix, and a native button. |
| search     | Enter, Prefix, and Addon search actions composed from Primitive parts.  |
| states     | Disabled, read-only, and native `aria-invalid`.                         |
| validation | Invalid styling with an error message linked by `aria-describedby`.       |
| focus      | Native focus, blur, and select through InputControl.                    |

## InputRoot API

| Name         | Type                                                     | Default      | Description                            |
| ------------ | -------------------------------------------------------- | ------------ | -------------------------------------- |
| value        | string                                                   | —            | Controlled value.                      |
| defaultValue | string                                                   | `''`         | Uncontrolled initial value.            |
| size         | `'sm' \| 'md' \| 'lg'`                                   | `'md'`       | Control height.                        |
| variant      | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'` | `'outlined'` | Visual structure.                      |
| disabled     | boolean                                                  | false        | Disables the input context.            |
| readOnly     | boolean                                                  | false        | Makes the input context read-only.     |
| value change | framework event                                          | —            | Reports input and clear value changes. |
| clear        | framework event                                          | —            | Fires after a successful clear.        |

## InputControl API

Native contract: `ComponentProps<'input'>`. `ref` returns the native `HTMLInputElement`.

`aria-invalid` is passed to the native input and is the only error-state contract. There is no custom `invalid` or `status` prop.

## Composition

Prefix and Suffix live inside InputRoot and do not add behavior. Addons are siblings of InputRoot inside InputGroup, so the Input focus ring does not cover them. InputClear renders a 12px, 14px, or 16px icon for `sm`, `md`, or `lg` and becomes visible only while the valued input is interactive.

InputGroup styles arbitrary direct children: the first receives only the start radius, the last only the end radius, and middle joins have no radius. Set `--input-group-radius` globally, on one group, or on a direct child to override it.

## Styling

`className`, `classNames`, and `CSSProperties` styles. State-specific colors use selectors such as `hover`, `focus-within`, data attributes, and `[aria-invalid=true]`; CSS variables stay limited to reusable base tokens.

## Direction

All spacing and connected radii use logical start/end properties and follow native `dir="ltr"` or `dir="rtl"`.

## Accessibility

Provide an associated label through Field or native labeling. InputClear is a real button, keyboard reachable when visible, and restores focus to InputControl after clearing. Disabled and read-only behavior uses native input semantics.
