import { addDate, subtractDate } from '@fex-design/core/calendar'
import type { ComponentProps } from 'react'
import { useCalendarContext } from './calendar-context'

export type CalendarNavigationAction =
  | 'previous-year'
  | 'previous-month'
  | 'next-month'
  | 'next-year'
  | 'previous-panel'
  | 'next-panel'

export interface CalendarNavigationButtonProps extends ComponentProps<'button'> {
  action: CalendarNavigationAction
}

export function CalendarNavigationButton({
  action,
  type = 'button',
  onClick,
  children,
  ...props
}: CalendarNavigationButtonProps) {
  const context = useCalendarContext('CalendarNavigationButton')

  function runAction() {
    if (action === 'previous-year') {
      context.setViewDate(subtractDate(context.viewDate, { years: 1 }))
      return
    }
    if (action === 'previous-month') {
      context.setViewDate(subtractDate(context.viewDate, { months: 1 }))
      return
    }
    if (action === 'next-month') {
      context.setViewDate(addDate(context.viewDate, { months: 1 }))
      return
    }
    if (action === 'next-year') {
      context.setViewDate(addDate(context.viewDate, { years: 1 }))
      return
    }
    if (action === 'previous-panel') {
      context.setViewDate(
        context.panel === 'date'
          ? subtractDate(context.viewDate, { months: 1 })
          : subtractDate(context.viewDate, { years: 1 }),
      )
      return
    }
    context.setViewDate(
      context.panel === 'date'
        ? addDate(context.viewDate, { months: 1 })
        : addDate(context.viewDate, { years: 1 }),
    )
  }

  return (
    <button
      {...props}
      type={type}
      data-slot="calendar-navigation-button"
      data-action={action}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        runAction()
      }}
    >
      {children}
    </button>
  )
}
