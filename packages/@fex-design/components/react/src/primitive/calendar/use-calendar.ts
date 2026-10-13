import { createCalendar, type CalendarOptions, type CalendarValue } from '@fex-design/core/calendar'
import { useLatest } from '@fex-design/react/hooks/use-latest'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
export function useCalendar<TValue extends CalendarValue = CalendarValue>(
  options: CalendarOptions<TValue>,
) {
  const latest = useLatest(options)
  const controller = useLazyRef(() => createCalendar(() => latest.current)).current
  useCoreStore(controller)
  return { controller, state: controller.getState(), grid: controller.getGrid() }
}
