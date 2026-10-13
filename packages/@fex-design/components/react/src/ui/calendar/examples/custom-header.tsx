import { Calendar } from '@fex-design/react/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function CustomHeaderExample() {
  return <Calendar defaultViewDate={calendarDemoDate} headerRender={({ state, controller }) => <div className="flex w-full items-center justify-between"><button type="button" onClick={() => controller.navigate("previous-panel")}>上一页</button><strong>{state.viewDate.year} / {state.viewDate.month}</strong><button type="button" onClick={() => controller.navigate("next-panel")}>下一页</button></div>} />
}
