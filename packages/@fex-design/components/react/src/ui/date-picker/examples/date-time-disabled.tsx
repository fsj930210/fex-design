import { DatePicker, RangePicker, createDatePickerDateTime } from '@fex-design/react/ui/date-picker'
import type { DatePickerDisabledTime } from '@fex-design/react/primitive/date-picker'

export function DatePickerDateTimeDisabledExample() {
const initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
const end = createDatePickerDateTime(2026, 10, 15, 17, 45, 0)
const disabledTime: DatePickerDisabledTime = (date, info) => ({ disabledHours: () => date.day === 15 ? Array.from({ length: info.activePart === 'end' ? 17 : 9 }, (_, hour) => hour) : [] })
  return (<div className="flex w-full min-w-0 flex-col gap-6">
<section className="flex w-full min-w-0 flex-col gap-2"><p className="text-sm font-medium">日期时间：确认后提交</p>
<DatePicker showTime defaultValue={initial} disabledTime={disabledTime} />
</section>
<section className="flex w-full min-w-0 flex-col gap-2"><p className="text-sm font-medium">日期时间范围：分别确认开始和结束</p>
<RangePicker showTime defaultValue={{ start: initial, end }} disabledTime={disabledTime} />
</section>
</div>)
}
