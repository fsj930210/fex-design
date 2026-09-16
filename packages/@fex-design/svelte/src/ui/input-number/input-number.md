# Svelte UI InputNumber

Ready-to-use composition that reuses Primitive logic and Input/Button parts. UI adds one structured semantic-style API.

## Import

    import InputNumber from '@fex-design/svelte/ui/input-number'

## Components

| Component   | Element     | Purpose                                                          |
| ----------- | ----------- | ---------------------------------------------------------------- |
| InputNumber | div + input | Assembles control, clear, affixes, and replaceable step actions. |

## Examples

| Name            | Covers                                                     |
| --------------- | ---------------------------------------------------------- |
| basic           | Controlled and uncontrolled values.                        |
| constraints     | min, max, step, and precision.                             |
| formatter       | Parsing and display formatting.                            |
| editing         | Draft text and blur commit.                                |
| controls        | Default, hidden, and replaced step controls.               |
| keyboard        | Arrow key stepping.                                        |
| range           | Controlled out-of-range values.                            |
| custom-logic    | Custom UI driven by useInputNumber and the library Button. |
| affixes         | Prefix, clear, suffix, and actions together.               |
| validation      | Visible invalid state and error description.               |
| semantic-styles | classNames and styles for structural parts.                |

## InputNumber API

| Name                 | Type                                     | Default  | Description                                    |
| -------------------- | ---------------------------------------- | -------- | ---------------------------------------------- |
| value / defaultValue | number or undefined                      | —        | Controlled value / uncontrolled initial value. |
| min / max            | number                                   | —        | Numeric bounds.                                |
| step                 | number                                   | 1        | Step amount.                                   |
| precision            | number                                   | —        | Precision used on commit.                      |
| parser / formatter   | InputNumberParser / InputNumberFormatter | built-in | Separates editable text from the number.       |
| disabled / readOnly  | boolean                                  | false    | Disables editing and actions.                  |
| keyboard             | boolean                                  | true     | Enables ArrowUp and ArrowDown.                 |
| onChange             | (event, value) => void                   | —        | Reports the original event and number.         |

Supports every Input feature and native input attribute. `classNames` and `styles` target root, control, clear, prefix, suffix, actions, increment, and decrement.

## Logic layer

Import `useInputNumber` from the Primitive entry for custom UI. See custom-logic and the Primitive hook API.
