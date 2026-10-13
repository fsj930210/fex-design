import { computed } from 'vue'
import { createCalendar, type CalendarOptions, type CalendarValue } from '@fex-design/core/calendar'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
export function useCalendar<TValue extends CalendarValue = CalendarValue>(options: () => CalendarOptions<TValue>) {
  const controller = createCalendar(options)
  const snapshot = useCoreStore(controller)
  const state = computed(() => { snapshot.value; return controller.getState() })
  const grid = computed(() => { snapshot.value; return controller.getGrid() })
  return { controller, state, grid }
}
