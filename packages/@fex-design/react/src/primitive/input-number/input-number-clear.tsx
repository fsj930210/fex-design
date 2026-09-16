import type { ComponentProps } from 'react'
import { InputClear } from '../input/input'
import { useInputNumberContext } from './input-number-context'

export interface InputNumberClearProps extends ComponentProps<typeof InputClear> {}

export function InputNumberClear({ onClick, ...props }: InputNumberClearProps) {
  const inputNumber = useInputNumberContext('InputNumberClear')
  return (
    <InputClear
      {...props}
      data-slot="input-number-clear"
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) inputNumber.clear(event.nativeEvent)
      }}
    />
  )
}
