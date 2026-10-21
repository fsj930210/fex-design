import { splitProps, type JSX } from 'solid-js'
import { calendarFooterClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'

export type CalendarFooterProps = JSX.HTMLAttributes<HTMLDivElement>
export function CalendarFooter(props: CalendarFooterProps) {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <div {...rest} data-slot="calendar-footer" class={cn(calendarFooterClassName, local.class)} />
  )
}
