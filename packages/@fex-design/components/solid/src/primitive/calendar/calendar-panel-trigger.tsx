import { splitProps, type JSX } from 'solid-js'
import type { CalendarPanel } from '@fex-design/core/calendar'
import { calendarPanelTriggerClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { callCalendarHandler } from './events'
import { useCalendarContext } from './calendar-context'

export type CalendarPanelTriggerProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  panel: CalendarPanel
}
export function CalendarPanelTrigger(props: CalendarPanelTriggerProps) {
  const [local, rest] = splitProps(props, ['panel', 'class', 'onClick'])
  const context = useCalendarContext('CalendarPanelTrigger')
  return (
    <button
      {...rest}
      type="button"
      data-slot="calendar-panel-trigger"
      data-panel={local.panel}
      class={cn(calendarPanelTriggerClassName, local.class)}
      onClick={(event) => {
        callCalendarHandler(local.onClick, event)
        if (!event.defaultPrevented) context.controller.setPanel(local.panel)
      }}
    />
  )
}
