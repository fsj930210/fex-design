import { useState } from 'react'
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter, DatePickerPreset, type DatePickerSelectionValue } from '@fex-design/react/primitive/date-picker'

import { getCalendarToday, type CalendarRange } from '@fex-design/core/calendar'

export function DatePickerPresetsExample() {
const [value, setValue] = useState<DatePickerSelectionValue>(null)
const [range, setRange] = useState<CalendarRange>({})
const [dateOpen, setDateOpen] = useState<boolean>(false)
const [rangeOpen, setRangeOpen] = useState<boolean>(false)
function chooseDate(days: number) {
  setValue(getCalendarToday().add({ days }))
  setDateOpen(false)
}
function chooseRange(preset: 'week' | 'month') {
  const today = getCalendarToday()
  const start = preset === 'week' ? today.subtract({ days: 6 }) : today.with({ day: 1 })
  const end = preset === 'week' ? today : start.add({ months: 1 }).subtract({ days: 1 })
  setRange({ start, end })
  setRangeOpen(false)
}
return (
<div className="flex w-full min-w-0 flex-col gap-4">
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">日期</p>
<DatePickerRoot value={value} open={dateOpen} onChange={setValue} onOpenChange={setDateOpen}>
<DatePickerTrigger />
<DatePickerContent>
<div className="flex min-w-0 max-[480px]:flex-col">
<aside className="flex shrink-0 flex-col gap-1 border-e border-border p-2 max-[480px]:flex-row max-[480px]:flex-wrap max-[480px]:border-e-0 max-[480px]:border-b max-[480px]:[&_[data-slot=date-picker-preset]]:w-auto" aria-label="预设日期">
<DatePickerPreset onClick={() => chooseDate(-1)}>昨天</DatePickerPreset>
<DatePickerPreset onClick={() => chooseDate(7)}>下周</DatePickerPreset>
</aside>
<div className="min-w-0 flex-1">
<DatePickerPanel />
<DatePickerFooter />
</div>
</div>
</DatePickerContent>
</DatePickerRoot>
</section>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">范围</p>
<RangePickerRoot value={range} open={rangeOpen} onChange={setRange} onOpenChange={setRangeOpen}>
<RangePickerTrigger />
<RangePickerContent>
<div className="flex min-w-0 max-[480px]:flex-col">
<aside className="flex shrink-0 flex-col gap-1 border-e border-border p-2 max-[480px]:flex-row max-[480px]:flex-wrap max-[480px]:border-e-0 max-[480px]:border-b max-[480px]:[&_[data-slot=date-picker-preset]]:w-auto" aria-label="预设范围">
<DatePickerPreset onClick={() => chooseRange('week')}>最近 7 天</DatePickerPreset>
<DatePickerPreset onClick={() => chooseRange('month')}>本月</DatePickerPreset>
</aside>
<div className="min-w-0 flex-1">
<RangePickerPanelGroup />
<DatePickerFooter />
</div>
</div>
</RangePickerContent>
</RangePickerRoot>
</section>
</div>
)
}
