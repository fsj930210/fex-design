import { createCalendar, type CalendarOptions, type CalendarValue } from '@fex-design/core/calendar'
import { readableCoreStore } from '@fex-design/svelte/stores/core-store'
import { fromStore } from 'svelte/store'
export function createCalendarState<TValue extends CalendarValue = CalendarValue>(options: () => CalendarOptions<TValue>) {
  const controller = createCalendar(options)
  const snapshot = readableCoreStore(controller)
  const current = fromStore(snapshot)
  return {
    controller,
    get state() { current.current; return controller.getState() },
    get grid() { current.current; return controller.getGrid() },
  }
}
