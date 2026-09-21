import { inputNumberActionsClassName } from '@fex-design/components-styles/input-number'
import { cn } from '@fex-design/utils'
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
