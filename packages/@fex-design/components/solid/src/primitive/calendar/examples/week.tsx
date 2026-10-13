import { CalendarRoot } from '@fex-design/solid/primitive/calendar'
import { ExampleContent } from './_parts/content'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function WeekExample() {
  return (
    <CalendarRoot
      {...getCalendarUIOptions({
        defaultViewDate: calendarDemoDate,
        showWeek: true,
        weekStartsOn: 1,
        locale: { firstWeekContainsDate: 4 },
      })}
      class={calendarUIRootClassName}
      data-fullscreen={true}
    >
      <ExampleContent
        options={{
          defaultViewDate: calendarDemoDate,
          showWeek: true,
          weekStartsOn: 1,
          locale: { firstWeekContainsDate: 4 },
        }}
      />
    </CalendarRoot>
  )
}
