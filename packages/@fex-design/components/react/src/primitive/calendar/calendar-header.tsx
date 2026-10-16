import { getCalendarHeaderState, type CalendarHeaderState } from '@fex-design/core/calendar'
import {
  calendarHeaderClassName,
  calendarHeaderControlsClassName,
  calendarHeaderSelectClassName,
} from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import type { ComponentProps, ReactNode } from 'react'
import { useCalendarContext } from './calendar-context'
import { CalendarNavigationButton } from './calendar-navigation-button'
import { RadioGroup, RadioButton } from '@fex-design/react/primitive/radio'
import { SelectContent, SelectRoot, SelectTrigger, SelectValue } from '@fex-design/react/primitive/select'
export type CalendarHeaderProps = Omit<ComponentProps<'div'>, 'children'> & {
  children?: ReactNode | ((state: CalendarHeaderState) => ReactNode)
}
export function CalendarHeader({ children, className, ...props }: CalendarHeaderProps) {
  const context = useCalendarContext('CalendarHeader')
  const header = getCalendarHeaderState(context.state, context.controller)
  const setNumber = (
    value: string | number | readonly (string | number)[] | undefined,
    set: (next: number) => void,
  ) => {
    const next = Array.isArray(value) ? value[0] : value
    if (next !== undefined) set(Number(next))
  }
  return (
    <div {...props} data-slot="calendar-header" className={cn(calendarHeaderClassName, className)}>
      {typeof children === 'function' ? (
        children(header)
      ) : children !== undefined ? (
        children
      ) : (
        <div className={calendarHeaderControlsClassName}>
          <CalendarNavigationButton
            action="previous-panel"
            disabled={!header.canPrevious}
            aria-label={header.locale.previous}
          />
          <CalendarNavigationButton
            action="next-panel"
            disabled={!header.canNext}
            aria-label={header.locale.next}
          />
          <CalendarNavigationButton action="today">{header.locale.today}</CalendarNavigationButton>
          <SelectRoot
            options={header.years}
            value={header.viewDate.year}
            onChange={(value) => setNumber(value, header.setYear)}
          >
            <SelectTrigger
              className={calendarHeaderSelectClassName}
              aria-label={header.locale.year}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent />
          </SelectRoot>
          {header.panel === 'date' && (
            <SelectRoot
              options={header.months}
              value={header.viewDate.month}
              onChange={(value) => setNumber(value, header.setMonth)}
            >
              <SelectTrigger
                className={calendarHeaderSelectClassName}
                aria-label={header.locale.month}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent />
            </SelectRoot>
          )}
          <RadioGroup
            className="gap-0"
            value={header.panel}
            aria-label={`${header.locale.datePanel}/${header.locale.monthPanel}`}
            onValueChange={(value) => {
              if (value === 'date' || value === 'month') header.setPanel(value)
            }}
          >
            <RadioButton value="date">{header.locale.datePanel}</RadioButton>
            <RadioButton value="month">{header.locale.monthPanel}</RadioButton>
          </RadioGroup>
        </div>
      )}
    </div>
  )
}
