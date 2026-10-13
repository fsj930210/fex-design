import {
  getCalendarCellAttributes,
  type CalendarCell as Cell,
  type CalendarValue,
} from '@fex-design/core/calendar'
import {
  calendarCellClassName,
  calendarWeekRangeCellClassName,
  calendarCellContainerClassName,
} from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import type { ComponentProps, ReactNode } from 'react'
import { useCalendarContext } from './calendar-context'
import { CalendarCellTrigger } from './calendar-cell-trigger'
export type CalendarCell<TValue extends CalendarValue = CalendarValue> = Cell<TValue>
export type CalendarCellProps<TValue extends CalendarValue = CalendarValue> = Omit<
  ComponentProps<'div'>,
  'children'
> & { cell: Cell<TValue>; children?: ReactNode | ((cell: Cell<TValue>) => ReactNode) }
export function CalendarCell<TValue extends CalendarValue = CalendarValue>({
  cell,
  children,
  className,
  onMouseEnter,
  ...props
}: CalendarCellProps<TValue>) {
  const context = useCalendarContext('CalendarCell')
  return (
    <div
      {...props}
      {...getCalendarCellAttributes(cell, context.state.hoveredRowIndex, context.state.hasRange)}
      role="gridcell"
      aria-selected={cell.state.selected}
      aria-disabled={cell.state.disabled}
      data-slot="calendar-cell"
      className={cn(
        calendarCellContainerClassName,
        calendarCellClassName,
        cell.granularity === 'week' && calendarWeekRangeCellClassName,
        className,
      )}
      onMouseEnter={(event) => {
        onMouseEnter?.(event)
        if (!event.defaultPrevented) context.controller.hoverCell(cell)
      }}
    >
      {typeof children === 'function'
        ? children(cell)
        : (children ?? <CalendarCellTrigger cell={cell} />)}
    </div>
  )
}
