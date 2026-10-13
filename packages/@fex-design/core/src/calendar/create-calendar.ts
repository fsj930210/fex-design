import { createStore } from '../store/create-store'
import { createCalendarGrid } from './grid'
import { compareCalendarDate, getCalendarToday } from './temporal'
import { getCalendarValueDate, getCalendarSelectionValue, isSameCalendarValue } from './value'
import { getCalendarDefaultPanel, getCalendarNavigationDate, getCalendarNextPanel, type CalendarNavigationAction } from './navigation'
import type { CalendarCell, CalendarDate, CalendarGranularity, CalendarGrid, CalendarGridOptions, CalendarLocale, CalendarPanel, CalendarRange, CalendarSelectInfo, CalendarValue, CalendarWeekday } from './types'
import { getCalendarFocusDate } from './focus'

export interface CalendarOptions<TValue extends CalendarValue = CalendarValue> {
  values?: readonly TValue[] | undefined
  range?: CalendarRange<TValue> | undefined
  viewDate?: CalendarDate | undefined
  panel?: CalendarPanel | undefined
  granularity?: CalendarGranularity | undefined
  weekStartsOn?: CalendarWeekday | undefined
  locale?: Partial<CalendarLocale> | undefined
  showWeek?: boolean | undefined
  fullscreen?: boolean | undefined
  today?: CalendarDate | undefined
  min?: CalendarDate | undefined
  max?: CalendarDate | undefined
  disabledDate?: ((date: CalendarDate) => boolean) | undefined
  value?: TValue | null | undefined
  defaultValue?: TValue | null | undefined
  defaultViewDate?: CalendarDate | undefined
  defaultPanel?: CalendarPanel | undefined
  onChange?: ((value: TValue) => void) | undefined
  onSelect?: ((value: TValue, info: CalendarSelectInfo) => void) | undefined
  onCellSelect?: ((cell: CalendarCell) => void) | undefined
  onCellHover?: ((cell: CalendarCell) => void) | undefined
  onViewDateChange?: ((date: CalendarDate) => void) | undefined
  onPanelChange?: ((panel: CalendarPanel) => void) | undefined
}

