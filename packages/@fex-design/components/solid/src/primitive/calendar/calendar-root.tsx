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
import {
  createMemo,
  createSignal,
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { CalendarContext } from './calendar-context'

export interface CalendarRootProps<TValue extends CalendarValue = CalendarValue> extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  value?: TValue | null | undefined
  values?: readonly TValue[] | undefined
  range?: CalendarRange<TValue> | undefined
  defaultValue?: TValue | null | undefined
  viewDate?: CalendarDate | undefined
  defaultViewDate?: CalendarDate | undefined
  panel?: CalendarPanel | undefined
  defaultPanel?: CalendarPanel | undefined
  granularity?: CalendarGranularity | undefined
  weekStartsOn?: CalendarWeekday | undefined
  today?: CalendarDate | undefined
  min?: CalendarDate | undefined
  max?: CalendarDate | undefined
  disabledDate?: ((date: CalendarDate) => boolean) | undefined
  onValueChange?: (value: TValue) => void
  onCellSelect?: (cell: CoreCalendarCell<TValue>) => void
  onCellHover?: (cell: CoreCalendarCell<TValue>) => void
  onViewDateChange?: (viewDate: CalendarDate) => void
  onPanelChange?: (panel: CalendarPanel) => void
}

export function CalendarRoot<TValue extends CalendarValue = CalendarValue>(
  props: ParentProps<CalendarRootProps<TValue>>,
) {
  const [local, rest] = splitProps(props, [
    'value',
    'values',
    'range',
    'defaultValue',
    'viewDate',
    'defaultViewDate',
    'panel',
    'defaultPanel',
    'granularity',
    'weekStartsOn',
    'today',
    'min',
    'max',
    'disabledDate',
    'onValueChange',
    'onCellSelect',
    'onCellHover',
    'onViewDateChange',
    'onPanelChange',
    'children',
  ])
  const [internalValue, setInternalValue] = createSignal<TValue | null>(local.defaultValue ?? null)
  const [internalViewDate, setInternalViewDate] = createSignal(
    local.defaultViewDate ?? getCalendarToday(),
  )
  const [internalPanel, setInternalPanel] = createSignal<CalendarPanel>(
    local.defaultPanel ?? 'date',
  )
  const [hoveredRowIndex, setHoveredRowIndex] = createSignal<number | null>(null)
  const currentValue = () => local.value ?? internalValue()
  const currentViewDate = () => local.viewDate ?? internalViewDate()
  const currentPanel = () => local.panel ?? internalPanel()
  const granularity = () => local.granularity ?? 'date'
  const weekStartsOn = () => local.weekStartsOn ?? 0
  const grid = createMemo(() =>
    createCalendarGrid<TValue>({
      viewDate: currentViewDate(),
      panel: currentPanel(),
      granularity: granularity(),
      weekStartsOn: weekStartsOn(),
      ...(local.today ? { today: local.today } : {}),
      ...(local.min ? { min: local.min } : {}),
      ...(local.max ? { max: local.max } : {}),
      ...(local.disabledDate ? { disabledDate: local.disabledDate } : {}),
      ...(currentValue() ? { value: currentValue() } : {}),
      ...(local.values ? { values: local.values } : {}),
      ...(local.range ? { range: local.range } : {}),
    }),
  )

  function setViewDate(viewDate: CalendarDate) {
    if (local.viewDate === undefined) setInternalViewDate(() => viewDate)
    local.onViewDateChange?.(viewDate)
  }

  function setPanel(panel: CalendarPanel) {
    if (local.panel === undefined) setInternalPanel(panel)
    local.onPanelChange?.(panel)
  }

  return (
    <CalendarContext.Provider
      value={{
        grid,
        value: currentValue,
        viewDate: currentViewDate,
        panel: currentPanel,
        granularity,
        weekStartsOn,
        hoveredRowIndex,
        setViewDate,
        setPanel,
        selectCell: (cell) => {
          if (cell.state.disabled) return
          local.onCellSelect?.(cell as CoreCalendarCell<TValue>)
          if (local.value === undefined) setInternalValue(() => cell.value as TValue)
          local.onValueChange?.(cell.value as TValue)
        },
        hoverCell: (cell) => {
          if (cell.state.disabled) return
          setHoveredRowIndex(cell.rowIndex)
          local.onCellHover?.(cell as CoreCalendarCell<TValue>)
        },
        clearHoveredRow: () => setHoveredRowIndex(null),
      }}
    >
      <div
        {...rest}
        data-slot="calendar-root"
        data-panel={currentPanel()}
        data-granularity={granularity()}
        onMouseLeave={(event) => {
          if (typeof rest.onMouseLeave === 'function') rest.onMouseLeave(event)
          if (!event.defaultPrevented) setHoveredRowIndex(null)
        }}
      >
        {local.children}
      </div>
    </CalendarContext.Provider>
  )
}
