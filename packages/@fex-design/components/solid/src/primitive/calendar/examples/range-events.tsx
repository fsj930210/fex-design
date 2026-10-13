import { Show } from 'solid-js'
import { CalendarRoot } from '@fex-design/solid/primitive/calendar'
import { ExampleContent } from './_parts/content'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { calendarDemoDate, calendarDemoEvent } from '@fex-design/docs-shared/calendar-demo-data'
export function RangeEventsExample() {
  return (
    <CalendarRoot
      {...getCalendarUIOptions({ defaultViewDate: calendarDemoDate })}
      class={calendarUIRootClassName}
      data-fullscreen={true}
    >
      <ExampleContent
        options={{ defaultViewDate: calendarDemoDate }}
        classNames={{ cell: 'px-0', cellContent: 'overflow-visible' }}
        cellRender={({ cell }) => {
          const event = () => calendarDemoEvent(cell)
          return <Show when={event()}>{item => (
            <div class="bg-primary text-primary-foreground px-2" data-segment={item().segment}>
              {item().label}
            </div>
          )}</Show>
        }}
      />
    </CalendarRoot>
  )
}
