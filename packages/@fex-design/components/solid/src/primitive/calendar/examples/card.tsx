import { CalendarRoot } from '@fex-design/solid/primitive/calendar'
import { ExampleContent } from './_parts/content'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function CardExample() {
  return (
    <div class="max-w-sm">
      <CalendarRoot
        {...getCalendarUIOptions({ defaultViewDate: calendarDemoDate, fullscreen: false })}
        class={calendarUIRootClassName}
        data-fullscreen={false}
      >
        <ExampleContent options={{ defaultViewDate: calendarDemoDate, fullscreen: false }} />
      </CalendarRoot>
    </div>
  )
}
