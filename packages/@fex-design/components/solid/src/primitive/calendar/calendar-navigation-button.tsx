import { splitProps, type JSX } from 'solid-js'
import type { CalendarNavigationAction } from '@fex-design/core/calendar'
import { calendarNavigationButtonClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { callCalendarHandler } from './events'
import { useCalendarContext } from './calendar-context'
import { ChevronLeftIcon } from '../../icons/chevron-left'
import { ChevronRightIcon } from '../../icons/chevron-right'
export type { CalendarNavigationAction } from '@fex-design/core/calendar'
export type CalendarNavigationButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & { action: CalendarNavigationAction }
export function CalendarNavigationButton(props: CalendarNavigationButtonProps) {
  const [local, rest] = splitProps(props, ['action', 'class', 'onClick', 'children'])
  const context = useCalendarContext('CalendarNavigationButton')
  return <button {...rest} type="button" data-slot="calendar-navigation-button" data-action={local.action} class={cn(calendarNavigationButtonClassName, local.class)} onClick={event => { callCalendarHandler(local.onClick, event); if (!event.defaultPrevented) context.controller.navigate(local.action) }}>{local.children ?? (local.action.startsWith('previous') ? <ChevronLeftIcon class="size-4 rtl:rotate-180" /> : local.action.startsWith('next') ? <ChevronRightIcon class="size-4 rtl:rotate-180" /> : null)}</button>
}
