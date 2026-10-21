import { DatePicker, RangePicker } from '@fex-design/solid/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

export function DatePickerSemanticStylesExample() {
  const date = createCalendarDate(2026, 10, 15)
  const range = { start: date, end: date.add({ days: 7 }) }
  const inputAppearance = {
    classNames: {
      root: 'rounded-xl border-2 hover:border-violet-500 focus-within:border-violet-600 focus-within:ring-violet-500/20',
      control: 'font-medium text-violet-950',
      suffix: 'text-violet-600',
      clear: 'text-violet-600 hover:text-violet-800',
    },
    styles: { root: { 'border-color': '#8b5cf6', 'background-color': '#f5f3ff' } },
  }
  const calendarAppearance = {
    classNames: {
      header: 'border-violet-200 bg-violet-100 text-violet-950',
      weekHeader: 'bg-violet-50 text-violet-600',
      grid: 'bg-violet-50',
      cellTrigger: 'font-medium',
    },
    style: {
      'background-color': '#f5f3ff',
      '--calendar-selected-background': '#7c3aed',
      '--calendar-selected-foreground': '#ffffff',
      '--calendar-hover-background': '#ede9fe',
      '--calendar-today-color': '#8b5cf6',
    },
  }
  const popupAppearance = {
    classNames: { root: 'rounded-2xl shadow-lg' },
    styles: {
      root: { 'border-color': '#8b5cf6', 'border-width': '2px', 'background-color': '#f5f3ff' },
    },
  }
  const partClasses = {
    footer: 'border-violet-200 bg-violet-100',
    separator: 'text-violet-600',
    today: 'border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-200',
  }
  return (
    <div class="flex w-full min-w-0 flex-col gap-6">
      <section class="flex w-full min-w-0 flex-col gap-2">
        <p class="text-sm font-medium">默认样式</p>
        <DatePicker defaultValue={date} />
        <RangePicker defaultValue={range} />
      </section>
      <section class="flex w-full min-w-0 flex-col gap-2">
        <p class="text-sm font-medium">紫色自定义样式</p>
        <DatePicker
          defaultValue={date}
          inputProps={inputAppearance}
          calendarProps={calendarAppearance}
          popoverProps={popupAppearance}
          classNames={partClasses}
        />
        <RangePicker
          defaultValue={range}
          inputProps={inputAppearance}
          calendarProps={calendarAppearance}
          popoverProps={popupAppearance}
          classNames={partClasses}
        />
      </section>
    </div>
  )
}
