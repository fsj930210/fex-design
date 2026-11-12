import type { ComponentProps } from 'react'
import { InputControl } from '../input'
import { useInputNumberContext } from './input-number-context'

export interface InputNumberControlProps extends Omit<
  ComponentProps<typeof InputControl>,
  'value' | 'defaultValue' | 'type'
> {}

export function InputNumberControl({
  onBlur,
  onKeyDown,
  onChange,
  ...props
}: InputNumberControlProps) {
  const inputNumber = useInputNumberContext('InputNumberControl')
  return (
    <InputControl
      {...props}
      type="text"
      inputMode={props.inputMode ?? 'decimal'}
      role="spinbutton"
      aria-valuemin={inputNumber.min}
      aria-valuemax={inputNumber.max}
      aria-valuenow={inputNumber.value}
      aria-valuetext={props['aria-valuetext'] ?? inputNumber.formattedValue}
      onChange={(event) => {
        onChange?.(event)
        if (!event.defaultPrevented) inputNumber.input(event.currentTarget.value, event.nativeEvent)
      }}
      onBlur={(event) => {
        onBlur?.(event)
        if (!event.defaultPrevented) inputNumber.blur(event.nativeEvent)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (!event.defaultPrevented) inputNumber.keydown(event)
      }}
    />
  )
}
