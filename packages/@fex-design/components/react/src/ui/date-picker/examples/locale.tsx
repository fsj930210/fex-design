import { DatePicker, RangePicker } from '@fex-design/react/ui/date-picker'

export function DatePickerLocaleExample() {
  const english = {
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    year: 'Year',
    yearSuffix: '',
    month: 'Month',
    datePanel: 'Date',
    monthPanel: 'Month',
    previous: 'Previous',
    next: 'Next',
    today: 'Today',
    week: 'Week',
  }
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">中文</p>
        <DatePicker />
        <RangePicker />
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2" lang="en">
        <p className="text-sm font-medium">English · Monday first</p>
        <DatePicker
          calendarProps={{ locale: english }}
          weekStartsOn={1}
          inputProps={{ placeholder: 'Select date', 'aria-label': 'Select date' }}
        />
        <RangePicker
          calendarProps={{ locale: english }}
          weekStartsOn={1}
          startInputProps={{ placeholder: 'Start date', 'aria-label': 'Start date' }}
          endInputProps={{ placeholder: 'End date', 'aria-label': 'End date' }}
        />
      </section>
    </div>
  )
}
