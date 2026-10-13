import { Calendar } from '@fex-design/solid/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function CssVariablesExample() {
  return <div style={{ "--calendar-hover-background": "var(--success)", "--calendar-selected-background": "var(--primary)", "--calendar-selected-foreground": "var(--primary-foreground)", "--calendar-today-color": "var(--danger)" }}><Calendar defaultViewDate={calendarDemoDate} /></div>
}
