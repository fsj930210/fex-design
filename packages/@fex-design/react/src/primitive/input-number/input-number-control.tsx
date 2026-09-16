import type { ComponentProps } from 'react'
import { InputControl } from '../input/input'
import { useInputNumberContext } from './input-number-context'

export interface InputNumberControlProps extends Omit<
  ComponentProps<typeof InputControl>,
  'value' | 'defaultValue' | 'type'
> {}

export function InputNumberControl({ onBlur, onKeyDown, ...props }: InputNumberControlProps) {
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
      onBlur={(event) => {
        onBlur?.(event)
        if (!event.defaultPrevented) inputNumber.blur(event)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (!event.defaultPrevented) inputNumber.keydown(event)
      }}
    />
  )
}
