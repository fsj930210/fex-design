import { DatePicker, RangePicker } from '@fex-design/react/ui/date-picker'
import type { CalendarDate } from '@fex-design/core/calendar'

export function DatePickerDisabledDateExample() {
const disabledWeekend = (date: CalendarDate) => date.dayOfWeek > 5
return (
<div className="flex w-full min-w-0 flex-col gap-4">
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">工作日</p>
<DatePicker disabledDate={disabledWeekend} />
<RangePicker disabledDate={disabledWeekend} />
</section>
</div>
)
}
