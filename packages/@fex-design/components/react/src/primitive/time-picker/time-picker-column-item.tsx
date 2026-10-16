import { timePickerColumnItemClassName } from '@fex-design/components-styles/time-picker'
import { cn } from '@fex-design/utils'
import type { ComponentProps, Ref } from 'react'

export interface TimePickerColumnItemProps extends ComponentProps<'button'> {
  ref?: Ref<HTMLButtonElement> | undefined
}

export function TimePickerColumnItem({ className, ref, ...props }: TimePickerColumnItemProps) {
  return <button {...props} ref={ref} className={cn(timePickerColumnItemClassName, className)} />
}
