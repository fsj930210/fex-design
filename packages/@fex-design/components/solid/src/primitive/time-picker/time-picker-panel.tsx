import { timePickerRootClassName } from '@fex-design/components-styles/time-picker'
import { cn } from '@fex-design/utils'
import type { JSX, ParentProps } from 'solid-js'

export function TimePickerPanel(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...props} data-slot="time-picker-panel" class={cn(timePickerRootClassName, props.class)}>
      {props.children}
    </div>
  )
}
