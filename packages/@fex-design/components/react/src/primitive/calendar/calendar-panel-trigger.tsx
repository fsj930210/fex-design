import type { CalendarPanel } from '@fex-design/core/calendar'
import { calendarPanelTriggerClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { useCalendarContext } from './calendar-context'

export type CalendarPanelTriggerProps = ComponentProps<'button'> & { panel: CalendarPanel }
export function CalendarPanelTrigger({
  panel,
  className,
  onClick,
  children,
  ...props
}: CalendarPanelTriggerProps) {
  const context = useCalendarContext('CalendarPanelTrigger')
  return (
    <button
      {...props}
      type="button"
      data-slot="calendar-panel-trigger"
      data-panel={panel}
      className={cn(calendarPanelTriggerClassName, className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) context.controller.setPanel(panel)
      }}
    >
      {children}
    </button>
  )
}
