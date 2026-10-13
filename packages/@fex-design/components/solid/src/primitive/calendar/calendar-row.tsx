import { splitProps, type JSX } from 'solid-js'
import { calendarRowClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { useCalendarContext } from './calendar-context'
export type CalendarRowProps = JSX.HTMLAttributes<HTMLDivElement>
export function CalendarRow(props: CalendarRowProps) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  const context = useCalendarContext('CalendarRow')
  return <div {...rest} data-slot="calendar-row" role="row" data-panel={context.state().panel} class={cn(calendarRowClassName, local.class)}>{local.children}</div>
}
