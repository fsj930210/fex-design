import {
  focusCalendarCell,
  type CalendarCell as Cell,
  type CalendarValue,
} from '@fex-design/core/calendar'
import { calendarCellTriggerClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import type { ComponentProps, ReactNode } from 'react'
import { useCalendarContext } from './calendar-context'
export type CalendarCellTriggerProps<TValue extends CalendarValue = CalendarValue> = Omit<
  ComponentProps<'button'>,
  'children'
> & { cell: Cell<TValue>; children?: ReactNode | ((cell: Cell<TValue>) => ReactNode) }
export function CalendarCellTrigger<TValue extends CalendarValue = CalendarValue>({
  cell,
  children,
  className,
  onClick,
  onKeyDown,
  onFocus,
  disabled,
  ...props
}: CalendarCellTriggerProps<TValue>) {
  const context = useCalendarContext('CalendarCellTrigger')
  return (
    <button
      {...props}
      type="button"
      data-slot="calendar-cell-trigger"
      data-key={cell.key}
      tabIndex={context.controller.getCellTabIndex(cell)}
      aria-label={props['aria-label'] ?? cell.date.toString()}
      aria-pressed={cell.state.selected}
      disabled={disabled || cell.state.disabled}
      className={cn(
        calendarCellTriggerClassName,
        cell.state.today && 'focus-visible:ring-0',
        className,
      )}
      onFocus={(event) => {
        onFocus?.(event)
        if (!event.defaultPrevented) context.controller.focusCell(cell)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        const target = context.controller.moveFocus(cell, event.key)
        if (target) {
          event.preventDefault()
          focusCalendarCell(event.currentTarget, target.key)
        }
      }}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) context.controller.selectCell(cell)
      }}
    >
      {typeof children === 'function' ? children(cell) : (children ?? cell.label)}
    </button>
  )
}
