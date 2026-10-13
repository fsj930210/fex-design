import { Calendar } from '@fex-design/react/ui/calendar'
import { calendarDemoDate, calendarDemoEvent } from '@fex-design/docs-shared/calendar-demo-data'
export function RangeEventsExample() {
  return <Calendar defaultViewDate={calendarDemoDate} classNames={{ cell: "px-0", cellContent: "overflow-visible" }} cellRender={({ cell }) => {const event = calendarDemoEvent(cell); return event && <div className="bg-primary text-primary-foreground px-2" data-segment={event.segment}>{event.label}</div> }} />
}
