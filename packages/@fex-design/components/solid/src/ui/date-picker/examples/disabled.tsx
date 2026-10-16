import { DatePicker, RangePicker } from '@fex-design/solid/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

export function DatePickerDisabledExample() {
const date = createCalendarDate(2026, 10, 15)
const range = { start: date, end: date.add({ days: 7 }) }
return (
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">禁用</p>
<DatePicker disabled={true} defaultValue={date} />
<RangePicker disabled={true} defaultValue={range} />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">默认（只读输入，可选择）</p>
<DatePicker defaultValue={date} />
<RangePicker defaultValue={range} />
</section>
</div>
)
}
