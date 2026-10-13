import { splitProps, type JSX, type Accessor } from 'solid-js'
import { getCalendarCellAttributes, type CalendarCell as Cell, type CalendarValue } from '@fex-design/core/calendar'
import { calendarCellContainerClassName, calendarCellClassName, calendarWeekRangeCellClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { callCalendarHandler } from './events'
import { useCalendarContext } from './calendar-context'
import { CalendarCellTrigger } from './calendar-cell-trigger'
export type CalendarCellModel<TValue extends CalendarValue = CalendarValue> = Cell<TValue>
export type CalendarCellProps<TValue extends CalendarValue = CalendarValue> = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & { cell: Cell<TValue> | Accessor<Cell<TValue>>; children?: JSX.Element | ((cell: Cell<TValue>) => JSX.Element) }
export function CalendarCell<TValue extends CalendarValue = CalendarValue>(props: CalendarCellProps<TValue>) {
  const [local, rest] = splitProps(props, ['cell', 'children', 'class', 'onMouseEnter'])
  const context = useCalendarContext('CalendarCell')
  const cell = () => typeof local.cell === 'function' ? local.cell() : local.cell
  return <div {...rest} {...getCalendarCellAttributes(cell(), context.state().hoveredRowIndex, context.state().hasRange)} role="gridcell" aria-selected={cell().state.selected} aria-disabled={cell().state.disabled} data-slot="calendar-cell" class={cn(calendarCellContainerClassName, calendarCellClassName, cell().granularity === 'week' && calendarWeekRangeCellClassName, local.class)} onMouseEnter={event => { callCalendarHandler(local.onMouseEnter, event); if (!event.defaultPrevented) context.controller.hoverCell(cell()) }}>{typeof local.children === 'function' ? local.children(cell()) : local.children ?? <CalendarCellTrigger cell={cell} />}</div>
}
