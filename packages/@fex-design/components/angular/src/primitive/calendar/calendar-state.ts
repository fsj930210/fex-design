import { computed } from '@angular/core'
import { createCalendar, type CalendarOptions, type CalendarValue } from '@fex-design/core/calendar'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'
export function createCalendarState<TValue extends CalendarValue = CalendarValue>(options: () => CalendarOptions<TValue>) {
  const controller = createCalendar(options)
  const snapshot = createCoreStoreSignal(controller)
  const state = computed(() => { snapshot(); return controller.getState() })
  const grid = computed(() => { snapshot(); return controller.getGrid() })
  return { controller, state, grid }
}
