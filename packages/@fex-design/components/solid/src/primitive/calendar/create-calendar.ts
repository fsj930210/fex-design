import { createMemo } from 'solid-js'
import {
  createCalendar as createCoreCalendar,
  type CalendarOptions,
  type CalendarValue,
} from '@fex-design/core/calendar'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
export function createCalendar<TValue extends CalendarValue = CalendarValue>(
  options: () => CalendarOptions<TValue>,
) {
  const controller = createCoreCalendar(options)
  const snapshot = createCoreStoreSignal(controller)
  const state = createMemo(() => {
    snapshot()
    return controller.getState()
  })
  const grid = createMemo(() => {
    snapshot()
    return controller.getGrid()
  })
  return { controller, state, grid }
}
