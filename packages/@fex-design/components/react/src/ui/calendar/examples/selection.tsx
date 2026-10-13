import { useState } from 'react'
import type { CalendarDate } from '@fex-design/core/calendar'
import { Calendar } from '@fex-design/react/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function SelectionExample() {
  const [value, setValue] = useState<CalendarDate | null>(null)
  return <><p>选中：{value?.toString() ?? "未选择"}</p><Calendar value={value} defaultViewDate={calendarDemoDate} onChange={setValue} /></>
}
