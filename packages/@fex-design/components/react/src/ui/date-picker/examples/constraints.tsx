import { DatePicker, RangePicker } from '@fex-design/react/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

export function DatePickerConstraintsExample() {
const min = createCalendarDate(2026, 10, 1)
const max = createCalendarDate(2026, 12, 31)
return (
<div className="flex w-full min-w-0 flex-col gap-4">
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">2026-10-01 至 2026-12-31</p>
<DatePicker minDate={min} maxDate={max} />
<RangePicker minDate={min} maxDate={max} />
</section>
</div>
)
}
