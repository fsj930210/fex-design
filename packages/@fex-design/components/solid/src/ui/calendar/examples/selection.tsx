import { createSignal } from 'solid-js'
import type { CalendarDate } from '@fex-design/core/calendar'
import { Calendar } from '@fex-design/solid/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function SelectionExample() {
  const [value, setValue] = createSignal<CalendarDate | null>(null)
  return (
    <>
      <p>选中：{value()?.toString() ?? '未选择'}</p>
      <Calendar value={value()} defaultViewDate={calendarDemoDate} onChange={setValue} />
    </>
  )
}
