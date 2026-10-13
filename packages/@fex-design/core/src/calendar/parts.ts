import type { CalendarCell } from './types'
import type { CalendarController } from './create-calendar'
import { getCalendarHeaderView } from './ui'

export const calendarDefaultWeekLabels = ['日', '一', '二', '三', '四', '五', '六'] as const

export interface CalendarWeekHeaderItem {
  label: string
  index: number
}

export function getCalendarWeekHeaderItems(labels: readonly string[], weekStartsOn: number): CalendarWeekHeaderItem[] {
  return getCalendarWeekLabels(labels, weekStartsOn).map((label, index) => ({ label, index }))
}

export function getCalendarCellAttributes(cell: CalendarCell, hoveredRowIndex: number | null, hasRange: boolean) {
  const week = cell.granularity === 'week'
  const flag = (value: boolean) => value ? 'true' : undefined
  return {
    'data-today': flag(cell.state.today),
    'data-outside': flag(cell.state.outside),
    'data-selected': flag(cell.state.selected),
    'data-disabled': flag(cell.state.disabled),
    'data-range-picker': flag(hasRange),
    'data-range-start': flag(!week && cell.state.rangeStart),
    'data-range-end': flag(!week && cell.state.rangeEnd),
    'data-in-range': flag(!week && cell.state.inRange),
    'data-week-selected': flag(week && cell.state.selected),
    'data-week-hover': flag(week && hoveredRowIndex === cell.rowIndex),
    'data-week-row-start': flag(week && cell.columnIndex === 0),
    'data-week-row-end': flag(week && cell.columnIndex === 6),
    'data-week-start': flag(week && cell.state.selected && cell.columnIndex === 0),
    'data-week-end': flag(week && cell.state.selected && cell.columnIndex === 6),
    'data-week-range-start': flag(week && cell.state.rangeStart && !cell.state.rangeEnd),
    'data-week-range-end': flag(week && cell.state.rangeEnd && !cell.state.rangeStart),
    'data-week-range-single': flag(week && cell.state.rangeStart && cell.state.rangeEnd),
    'data-week-in-range': flag(week && cell.state.inRange),
    'data-week-range': flag(week && (cell.state.rangeStart || cell.state.rangeEnd || cell.state.inRange)),
  }
}

export function getCalendarWeekLabels(labels: readonly string[], weekStartsOn: number) {
  return Array.from({ length: 7 }, (_, index) => labels[(index + weekStartsOn) % 7] ?? '')
}

export function getCalendarHeaderState(state: ReturnType<CalendarController['getState']>, controller: CalendarController) {
  return {
    ...getCalendarHeaderView({ state, controller }, controller.getOptions()),
    state, controller,
    viewDate: state.viewDate, panel: state.panel, granularity: state.granularity,
    previousYear: () => controller.navigate('previous-year'),
    previousMonth: () => controller.navigate('previous-month'),
    nextMonth: () => controller.navigate('next-month'),
    nextYear: () => controller.navigate('next-year'),
    previous: () => controller.navigate('previous-panel'),
    next: () => controller.navigate('next-panel'),
    today: () => controller.navigate('today'),
    setPanel: controller.setPanel,
    setYear: controller.setYear,
    setMonth: controller.setMonth,
  }
}

export type CalendarHeaderState = ReturnType<typeof getCalendarHeaderState>
