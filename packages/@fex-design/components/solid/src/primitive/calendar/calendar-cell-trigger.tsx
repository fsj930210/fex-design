import { splitProps, type JSX, type Accessor } from 'solid-js'
import { focusCalendarCell, type CalendarCell as Cell, type CalendarValue } from '@fex-design/core/calendar'
import { calendarCellTriggerClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { callCalendarHandler } from './events'
import { useCalendarContext } from './calendar-context'
export type CalendarCellTriggerProps<TValue extends CalendarValue = CalendarValue> = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { cell: Cell<TValue> | Accessor<Cell<TValue>>; children?: JSX.Element | ((cell: Cell<TValue>) => JSX.Element) }
export function CalendarCellTrigger<TValue extends CalendarValue = CalendarValue>(props: CalendarCellTriggerProps<TValue>) {
  const [local, rest] = splitProps(props, ['cell', 'children', 'class', 'onClick', 'onKeyDown', 'onFocus', 'disabled'])
  const context = useCalendarContext('CalendarCellTrigger')
  const cell = () => typeof local.cell === 'function' ? local.cell() : local.cell
  const tabIndex = () => { context.state(); return context.controller.getCellTabIndex(cell()) }
  return <button {...rest} type="button" data-slot="calendar-cell-trigger" data-key={cell().key} tabIndex={tabIndex()} onFocus={event => { callCalendarHandler(local.onFocus, event); if (!event.defaultPrevented) context.controller.focusCell(cell()) }} onKeyDown={event => { callCalendarHandler(local.onKeyDown, event); if (event.defaultPrevented) return; const target = context.controller.moveFocus(cell(), event.key); if (target) { event.preventDefault(); focusCalendarCell(event.currentTarget, target.key) } }} aria-label={rest['aria-label'] ?? cell().date.toString()} aria-pressed={cell().state.selected} disabled={local.disabled || cell().state.disabled} class={cn(calendarCellTriggerClassName, cell().state.today && 'focus-visible:ring-0', local.class)} onClick={event => { callCalendarHandler(local.onClick, event); if (!event.defaultPrevented) context.controller.selectCell(cell()) }}>{typeof local.children === 'function' ? local.children(cell()) : local.children ?? cell().label}</button>
}
