import { CalendarRoot } from '@fex-design/solid/primitive/calendar'
import { ExampleContent } from './_parts/content'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { createSignal } from 'solid-js'
import type { CalendarDate } from '@fex-design/core/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function SelectionExample() {
  const [value, setValue] = createSignal<CalendarDate | null>(null)
  return (
    <>
      <p>选中：{value()?.toString() ?? '未选择'}</p>
      <CalendarRoot
        {...getCalendarUIOptions({
          value: value(),
          defaultViewDate: calendarDemoDate,
          onChange: setValue,
        })}
        class={calendarUIRootClassName}
        data-fullscreen={true}
      >
        <ExampleContent
          options={{ value: value(), defaultViewDate: calendarDemoDate, onChange: setValue }}
        />
      </CalendarRoot>
    </>
  )
}
