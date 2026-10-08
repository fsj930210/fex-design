import {
  createCalendarGrid,
  getCalendarToday,
  type CalendarCell as CoreCalendarCell,
  type CalendarDate,
  type CalendarGranularity,
  type CalendarPanel,
  type CalendarRange,
  type CalendarValue,
  type CalendarWeekday,
} from '@fex-design/core/calendar'
import { useState, type ComponentProps } from 'react'
import { useControllableState } from '@fex-design/react/hooks/use-controllable-state'
import { CalendarContext } from './calendar-context'

export interface CalendarRootProps<TValue extends CalendarValue = CalendarValue> extends Omit<
  ComponentProps<'div'>,
  'defaultValue' | 'onChange'
> {
  value?: TValue | null
  values?: readonly TValue[]
  range?: CalendarRange<TValue>
  defaultValue?: TValue | null
  viewDate?: CalendarDate
  defaultViewDate?: CalendarDate
  panel?: CalendarPanel
  defaultPanel?: CalendarPanel
  granularity?: CalendarGranularity
  weekStartsOn?: CalendarWeekday
  today?: CalendarDate
  min?: CalendarDate
  max?: CalendarDate
  disabledDate?: (date: CalendarDate) => boolean
  onValueChange?: (value: TValue) => void
  onCellSelect?: (cell: CoreCalendarCell<TValue>) => void
  onCellHover?: (cell: CoreCalendarCell<TValue>) => void
  onViewDateChange?: (viewDate: CalendarDate) => void
  onPanelChange?: (panel: CalendarPanel) => void
}

export function CalendarRoot<TValue extends CalendarValue = CalendarValue>({
  value,
  values,
  range,
  defaultValue = null,
  viewDate,
  defaultViewDate,
  panel,
  defaultPanel = 'date',
  granularity = 'date',
  weekStartsOn = 0,
  today,
  min,
  max,
  disabledDate,
  onValueChange,
  onCellSelect,
  onCellHover,
  onViewDateChange,
  onPanelChange,
  className,
  children,
  ...props
}: CalendarRootProps<TValue>) {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null)
  const fallbackViewDate = defaultViewDate ?? getCalendarToday()
  const valueChangeProps = onValueChange
    ? {
        onChange: (nextValue: TValue | null) => {
          if (nextValue) onValueChange(nextValue)
        },
      }
    : {}
  const [currentValue, setCurrentValue] = useControllableState<TValue | null>(
    {
      value,
      defaultValue,
      ...valueChangeProps,
    },
    { defaultValue: null },
  )
  const [currentViewDate, setCurrentViewDate] = useControllableState<CalendarDate>(
    { value: viewDate, defaultValue: fallbackViewDate, onChange: onViewDateChange },
    { defaultValue: fallbackViewDate },
  )
  const [currentPanel, setCurrentPanel] = useControllableState<CalendarPanel>(
    { value: panel, defaultValue: defaultPanel, onChange: onPanelChange },
    { defaultValue: defaultPanel },
  )
  const grid = createCalendarGrid<TValue>({
    viewDate: currentViewDate,
    panel: currentPanel,
    granularity,
    weekStartsOn,
    ...(today ? { today } : {}),
    ...(min ? { min } : {}),
    ...(max ? { max } : {}),
    ...(disabledDate ? { disabledDate } : {}),
    ...(currentValue ? { value: currentValue } : {}),
    ...(values ? { values } : {}),
    ...(range ? { range } : {}),
  })

  return (
    <CalendarContext
      value={{
        grid,
        value: currentValue,
        viewDate: currentViewDate,
        panel: currentPanel,
        granularity,
        weekStartsOn,
        hoveredRowIndex,
        hasRange: Boolean(range),
        setViewDate: setCurrentViewDate,
        setPanel: setCurrentPanel,
        selectCell: (cell) => {
          if (cell.state.disabled) return
          if (onCellSelect) {
            onCellSelect(cell as CoreCalendarCell<TValue>)
            return
          }
          setCurrentValue(cell.value as TValue)
        },
        hoverCell: (cell) => {
          if (cell.state.disabled) return
          setHoveredRowIndex(cell.rowIndex)
          onCellHover?.(cell as CoreCalendarCell<TValue>)
        },
        clearHoveredRow: () => setHoveredRowIndex(null),
      }}
    >
      <div
        {...props}
        data-slot="calendar-root"
        data-panel={currentPanel}
        data-granularity={granularity}
        className={className}
        onMouseLeave={(event) => {
          props.onMouseLeave?.(event)
          if (!event.defaultPrevented) setHoveredRowIndex(null)
        }}
      >
        {children}
      </div>
    </CalendarContext>
  )
}
