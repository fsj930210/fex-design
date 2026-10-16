import { DatePicker, RangePicker } from '@fex-design/solid/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

export function DatePickerDirectionExample() {
  const popupAppearance = {
    getPopupContainer: (reference: HTMLElement | null) => reference?.closest<HTMLElement>('[dir]') ?? document.body,
  }
  const date = createCalendarDate(2026, 10, 15)
  const range = { start: date, end: date.add({ days: 7 }) }
  return (
    <div class="flex w-full min-w-0 flex-col gap-6">
      <section class="flex w-full min-w-0 flex-col gap-2" dir="ltr">
        <p class="text-sm font-medium">LTR</p>
        <DatePicker defaultValue={date} popoverProps={popupAppearance} />
        <RangePicker defaultValue={range} popoverProps={popupAppearance} />
      </section>
      <section class="flex w-full min-w-0 flex-col gap-2" dir="rtl">
        <p class="text-sm font-medium">RTL</p>
        <DatePicker defaultValue={date} popoverProps={popupAppearance} />
        <RangePicker defaultValue={range} popoverProps={popupAppearance} />
      </section>
    </div>
  )
}
