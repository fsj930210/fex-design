# Angular Primitive InputNumber

Composable numeric input built from the existing Input and Button primitives.

## Import

    import { InputNumberRoot, InputNumberControl, InputNumberClear, InputNumberActions, InputNumberIncrement, InputNumberDecrement, useInputNumber } from '@fex-design/angular/primitive/input-number'

## Components

| Component            | Element | Purpose                                                   |
| -------------------- | ------- | --------------------------------------------------------- |
| InputNumberRoot      | div     | Owns numeric state, draft text, constraints, and context. |
| InputNumberControl   | input   | Reuses InputControl and native spinbutton behavior.       |
| InputNumberClear     | button  | Reuses InputClear and clears the number.                  |
| InputNumberActions   | span    | Groups step actions.                                      |
| InputNumberIncrement | button  | Reuses Button; the default PlusIcon is replaceable.       |
| InputNumberDecrement | button  | Reuses Button; the default MinusIcon is replaceable.      |

## Examples

| Name         | Covers                                                     |
| ------------ | ---------------------------------------------------------- |
| basic        | Controlled and uncontrolled values.                        |
| constraints  | min, max, step, and precision.                             |
| formatter    | Parsing and display formatting.                            |
| editing      | Draft text and blur commit.                                |
| controls     | Default, hidden, and replaced step controls.               |
| keyboard     | Arrow key stepping.                                        |
| range        | Controlled out-of-range values.                            |
| custom-logic | Custom UI driven by useInputNumber and the library Button. |
| affixes      | Prefix, clear, suffix, and actions together.               |
| validation   | Visible invalid state and error description.               |

## InputNumberRoot API

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

Control inherits `native input host attributes`; native focus, blur, keyboard, aria, data attributes, and element access pass through.

## useInputNumber API

The public logic layer accepts the same options and drives custom DOM without rendering the default structure. Reactive values use Signal / computed.

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

### Return value

| Group        | Members                                                   |
| ------------ | --------------------------------------------------------- |
| State        | value, draft, formattedValue, min, max, outOfRange        |
| Availability | canClear, canIncrement, canDecrement                      |
| Actions      | input, blur, keydown, clear, increment, decrement, commit |

## Direction and validation

Parts pass through native dir. Validation uses aria-invalid and aria-describedby. Changes use change/onChange, never onValueChange.
