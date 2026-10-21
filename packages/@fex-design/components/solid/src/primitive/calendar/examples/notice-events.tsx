import { For } from 'solid-js'
import { CalendarRoot } from '@fex-design/solid/primitive/calendar'
import { ExampleContent } from './_parts/content'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { calendarDemoDate, calendarDemoNotices } from '@fex-design/docs-shared/calendar-demo-data'
export function NoticeEventsExample() {
  return (
    <CalendarRoot
      {...getCalendarUIOptions({ defaultViewDate: calendarDemoDate })}
      class={calendarUIRootClassName}
      data-fullscreen={true}
    >
      <ExampleContent
        options={{ defaultViewDate: calendarDemoDate }}
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
    </CalendarRoot>
  )
}
