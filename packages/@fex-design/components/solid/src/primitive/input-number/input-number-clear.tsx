import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import type { ComponentProps } from 'solid-js'
import { InputClear } from '../input'
import { useInputNumberContext } from './input-number-context'
export function InputNumberClear(props: ComponentProps<typeof InputClear>) {
  const n = useInputNumberContext('InputNumberClear')
  return (
    <InputClear
      {...props}
      data-slot="input-number-clear"
      onClick={(e) => {
        callEventHandler(props.onClick, e)
        if (!e.defaultPrevented) n.clear(e)
      }}
    />
  )
}
