import { getDatePickerHeaderActionLabel } from '@fex-design/core/date-picker/panel'
import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'

import type { DatePickerHeaderAction } from '@fex-design/core/date-picker/types'
import { datePickerHeaderNavigationClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { type ComponentProps } from 'react'
import { ChevronLeftIcon } from '@fex-design/react/icons/chevron-left'
import { ChevronRightIcon } from '@fex-design/react/icons/chevron-right'
import { ChevronsLeftIcon } from '@fex-design/react/icons/chevrons-left'
import { ChevronsRightIcon } from '@fex-design/react/icons/chevrons-right'
import { Button } from '@fex-design/react/primitive/button'
import { useCalendarContext } from '../calendar/calendar-context'

export interface DatePickerHeaderButtonProps extends ComponentProps<'button'> {
  action: DatePickerHeaderAction
}

export function DatePickerHeaderButton({
  action,
  className,
  children,
  onClick,
  ...props
}: DatePickerHeaderButtonProps) {
  const calendar = useCalendarContext('DatePickerHeaderButton')
  const isPrevious = action.startsWith('previous')
  const isDouble = action.includes('year') || action.includes('panel')
  const Icon = isDouble
    ? isPrevious ? ChevronsLeftIcon : ChevronsRightIcon
    : isPrevious ? ChevronLeftIcon : ChevronRightIcon
  const icon = children === undefined ? <Icon className="size-4 rtl:rotate-180" /> : children

  return (
    <Button
      {...props}
      type="button"
      data-slot="date-picker-header-button"
      data-action={action}
      aria-label={props['aria-label'] ?? getDatePickerHeaderActionLabel(action, calendar.controller.getOptions().locale)}
      className={cn(datePickerHeaderNavigationClassName, className)}
      onClick={(event) => {
        onClick?.(event)
        if (isPickerActionBlocked(event)) return
        calendar.controller.navigate(action)
      }}
    >
      {icon}
    </Button>
  )
}
