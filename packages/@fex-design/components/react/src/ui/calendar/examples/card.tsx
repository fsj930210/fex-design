import { Calendar } from '@fex-design/react/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function CardExample() {
  return (
    <div className="max-w-sm">
      <Calendar defaultViewDate={calendarDemoDate} fullscreen={false} />
    </div>
  )
}
