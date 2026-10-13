import { CalendarRoot } from '@fex-design/solid/primitive/calendar'
import { ExampleContent } from './_parts/content'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { calendarDemoDate, calendarDemoEnglish } from '@fex-design/docs-shared/calendar-demo-data'
export function LocaleExample() {
  return (
    <CalendarRoot
      {...getCalendarUIOptions({
        defaultViewDate: calendarDemoDate,
        locale: calendarDemoEnglish,
        showWeek: true,
      })}
      class={calendarUIRootClassName}
      data-fullscreen={true}
    >
      <ExampleContent
        options={{ defaultViewDate: calendarDemoDate, locale: calendarDemoEnglish, showWeek: true }}
      />
    </CalendarRoot>
  )
}
