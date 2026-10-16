import { DatePicker, RangePicker } from '@fex-design/react/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

export function DatePickerFormatExample() {
const date = createCalendarDate(2026, 10, 15)
return (
<div className="flex w-full min-w-0 flex-col gap-4">
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">YYYY/MM/DD</p>
<DatePicker format={'YYYY/MM/DD'} defaultValue={date} />
<RangePicker format={'YYYY/MM/DD'} defaultValue={{ start: date, end: date.add({ days: 7 }) }} />
</section>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">YYYY/MM</p>
<DatePicker picker={'month'} format={'YYYY/MM'} />
</section>
</div>
)
}
