import { DatePicker, RangePicker } from '@fex-design/react/ui/date-picker'

export function DatePickerSizesExample() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">sm</p>
        <DatePicker inputProps={{ size: 'sm' }} />
        <RangePicker inputProps={{ size: 'sm' }} />
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">md</p>
        <DatePicker inputProps={{ size: 'md' }} />
        <RangePicker inputProps={{ size: 'md' }} />
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">lg</p>
        <DatePicker inputProps={{ size: 'lg' }} />
        <RangePicker inputProps={{ size: 'lg' }} />
      </section>
    </div>
  )
}
