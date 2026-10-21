import { Calendar } from '@fex-design/react/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function WeekExample() {
  return (
    <Calendar
      defaultViewDate={calendarDemoDate}
      showWeek
      weekStartsOn={1}
      locale={{ firstWeekContainsDate: 4 }}
    />
  )
}
