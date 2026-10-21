import { RangePicker } from '@fex-design/solid/ui/date-picker'

import { getCalendarToday } from '@fex-design/core/calendar'
export function DatePickerRangeExample() {
  const today = getCalendarToday()

  return (
    <div class="flex flex-wrap items-start gap-4">
      <RangePicker defaultValue={{ start: today, end: today.add({ days: 7 }) }} />
    </div>
  )
}
