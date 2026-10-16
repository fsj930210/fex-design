import { calendarDefaultLocale } from '@fex-design/core/calendar'
import { usePickerAppearance } from './appearance-context'
import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { cn } from '@fex-design/utils'
import { datePickerTodayClassName } from '@fex-design/components-styles/date-picker'
import { type ComponentProps } from 'react'

import { Button } from '../button/button'
import { useFooterOwner } from './date-picker-footer-owner'

export interface DatePickerTodayProps extends ComponentProps<'button'> {}

export function DatePickerToday({
  className,
  children,
  onClick,
  ...props
}: DatePickerTodayProps) {
  const context = useFooterOwner()
  const appearance = usePickerAppearance()
  return (
    <Button
      {...props}
      type="button"
      data-slot="date-picker-today"
      className={cn(datePickerTodayClassName, className)}
      onClick={(event) => {
        onClick?.(event)
        if (isPickerActionBlocked(event)) return
        context.today()
      }}
    >
      {children === undefined ? appearance.calendarProps?.locale?.today ?? calendarDefaultLocale.today : children}
    </Button>
  )
}
