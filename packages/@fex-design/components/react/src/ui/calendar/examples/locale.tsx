import { Calendar } from '@fex-design/react/ui/calendar'
import { calendarDemoDate, calendarDemoEnglish } from '@fex-design/docs-shared/calendar-demo-data'
export function LocaleExample() {
  return <Calendar defaultViewDate={calendarDemoDate} locale={calendarDemoEnglish} showWeek />
}
