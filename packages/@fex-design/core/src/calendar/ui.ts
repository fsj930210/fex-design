import type { CalendarController, CalendarOptions } from './create-calendar'
import type { CalendarLocale } from './types'
import type { CalendarCell, CalendarDate, CalendarPanel, CalendarSelectInfo } from './types'
import { compareCalendarDate } from './temporal'
import { getCalendarNavigationDate } from './navigation'

export const calendarDefaultLocale: CalendarLocale = {
  weekdays: ['日', '一', '二', '三', '四', '五', '六'],
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  year: '年份', month: '月份', datePanel: '月', monthPanel: '年',
  previous: '上一页', next: '下一页', today: '今天', week: '周',
  weekStartsOn: 0, firstWeekContainsDate: 1,
}

export type { CalendarSelectInfo } from './types'
export type CalendarUIPanel = CalendarPanel
export interface CalendarUIOptions extends Omit<CalendarOptions<CalendarDate>, 'granularity' | 'panel' | 'defaultPanel' | 'onPanelChange' | 'onChange'> {
  onChange?: ((value: CalendarDate) => void) | undefined
  panel?: CalendarUIPanel | undefined
  defaultPanel?: CalendarUIPanel | undefined
  onPanelChange?: ((panel: CalendarUIPanel) => void) | undefined
  onSelect?: ((value: CalendarDate, info: CalendarSelectInfo) => void) | undefined
  fullscreen?: boolean | undefined
  showWeek?: boolean | undefined
  locale?: Partial<CalendarLocale> | undefined
}

export function getCalendarUILocale(options: Pick<CalendarOptions, 'locale' | 'weekStartsOn'>): CalendarLocale {
  const locale = { ...calendarDefaultLocale, ...options.locale }
  return {
    ...locale, weekStartsOn: options.weekStartsOn ?? locale.weekStartsOn,
    weekdays: calendarDefaultLocale.weekdays.map((label, index) => locale.weekdays[index] ?? label),
    months: calendarDefaultLocale.months.map((label, index) => locale.months[index] ?? label),
  }
}

/** UI always selects dates; browsing months never changes the selected value. */
export function getCalendarUIOptions(options: CalendarUIOptions): CalendarOptions<CalendarDate> {
  return {
    value: options.value, defaultValue: options.defaultValue, values: options.values, range: options.range,
    viewDate: options.viewDate, defaultViewDate: options.defaultViewDate,
    panel: options.panel, defaultPanel: options.defaultPanel,
    min: options.min, max: options.max, today: options.today, disabledDate: options.disabledDate,
    granularity: 'date', weekStartsOn: getCalendarUILocale(options).weekStartsOn,
    locale: options.locale, showWeek: options.showWeek, fullscreen: options.fullscreen,
    onChange: options.onChange, onSelect: options.onSelect,
    onPanelChange: options.onPanelChange,
    onViewDateChange: options.onViewDateChange, onCellSelect: options.onCellSelect, onCellHover: options.onCellHover,
  }
}

export interface CalendarRenderContext {
  state: ReturnType<CalendarController['getState']>
  controller: CalendarController
}
export interface CalendarCellRenderContext extends CalendarRenderContext { cell: CalendarCell }
export type CalendarSemanticPart = 'header' | 'weekHeader' | 'weekNumber' | 'grid' | 'row' | 'cell' | 'cellTrigger' | 'cellContent' | 'footer'
export type CalendarSemanticValue<T> = T | ((context: CalendarRenderContext) => T)
export function resolveCalendarSemanticValue<T>(value: CalendarSemanticValue<T> | undefined, context: CalendarRenderContext): T | undefined {
  return typeof value === 'function' ? (value as (context: CalendarRenderContext) => T)(context) : value
}

function weekStart(date: CalendarDate, firstDay: number) {
  return date.subtract({ days: ((date.dayOfWeek % 7) - firstDay + 7) % 7 })
}

export function getCalendarWeekInfo(date: CalendarDate, locale: CalendarLocale) {
  const start = weekStart(date, locale.weekStartsOn)
  const anchor = (year: number) => weekStart(date.with({ year, month: 1, day: locale.firstWeekContainsDate }), locale.weekStartsOn)
  let year = date.year
  if (compareCalendarDate(start, anchor(year)) < 0) year--
  else if (compareCalendarDate(start, anchor(year + 1)) >= 0) year++
  let cursor = anchor(year), week = 1
  while (compareCalendarDate(cursor, start) < 0 && week <= 53) { cursor = cursor.add({ days: 7 }); week++ }
  return { year, week }
}

export function getCalendarHeaderView(context: CalendarRenderContext, options: Pick<CalendarOptions, 'locale' | 'weekStartsOn' | 'min' | 'max'>) {
  const locale = getCalendarUILocale(options)
  const date = context.state.viewDate
  const startYear = options.min?.year ?? date.year - 10
  const endYear = options.max?.year ?? date.year + 10
  const years = Array.from({ length: Math.max(0, endYear - startYear + 1) }, (_, index) => ({ value: startYear + index, label: String(startYear + index) }))
  const months = locale.months.map((label, index) => {
    const start = date.with({ month: index + 1, day: 1 })
    const end = start.add({ months: 1 }).subtract({ days: 1 })
    return { value: index + 1, label, disabled: Boolean(options.min && compareCalendarDate(end, options.min) < 0 || options.max && compareCalendarDate(start, options.max) > 0) }
  })
  function canNavigate(action: 'previous-panel' | 'next-panel') {
    const target = getCalendarNavigationDate(date, context.state.panel, action, date)
    const start = context.state.panel === 'date' ? target.with({ day: 1 }) : target.with({ month: 1, day: 1 })
    const end = start.add(context.state.panel === 'date' ? { months: 1 } : { years: 1 }).subtract({ days: 1 })
    return !(options.min && compareCalendarDate(end, options.min) < 0 || options.max && compareCalendarDate(start, options.max) > 0)
  }
  return {
    locale, years, months,
    canPrevious: canNavigate('previous-panel'), canNext: canNavigate('next-panel'),
  }
}

export function getCalendarUIView(context: CalendarRenderContext, options: CalendarUIOptions) {
  const header = getCalendarHeaderView(context, options)
  const { locale } = header
  const grid = context.controller.getGrid()
  const showWeek = Boolean(options.showWeek && context.state.panel === 'date')
  return {
    ...header, showWeek, fullscreen: options.fullscreen !== false,
    rows: grid.rows.map(cells => ({ key: cells.map(cell => cell.key).join('|'), cells, week: getCalendarWeekInfo(cells[0]!.date, locale) })),
    label: (cell: CalendarCell) => cell.panel === 'month' ? locale.months[cell.date.month - 1] ?? cell.label : cell.label,
  }
}
