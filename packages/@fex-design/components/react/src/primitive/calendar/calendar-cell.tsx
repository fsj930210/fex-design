import type { CalendarCell as CoreCalendarCell, CalendarValue } from '@fex-design/core/calendar'
import { calendarCellClassName, calendarWeekRangeCellClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import type { ComponentProps, ReactNode } from 'react'
import { useCalendarContext } from './calendar-context'

export type CalendarCell<TValue extends CalendarValue = CalendarValue> = CoreCalendarCell<TValue>

export interface CalendarCellProps<TValue extends CalendarValue = CalendarValue> extends Omit<
  ComponentProps<'button'>,
  'children' | 'value' | 'onSelect'
> {
  cell: CoreCalendarCell<TValue>
  children?: ReactNode | ((cell: CoreCalendarCell<TValue>) => ReactNode)
}

export function CalendarCell<TValue extends CalendarValue = CalendarValue>({
  cell,
  children,
  className,
  onClick,
  onMouseEnter,
  ...props
}: CalendarCellProps<TValue>) {
  const context = useCalendarContext('CalendarCell')
  const content = typeof children === 'function' ? children(cell) : (children ?? cell.label)

  return (
    <button
      {...props}
      type="button"
      data-slot="calendar-cell"
      data-today={cell.state.today ? 'true' : undefined}
      data-outside={cell.state.outside ? 'true' : undefined}
      data-selected={cell.state.selected ? 'true' : undefined}
      data-range-picker={context.hasRange ? 'true' : undefined}
      data-range-start={cell.granularity !== 'week' && cell.state.rangeStart ? 'true' : undefined}
      data-range-end={cell.granularity !== 'week' && cell.state.rangeEnd ? 'true' : undefined}
      data-in-range={cell.granularity !== 'week' && cell.state.inRange ? 'true' : undefined}
      data-week-selected={cell.granularity === 'week' && cell.state.selected ? 'true' : undefined}
      data-week-hover={
        cell.granularity === 'week' && context.hoveredRowIndex === cell.rowIndex
          ? 'true'
          : undefined
      }
      data-week-row-start={
        cell.granularity === 'week' && cell.columnIndex === 0 ? 'true' : undefined
      }
      data-week-row-end={cell.granularity === 'week' && cell.columnIndex === 6 ? 'true' : undefined}
      data-week-start={
        cell.granularity === 'week' && cell.state.selected && cell.columnIndex === 0
          ? 'true'
          : undefined
      }
      data-week-end={
        cell.granularity === 'week' && cell.state.selected && cell.columnIndex === 6
          ? 'true'
          : undefined
      }
      data-week-range-start={
        cell.granularity === 'week' && cell.state.rangeStart && !cell.state.rangeEnd
          ? 'true'
          : undefined
      }
      data-week-range-end={
        cell.granularity === 'week' && cell.state.rangeEnd && !cell.state.rangeStart
          ? 'true'
          : undefined
      }
      data-week-range-single={
        cell.granularity === 'week' && cell.state.rangeStart && cell.state.rangeEnd
          ? 'true'
          : undefined
      }
      data-week-in-range={cell.granularity === 'week' && cell.state.inRange ? 'true' : undefined}
      data-week-range={
        cell.granularity === 'week' &&
        (cell.state.rangeStart || cell.state.rangeEnd || cell.state.inRange)
          ? 'true'
          : undefined
      }
      data-disabled={cell.state.disabled ? 'true' : undefined}
      disabled={cell.state.disabled}
      className={cn(
        calendarCellClassName,
        cell.granularity === 'week' && calendarWeekRangeCellClassName,
        className,
      )}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        context.selectCell(cell)
      }}
      onMouseEnter={(event) => {
        onMouseEnter?.(event)
        if (!event.defaultPrevented) context.hoverCell(cell)
      }}
    >
      {content}
    </button>
  )
}
