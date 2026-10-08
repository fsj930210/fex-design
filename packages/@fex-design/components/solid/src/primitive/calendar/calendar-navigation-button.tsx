import { addDate, subtractDate } from '@fex-design/core/calendar'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { useCalendarContext } from './calendar-context'

export type CalendarNavigationAction =
  | 'previous-year'
  | 'previous-month'
  | 'next-month'
  | 'next-year'
  | 'previous-panel'
  | 'next-panel'

export interface CalendarNavigationButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  action: CalendarNavigationAction
}

export function CalendarNavigationButton(props: ParentProps<CalendarNavigationButtonProps>) {
  const [local, rest] = splitProps(props, ['action', 'onClick', 'children'])
  const context = useCalendarContext('CalendarNavigationButton')

  function runAction() {
    if (local.action === 'previous-year')
      context.setViewDate(subtractDate(context.viewDate(), { years: 1 }))
    if (local.action === 'previous-month')
      context.setViewDate(subtractDate(context.viewDate(), { months: 1 }))
    if (local.action === 'next-month')
      context.setViewDate(addDate(context.viewDate(), { months: 1 }))
    if (local.action === 'next-year') context.setViewDate(addDate(context.viewDate(), { years: 1 }))
    if (local.action === 'previous-panel')
      context.setViewDate(
        context.panel() === 'date'
          ? subtractDate(context.viewDate(), { months: 1 })
          : subtractDate(context.viewDate(), { years: 1 }),
      )
    if (local.action === 'next-panel')
      context.setViewDate(
        context.panel() === 'date'
          ? addDate(context.viewDate(), { months: 1 })
          : addDate(context.viewDate(), { years: 1 }),
      )
  }

  return (
    <button
      {...rest}
      type="button"
      data-slot="calendar-navigation-button"
      data-action={local.action}
      onClick={(event) => {
        if (typeof local.onClick === 'function') local.onClick(event)
        if (event.defaultPrevented) return
        runAction()
      }}
    >
      {local.children}
    </button>
  )
}
