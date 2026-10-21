import { Calendar } from '@fex-design/solid/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function CardExample() {
  return (
    <div class="max-w-sm">
      <Calendar defaultViewDate={calendarDemoDate} fullscreen={false} />
    </div>
  )
}
