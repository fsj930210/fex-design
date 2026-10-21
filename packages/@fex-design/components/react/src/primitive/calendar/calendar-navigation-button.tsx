import type { CalendarNavigationAction } from '@fex-design/core/calendar'
import { calendarNavigationButtonClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { useCalendarContext } from './calendar-context'
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons/chevron'
export type { CalendarNavigationAction } from '@fex-design/core/calendar'
export type CalendarNavigationButtonProps = ComponentProps<'button'> & {
  action: CalendarNavigationAction
}
export function CalendarNavigationButton({
  action,
  className,
  onClick,
  children,
  ...props
}: CalendarNavigationButtonProps) {
  const context = useCalendarContext('CalendarNavigationButton')
  return (
    <button
      {...props}
      type="button"
      data-slot="calendar-navigation-button"
      data-action={action}
      className={cn(calendarNavigationButtonClassName, className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) context.controller.navigate(action)
      }}
    >
      {children ??
        (action.startsWith('previous') ? (
          <ChevronLeftIcon className="size-4 rtl:rotate-0" />
        ) : action.startsWith('next') ? (
          <ChevronRightIcon className="size-4 rtl:rotate-180" />
        ) : null)}
    </button>
  )
}
