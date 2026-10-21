import { Show } from 'solid-js'
import { DatePicker, RangePicker } from '@fex-design/solid/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
import type { CalendarCellRenderContext } from '@fex-design/core/calendar'

export function DatePickerCellRenderExample() {
  const date = createCalendarDate(2026, 10, 15)
  const customCell = ({ cell }: CalendarCellRenderContext) => (
    <Show when={cell.panel === 'date' && cell.date.day === 15}>
      <span class="pointer-events-none absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary" />
    </Show>
  )
  return (
    <div class="flex w-full min-w-0 flex-col gap-4">
      <section class="flex w-full min-w-0 flex-col gap-2">
        <p class="text-sm font-medium">每月 15 日</p>
        <DatePicker
          defaultValue={date}
          calendarProps={{
            cellRender: customCell,
            classNames: { cellContent: 'pointer-events-none' },
          }}
        />
        <RangePicker
          defaultValue={{ start: date, end: date.add({ days: 7 }) }}
          calendarProps={{
            cellRender: customCell,
            classNames: { cellContent: 'pointer-events-none' },
          }}
        />
      </section>
    </div>
  )
}
