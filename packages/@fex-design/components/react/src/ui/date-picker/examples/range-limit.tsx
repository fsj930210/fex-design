import { RangePicker } from '@fex-design/react/ui/date-picker'
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
<div className="flex w-full min-w-0 flex-col gap-4">
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">最多 7 天</p>
<RangePicker disabledDate={limitDays} />
</section>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">最多 6 个月</p>
<RangePicker picker={'month'} disabledDate={limitMonths} />
</section>
</div>
)
}
