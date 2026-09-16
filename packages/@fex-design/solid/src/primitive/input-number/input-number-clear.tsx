import type { ComponentProps } from 'solid-js'
import { InputClear } from '../input/input'
import { useInputNumberContext } from './input-number-context'
export function InputNumberClear(props: ComponentProps<typeof InputClear>) {
  const n = useInputNumberContext('InputNumberClear')
  return (
    <InputClear
      {...props}
      data-slot="input-number-clear"
      onClick={(e) => {
        if (typeof props.onClick === 'function') props.onClick(e)
        if (!e.defaultPrevented) n.clear(e)
      }}
    />
  )
}
