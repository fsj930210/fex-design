import { timePickerRootClassName } from '@fex-design/components-styles/time-picker'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function TimePickerPanel(props: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      data-slot="time-picker-panel"
      className={cn(timePickerRootClassName, props.className)}
    />
  )
}
