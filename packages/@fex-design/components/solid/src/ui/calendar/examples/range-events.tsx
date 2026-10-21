import { Show } from 'solid-js'
import { Calendar } from '@fex-design/solid/ui/calendar'
import { calendarDemoDate, calendarDemoEvent } from '@fex-design/docs-shared/calendar-demo-data'
export function RangeEventsExample() {
  return (
    <Calendar
      defaultViewDate={calendarDemoDate}
      classNames={{ cell: 'px-0', cellContent: 'overflow-visible' }}
      cellRender={({ cell }) => {
        const event = () => calendarDemoEvent(cell)
        return (
          <Show when={event()}>
            {(event) => (
              <div class="bg-primary text-primary-foreground px-2" data-segment={event().segment}>
                {event().label}
              </div>
            )}
          </Show>
        )
      }}
    />
  )
}
