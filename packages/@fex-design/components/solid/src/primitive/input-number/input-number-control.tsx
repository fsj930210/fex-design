import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { splitProps, type JSX } from 'solid-js'
import { InputControl } from '../input'
import { useInputNumberContext } from './input-number-context'
export function InputNumberControl(
  props: Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'type'>,
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
        callEventHandler(local.onBlur, event)
        if (!event.defaultPrevented) inputNumber.blur(event)
      }}
      onKeyDown={(event) => {
        callEventHandler(local.onKeyDown, event)
        if (!event.defaultPrevented) inputNumber.keydown(event)
      }}
    />
  )
}
