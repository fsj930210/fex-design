import { CalendarCellTrigger } from '@fex-design/solid/primitive/calendar'
import { Calendar } from '@fex-design/solid/ui/calendar'
import { calendarDemoDate, calendarDemoLunar } from '@fex-design/docs-shared/calendar-demo-data'
export function LunarExample() {
  return <Calendar defaultViewDate={calendarDemoDate} fullCellRender={({ cell }) => <CalendarCellTrigger cell={cell} class="flex-col items-center"><span>{cell.label}</span><small>{calendarDemoLunar(cell)}</small></CalendarCellTrigger>} />
}
