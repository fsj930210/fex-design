import { RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/solid/primitive/date-picker'
import type { CalendarDate } from '@fex-design/core/calendar'
import type { DatePickerDisabledDateInfo } from '@fex-design/core/date-picker/types'
import { getCalendarValueDate } from '@fex-design/core/calendar/value'

export function DatePickerRangeLimitExample() {
const limitDays = (date: CalendarDate, info: DatePickerDisabledDateInfo) => {
    const from = info.from ? getCalendarValueDate(info.from) : null
    return Boolean(from && (date.toString() < from.subtract({ days: 6 }).toString() || date.toString() > from.add({ days: 6 }).toString()))
  }
const limitMonths = (date: CalendarDate, info: DatePickerDisabledDateInfo) => {
    const from = info.from ? getCalendarValueDate(info.from) : null
    return Boolean(from && Math.abs((date.year - from.year) * 12 + date.month - from.month) > 5)
  }
return (
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">最多 7 天</p>
<RangePickerRoot disabledDate={limitDays}>
<RangePickerTrigger />
<RangePickerContent>
<RangePickerPanelGroup />
<DatePickerFooter></DatePickerFooter>
</RangePickerContent>
</RangePickerRoot>
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">最多 6 个月</p>
<RangePickerRoot picker={'month'} disabledDate={limitMonths}>
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
