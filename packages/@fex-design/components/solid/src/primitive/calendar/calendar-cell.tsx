import type { CalendarCell as CoreCalendarCell, CalendarValue } from '@fex-design/core/calendar'
import { cn } from '@fex-design/utils'
import { splitProps, type Accessor, type JSX } from 'solid-js'
import { useCalendarContext } from './calendar-context'

export type CalendarCellModel<TValue extends CalendarValue = CalendarValue> =
  CoreCalendarCell<TValue>

export interface CalendarCellProps<TValue extends CalendarValue = CalendarValue> extends Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'value'
> {
  cell: CalendarCellModel<TValue> | Accessor<CalendarCellModel<TValue>>
  children?: JSX.Element | ((cell: CalendarCellModel<TValue>) => JSX.Element) | undefined
}

export function CalendarCell<TValue extends CalendarValue = CalendarValue>(
  props: CalendarCellProps<TValue>,
) {
  const [local, rest] = splitProps(props, ['cell', 'children', 'class', 'onClick'])
  const context = useCalendarContext('CalendarCell')
  const cell = () =>
    typeof local.cell === 'function'
      ? (local.cell as Accessor<CalendarCellModel<TValue>>)()
      : local.cell

  return (
    <button
      {...rest}
      type="button"
      data-slot="calendar-cell"
      data-today={cell().state.today ? 'true' : undefined}
      data-outside={cell().state.outside ? 'true' : undefined}
      data-selected={cell().state.selected ? 'true' : undefined}
      data-range-start={
        cell().granularity !== 'week' && cell().state.rangeStart ? 'true' : undefined
      }
      data-range-end={cell().granularity !== 'week' && cell().state.rangeEnd ? 'true' : undefined}
      data-in-range={cell().granularity !== 'week' && cell().state.inRange ? 'true' : undefined}
      data-week-selected={
        cell().granularity === 'week' && cell().state.selected ? 'true' : undefined
      }
      data-week-hover={
        cell().granularity === 'week' && context.hoveredRowIndex() === cell().rowIndex
          ? 'true'
          : undefined
      }
      data-week-row-start={
        cell().granularity === 'week' && cell().columnIndex === 0 ? 'true' : undefined
      }
      data-week-row-end={
        cell().granularity === 'week' && cell().columnIndex === 6 ? 'true' : undefined
      }
      data-week-start={
        cell().granularity === 'week' && cell().state.selected && cell().columnIndex === 0
          ? 'true'
          : undefined
      }
      data-week-end={
        cell().granularity === 'week' && cell().state.selected && cell().columnIndex === 6
          ? 'true'
          : undefined
      }
      data-week-range-start={
        cell().granularity === 'week' && cell().state.rangeStart && !cell().state.rangeEnd
          ? 'true'
          : undefined
      }
      data-week-range-end={
        cell().granularity === 'week' && cell().state.rangeEnd && !cell().state.rangeStart
          ? 'true'
          : undefined
      }
      data-week-range-single={
        cell().granularity === 'week' && cell().state.rangeStart && cell().state.rangeEnd
          ? 'true'
          : undefined
      }
      data-week-in-range={
        cell().granularity === 'week' && cell().state.inRange ? 'true' : undefined
      }
      data-week-range={
        cell().granularity === 'week' &&
        (cell().state.rangeStart || cell().state.rangeEnd || cell().state.inRange)
          ? 'true'
          : undefined
      }
      data-disabled={cell().state.disabled ? 'true' : undefined}
      disabled={cell().state.disabled}
      class={cn(local.class)}
      on:click={(event) => {
        if (typeof local.onClick === 'function') local.onClick(event)
        if (event.defaultPrevented) return
        context.selectCell(cell())
      }}
      onMouseEnter={(event) => {
        if (typeof rest.onMouseEnter === 'function') rest.onMouseEnter(event)
        if (!event.defaultPrevented) context.hoverCell(cell())
      }}
    >
      {typeof local.children === 'function'
        ? local.children(cell())
        : (local.children ?? cell().label)}
    </button>
  )
}
