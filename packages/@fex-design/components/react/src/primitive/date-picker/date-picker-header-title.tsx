

import { datePickerHeaderTitleClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type ReactNode } from 'react'

export interface DatePickerHeaderTitleProps extends ComponentProps<'div'> {
  children?: ReactNode
}

export function DatePickerHeaderTitle({ className, ...props }: DatePickerHeaderTitleProps) {
  return (
    <div
      {...props}
      data-slot="date-picker-header-title"
      className={cn(datePickerHeaderTitleClassName, className)}
    />
  )
}