/** The getter keeps framework props reactive; all state transitions remain in core. */
export function createCalendar<TValue extends CalendarValue = CalendarValue>(getOptions: () => CalendarOptions<TValue>) {
  const initial = getOptions()
  const initialValue = initial.value !== undefined ? initial.value : initial.defaultValue ?? null
  let initialViewDate = initial.defaultViewDate ?? (initialValue ? getCalendarValueDate(initialValue) : initial.today ?? getCalendarToday())
  if (initial.min && compareCalendarDate(initialViewDate, initial.min) < 0) initialViewDate = initial.min
  if (initial.max && compareCalendarDate(initialViewDate, initial.max) > 0) initialViewDate = initial.max
  const store = createStore({
    value: (initial.defaultValue ?? null) as TValue | null,
    viewDate: initialViewDate,
    panel: initial.defaultPanel ?? getCalendarDefaultPanel(initial.granularity ?? 'date'),
    hoveredRowIndex: null as number | null,
    focusedKey: null as string | null,
  })

  function getState() {
    const options = getOptions()
    const internal = store.getSnapshot()
    return {
      value: options.value !== undefined ? options.value : internal.value,
      viewDate: options.viewDate ?? internal.viewDate,
      panel: options.panel ?? internal.panel,
      granularity: options.granularity ?? 'date',
      weekStartsOn: options.weekStartsOn ?? options.locale?.weekStartsOn ?? 0,
      hoveredRowIndex: internal.hoveredRowIndex,
      hasRange: Boolean(options.range),
      focusedKey: internal.focusedKey,
    } as const
  }

  let gridCache: { options: CalendarGridOptions<TValue>; grid: CalendarGrid<TValue> } | undefined
  function getGrid(viewDate = getState().viewDate) {
    const options = getOptions()
    const state = getState()
    const inputs: CalendarGridOptions<TValue> = { viewDate, panel: state.panel, granularity: state.granularity, weekStartsOn: state.weekStartsOn, value: state.value,
      ...(options.values ? { values: options.values } : {}), ...(options.range ? { range: options.range } : {}),
      ...(options.today ? { today: options.today } : {}), ...(options.min ? { min: options.min } : {}), ...(options.max ? { max: options.max } : {}), ...(options.disabledDate ? { disabledDate: options.disabledDate } : {}) }
    const keys = Object.keys(inputs) as (keyof CalendarGridOptions<TValue>)[]
    if (gridCache && keys.length === Object.keys(gridCache.options).length && keys.every(key => Object.is(inputs[key], gridCache!.options[key]))) return gridCache.grid
    const grid = createCalendarGrid<TValue>(inputs)
    gridCache = { options: inputs, grid }
    return grid
  }

  function setViewDate(viewDate: CalendarDate) {
    const options = getOptions()
    if (options.min && compareCalendarDate(viewDate, options.min) < 0) viewDate = options.min
    if (options.max && compareCalendarDate(viewDate, options.max) > 0) viewDate = options.max
    if (getState().viewDate.toString() === viewDate.toString()) return
    if (options.viewDate === undefined) store.updateSnapshot(state => ({ ...state, viewDate, hoveredRowIndex: null }))
    options.onViewDateChange?.(viewDate)
  }

  function setPanel(panel: CalendarPanel) {
    const options = getOptions()
    if (getState().panel === panel) return
    if (options.panel === undefined) store.updateSnapshot(state => ({ ...state, panel, hoveredRowIndex: null }))
    options.onPanelChange?.(panel)
  }

  function navigate(action: CalendarNavigationAction) {
    const state = getState()
    setViewDate(getCalendarNavigationDate(state.viewDate, state.panel, action, getOptions().today ?? getCalendarToday()))
  }

  function setYear(year: number) {
    if (Number.isInteger(year)) setViewDate(getState().viewDate.with({ year }))
  }

  function setMonth(month: number) {
    if (Number.isInteger(month) && month >= 1 && month <= 12) setViewDate(getState().viewDate.with({ month }))
  }

  function selectCell(cell: CalendarCell, source: CalendarSelectInfo['source'] = 'date') {
    if (cell.state.disabled) return
    const options = getOptions()
    const state = getState()
    const nextPanel = getCalendarNextPanel(cell.panel, state.granularity)
    const date = getCalendarValueDate(cell.value)
    // A cell event is notification only; it never changes the selection protocol.
    options.onCellSelect?.(cell)
    // The UI year panel exposes months as a browsing grid. Choosing a month
    // changes the view while keeping that panel open; the user explicitly
    // enters the date panel through the month header control.
    if (cell.panel === 'month' && state.granularity === 'date') {
      setViewDate(date)
      return
    }
    if (nextPanel) {
      setViewDate(date)
      setPanel(nextPanel)
      return
    }
    if (cell.state.outside) setViewDate(date)
    const value = getCalendarSelectionValue(date, state.granularity, state.weekStartsOn) as TValue
    if (!isSameCalendarValue(value, state.value)) {
      if (options.value === undefined) store.updateSnapshot(previous => ({ ...previous, value }))
      options.onChange?.(value)
    }
    options.onSelect?.(value, { source })
  }

  function hoverCell(cell: CalendarCell) {
    if (cell.state.disabled) return
    if (cell.granularity === 'week' && store.getSnapshot().hoveredRowIndex !== cell.rowIndex) store.updateSnapshot(state => ({ ...state, hoveredRowIndex: cell.rowIndex }))
    getOptions().onCellHover?.(cell)
  }

  function clearHoveredRow() {
    if (store.getSnapshot().hoveredRowIndex !== null) store.updateSnapshot(state => ({ ...state, hoveredRowIndex: null }))
  }

  function focusCell(cell: CalendarCell) {
    if (cell.state.disabled || store.getSnapshot().focusedKey === cell.key) return
    store.updateSnapshot(state => ({ ...state, focusedKey: cell.key }))
  }

  let tabStopCache: { grid: CalendarGrid<TValue>; focusedKey: string | null; key: string | undefined } | undefined
  function getCellTabIndex(cell: CalendarCell) {
    const grid = getGrid()
    const focusedKey = getState().focusedKey
    if (!tabStopCache || tabStopCache.grid !== grid || tabStopCache.focusedKey !== focusedKey) {
      const cells = grid.rows.flat().filter(item => !item.state.disabled)
      const active = cells.find(item => item.key === focusedKey)
        ?? cells.find(item => item.state.selected)
        ?? cells.find(item => item.state.today && !item.state.outside)
        ?? cells.find(item => !item.state.outside)
        ?? cells[0]
      tabStopCache = { grid, focusedKey, key: active?.key }
    }
    return tabStopCache.key === cell.key ? 0 : -1
  }

  function moveFocus(cell: CalendarCell, key: string): CalendarCell | null {
    const options = getOptions()
    const page = key === 'PageUp' || key === 'PageDown'
    let date = page ? getCalendarNavigationDate(cell.date, cell.panel, key === 'PageUp' ? 'previous-panel' : 'next-panel', options.today ?? getCalendarToday()) : getCalendarFocusDate(getGrid(), cell, key)
    if (!date) return null
    const currentCells = getGrid().rows.flat()
    const step = key === 'ArrowLeft' || key === 'ArrowUp' || key === 'PageUp' ? -1 : 1
    // Bound disabled searches so an entirely disabled calendar cannot loop forever.
    for (let attempts = 0; attempts < 366; attempts++) {
      const dateKey = date.toString()
      const visible = !page ? currentCells.find(item => item.date.toString() === dateKey) : undefined
      const target = visible ?? getGrid(date).rows.flat().find(item => item.date.toString() === dateKey)
      if (target && !target.state.disabled) {
        if (!visible) setViewDate(date)
        focusCell(target)
        return target
      }
      date = date.add(cell.panel === 'date' ? { days: step } : cell.panel === 'month' ? { months: step } : cell.panel === 'quarter' ? { months: step * 3 } : { years: step })
    }
    return null
  }

  return { getSnapshot: store.getSnapshot, subscribe: store.subscribe, getOptions, getState, getGrid, setViewDate, setPanel, setYear, setMonth, navigate, selectCell, hoverCell, clearHoveredRow, focusCell, getCellTabIndex, moveFocus }
}

export type CalendarController<TValue extends CalendarValue = CalendarValue> = ReturnType<typeof createCalendar<TValue>>
