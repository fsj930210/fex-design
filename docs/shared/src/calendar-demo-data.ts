import { createCalendarDate, compareCalendarDate, type CalendarCell } from '@fex-design/core/calendar'
import { Solar } from 'lunar-typescript'
export const calendarDemoDate = createCalendarDate(2026, 10, 8)
export const calendarDemoMin = createCalendarDate(2026, 10, 3)
export const calendarDemoMax = createCalendarDate(2026, 11, 20)
export function calendarDemoNotices(cell: CalendarCell) {
  if (cell.panel === 'month') return cell.date.month === 10 ? ['本月发布', '季度复盘'] : []
  if (cell.state.outside) return []
  return cell.date.day === 8 ? ['设计评审', '发布准备'] : cell.date.day === 15 ? ['项目发布'] : []
}
const start = createCalendarDate(2026, 10, 8), end = createCalendarDate(2026, 10, 13)
export function calendarDemoEvent(cell: CalendarCell) {
  if (cell.panel !== 'date' || compareCalendarDate(cell.date, start) < 0 || compareCalendarDate(cell.date, end) > 0) return null
  const segment = compareCalendarDate(cell.date, start) === 0 ? 'start' : compareCalendarDate(cell.date, end) === 0 ? 'end' : 'middle'
  return { label: segment === 'start' || cell.columnIndex === 0 ? '发布窗口' : '\u00a0', segment }
}
export function calendarDemoLunar(cell: CalendarCell) {
  if (cell.panel !== 'date') return ''
  const lunar = Solar.fromYmd(cell.date.year, cell.date.month, cell.date.day).getLunar()
  return `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`
}
export const calendarDemoEnglish = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  year: 'Year', month: 'Month', datePanel: 'Month', monthPanel: 'Year',
  previous: 'Previous', next: 'Next', today: 'Today', week: 'Week',
  weekStartsOn: 1 as const, firstWeekContainsDate: 4 as const,
}


