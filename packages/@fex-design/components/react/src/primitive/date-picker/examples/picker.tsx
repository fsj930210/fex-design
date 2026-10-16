import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/react/primitive/date-picker'

export function DatePickerPickerExample() {

return (
<div className="flex w-full min-w-0 flex-col gap-4">
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">日期</p>
<DatePickerRoot picker={'date'}>
<DatePickerTrigger />
<DatePickerContent>
<DatePickerPanel />
<DatePickerFooter></DatePickerFooter>
</DatePickerContent>
</DatePickerRoot>
</section>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">周</p>
<DatePickerRoot picker={'week'}>
<DatePickerTrigger />
<DatePickerContent>
<DatePickerPanel />
<DatePickerFooter></DatePickerFooter>
</DatePickerContent>
</DatePickerRoot>
</section>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">月份</p>
<DatePickerRoot picker={'month'}>
<DatePickerTrigger />
<DatePickerContent>
<DatePickerPanel />
<DatePickerFooter></DatePickerFooter>
</DatePickerContent>
</DatePickerRoot>
</section>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">季度</p>
<DatePickerRoot picker={'quarter'}>
<DatePickerTrigger />
<DatePickerContent>
<DatePickerPanel />
<DatePickerFooter></DatePickerFooter>
</DatePickerContent>
</DatePickerRoot>
</section>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">年份</p>
<DatePickerRoot picker={'year'}>
<DatePickerTrigger />
<DatePickerContent>
<DatePickerPanel />
<DatePickerFooter></DatePickerFooter>
</DatePickerContent>
</DatePickerRoot>
</section>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">月份范围</p>
<RangePickerRoot picker={'month'}>
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
