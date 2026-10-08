import type { CalendarCell as CoreCalendarCell, CalendarValue } from '@fex-design/core/calendar'
import { Fragment, type ComponentProps, type ReactNode } from 'react'
import { useCalendarContext } from './calendar-context'
import { CalendarCell } from './calendar-cell'

export interface CalendarGridProps<TValue extends CalendarValue = CalendarValue> extends Omit<
  ComponentProps<'div'>,
  'children'
> {
  children?: (cell: CoreCalendarCell<TValue>) => ReactNode
}

export function CalendarGrid<TValue extends CalendarValue = CalendarValue>({
  children,
  className,
  onMouseLeave,
  ...props
}: CalendarGridProps<TValue>) {
  const context = useCalendarContext('CalendarGrid')

  return (
    <div
      {...props}
      data-slot="calendar-grid"
      data-panel={context.panel}
      className={className}
      onMouseLeave={(event) => {
        onMouseLeave?.(event)
        if (!event.defaultPrevented) context.clearHoveredRow()
      }}
    >
      {context.grid.rows.map((row) => (
        <div key={row.map((cell) => cell.key).join('|')} data-slot="calendar-row">
          {row.map((cell) =>
            children ? (
              <Fragment key={cell.key}>{children(cell as CoreCalendarCell<TValue>)}</Fragment>
            ) : (
              <CalendarCell key={cell.key} cell={cell} />
            ),
          )}
        </div>
      ))}
    </div>
  )
}
