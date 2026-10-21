import { DatePicker, createDatePickerDateTime } from '@fex-design/react/ui/date-picker'

export function DatePickerDateTimeFormatExample() {
  const initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">YYYY-MM-DD HH:mm</p>
        <DatePicker format="YYYY-MM-DD HH:mm" showTime={true} defaultValue={initial} />
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">YYYY-MM-DD HH:mm:ss</p>
        <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={true} defaultValue={initial} />
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">YYYY-MM-DD hh:mm A</p>
        <DatePicker
          format="YYYY-MM-DD hh:mm A"
          showTime={{ use12Hours: true, step: { minute: 5 } }}
          defaultValue={initial}
        />
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">选择日期时默认使用 08:30</p>
        <DatePicker
          format="YYYY-MM-DD HH:mm"
          showTime={{ format: 'HH:mm', defaultOpenValue: { hour: 8, minute: 30, second: 0 } }}
        />
      </section>
    </div>
  )
}
