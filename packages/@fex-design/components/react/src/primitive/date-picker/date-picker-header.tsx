

import { datePickerHeaderClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { type ComponentProps } from 'react'

export interface DatePickerHeaderProps extends ComponentProps<'div'> {}
export function DatePickerHeader({ className, ...props }: DatePickerHeaderProps) {
  return (
    <div
      {...props}
      data-slot="date-picker-header"
      className={cn(datePickerHeaderClassName, className)}
    />
  )
}
