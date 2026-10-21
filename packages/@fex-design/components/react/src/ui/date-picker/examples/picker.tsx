import { DatePicker, RangePicker } from '@fex-design/react/ui/date-picker'

export function DatePickerPickerExample() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">日期</p>
        <DatePicker picker={'date'} />
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">周</p>
        <DatePicker picker={'week'} />
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">月份</p>
        <DatePicker picker={'month'} />
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">季度</p>
        <DatePicker picker={'quarter'} />
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">年份</p>
        <DatePicker picker={'year'} />
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">月份范围</p>
        <RangePicker picker={'month'} />
      </section>
    </div>
  )
}
