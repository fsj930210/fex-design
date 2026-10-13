import { CalendarRoot, CalendarCellTrigger } from '@fex-design/solid/primitive/calendar'
import { ExampleContent } from './_parts/content'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { calendarDemoDate, calendarDemoLunar } from '@fex-design/docs-shared/calendar-demo-data'
export function LunarExample() {
  return (
    <CalendarRoot
      {...getCalendarUIOptions({ defaultViewDate: calendarDemoDate })}
      class={calendarUIRootClassName}
      data-fullscreen={true}
    >
      <ExampleContent
        options={{ defaultViewDate: calendarDemoDate }}
        fullCellRender={({ cell }) => (
          <CalendarCellTrigger cell={cell} class="flex-col items-center">
            <span>{cell.label}</span>
            <small>{calendarDemoLunar(cell)}</small>
          </CalendarCellTrigger>
        )}
      />
    </CalendarRoot>
  )
}
