import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/react/primitive/date-picker'
import type { CalendarDate } from '@fex-design/core/calendar'

export function DatePickerDisabledDateExample() {
const disabledWeekend = (date: CalendarDate) => date.dayOfWeek > 5
return (
<div className="flex w-full min-w-0 flex-col gap-4">
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">工作日</p>
<DatePickerRoot disabledDate={disabledWeekend}>
<DatePickerTrigger />
<DatePickerContent>
<DatePickerPanel />
<DatePickerFooter></DatePickerFooter>
</DatePickerContent>
</DatePickerRoot>
<RangePickerRoot disabledDate={disabledWeekend}>
<RangePickerTrigger />
<RangePickerContent>
<RangePickerPanelGroup />
<DatePickerFooter></DatePickerFooter>
</RangePickerContent>
</RangePickerRoot>
</section>
</div>
)
}
