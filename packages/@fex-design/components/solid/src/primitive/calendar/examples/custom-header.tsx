import { CalendarRoot } from '@fex-design/solid/primitive/calendar'
import { ExampleContent } from './_parts/content'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function CustomHeaderExample() {
  return (
    <CalendarRoot
      {...getCalendarUIOptions({ defaultViewDate: calendarDemoDate })}
      class={calendarUIRootClassName}
      data-fullscreen={true}
    >
      <ExampleContent
        options={{ defaultViewDate: calendarDemoDate }}
        headerRender={({ state, controller }) => (
          <div class="flex w-full items-center justify-between">
            <button type="button" onClick={() => controller.navigate('previous-panel')}>
              上一页
            </button>
            <strong>
              {state.viewDate.year} / {state.viewDate.month}
            </strong>
            <button type="button" onClick={() => controller.navigate('next-panel')}>
              下一页
            </button>
          </div>
        )}
      />
    </CalendarRoot>
  )
}
