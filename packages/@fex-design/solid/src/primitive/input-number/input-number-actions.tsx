import { inputNumberActionsClassName } from '@fex-design/styles/input-number'
import { cn } from '@fex/utils'
import type { JSX, ParentProps } from 'solid-js'
export function InputNumberActions(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span
      {...props}
      data-slot="input-number-actions"
      class={cn(inputNumberActionsClassName, props.class)}
    />
  )
}
