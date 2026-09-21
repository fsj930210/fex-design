import { splitProps, type JSX } from 'solid-js'
import { InputControl } from '../input/input'
import { useInputNumberContext } from './input-number-context'
export function InputNumberControl(
  props: Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value' | 'type'>,
) {
  const inputNumber = useInputNumberContext('InputNumberControl')
  const [local, rest] = splitProps(props, ['onBlur', 'onKeyDown'])
  return (
    <InputControl
      {...rest}
      type="text"
      inputMode={props.inputMode ?? 'decimal'}
      role="spinbutton"
      aria-valuemin={inputNumber.min()}
      aria-valuemax={inputNumber.max()}
      aria-valuenow={inputNumber.value()}
      aria-valuetext={props['aria-valuetext'] ?? inputNumber.formattedValue()}
      onBlur={(event) => {
        if (typeof local.onBlur === 'function') local.onBlur(event)
        if (!event.defaultPrevented) inputNumber.blur(event)
      }}
      onKeyDown={(event) => {
        if (typeof local.onKeyDown === 'function') local.onKeyDown(event)
        if (!event.defaultPrevented) inputNumber.keydown(event)
      }}
    />
  )
}
