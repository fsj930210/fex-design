import { DatePicker } from '@fex-design/react/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

const values = [5, 6, 7, 12, 13, 19, 26].map((day) => createCalendarDate(2026, 10, day))

export function DatePickerMultipleExample() {
  return (
    <div className="flex w-full min-w-0 flex-col items-stretch gap-4">
      <div className="flex w-full min-w-0 flex-col gap-2">
        <span className="text-sm text-muted-foreground">默认换行</span>
        <DatePicker multiple defaultValue={values} className="w-full" />
      </div>
      <div className="flex w-full min-w-0 flex-col gap-2">
        <span className="text-sm text-muted-foreground">最多显示 2 个标签</span>
        <DatePicker multiple defaultValue={values} maxCount={2} className="w-full" />
      </div>
    </div>
  )
}
