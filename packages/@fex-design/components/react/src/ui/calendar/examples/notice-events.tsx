import { Calendar } from '@fex-design/react/ui/calendar'
import { calendarDemoDate, calendarDemoNotices } from '@fex-design/docs-shared/calendar-demo-data'
export function NoticeEventsExample() {
  return (
    <Calendar
      defaultViewDate={calendarDemoDate}
      cellRender={({ cell }) => (
        <ul>
          {calendarDemoNotices(cell).map((notice) => (
            <li key={notice}>
              <a href="#calendar-notice">{notice}</a>
            </li>
          ))}
        </ul>
      )}
    />
  )
}
