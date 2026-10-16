import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter, createDatePickerDateTime } from '@fex-design/react/primitive/date-picker'

export function DatePickerDateTimeFormatExample() {
const initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
  return (<div className="flex w-full min-w-0 flex-col gap-6">
<section className="flex w-full min-w-0 flex-col gap-2"><p className="text-sm font-medium">YYYY-MM-DD HH:mm</p>
<DatePickerRoot format="YYYY-MM-DD HH:mm" showTime={true} defaultValue={initial}>
      <DatePickerTrigger />
      <DatePickerContent><DatePickerPanel /><DatePickerFooter /></DatePickerContent>
    </DatePickerRoot>
</section>
<section className="flex w-full min-w-0 flex-col gap-2"><p className="text-sm font-medium">YYYY-MM-DD HH:mm:ss</p>
<DatePickerRoot format="YYYY-MM-DD HH:mm:ss" showTime={true} defaultValue={initial}>
      <DatePickerTrigger />
      <DatePickerContent><DatePickerPanel /><DatePickerFooter /></DatePickerContent>
    </DatePickerRoot>
</section>
<section className="flex w-full min-w-0 flex-col gap-2"><p className="text-sm font-medium">YYYY-MM-DD hh:mm A</p>
<DatePickerRoot format="YYYY-MM-DD hh:mm A" showTime={{ use12Hours: true, step: { minute: 5 } }} defaultValue={initial}>
      <DatePickerTrigger />
      <DatePickerContent><DatePickerPanel /><DatePickerFooter /></DatePickerContent>
    </DatePickerRoot>
</section>
<section className="flex w-full min-w-0 flex-col gap-2"><p className="text-sm font-medium">选择日期时默认使用 08:30</p>
<DatePickerRoot format="YYYY-MM-DD HH:mm" showTime={{ format: 'HH:mm', defaultOpenValue: { hour: 8, minute: 30, second: 0 } }} >
      <DatePickerTrigger />
      <DatePickerContent><DatePickerPanel /><DatePickerFooter /></DatePickerContent>
    </DatePickerRoot>
</section>
</div>)
}
