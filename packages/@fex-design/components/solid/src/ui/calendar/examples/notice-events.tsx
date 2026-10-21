import { For } from 'solid-js'
import { Calendar } from '@fex-design/solid/ui/calendar'
import { calendarDemoDate, calendarDemoNotices } from '@fex-design/docs-shared/calendar-demo-data'
export function NoticeEventsExample() {
  return (
    <Calendar
      defaultViewDate={calendarDemoDate}
      cellRender={({ cell }) => (
        <ul>
          <For each={calendarDemoNotices(cell)}>
            {(notice) => (
              <li>
                <a href="#calendar-notice">{notice}</a>
              </li>
            )}
          </For>
        </ul>
      )}
    />
  )
}
