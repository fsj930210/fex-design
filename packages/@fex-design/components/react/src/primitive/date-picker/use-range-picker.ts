import type { CalendarValue } from '@fex-design/core/calendar'
import {
  createRangePicker,
  type RangePickerOptions,
} from '@fex-design/core/date-picker/create-range-picker'
import { definedPickerOptions } from '@fex-design/core/date-picker/options'
import { shallowEqualObject } from '@fex-design/utils'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import { useLatest } from '@fex-design/react/hooks/use-latest'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'

export type UseRangePickerOptions<TValue extends CalendarValue = CalendarValue> =
  RangePickerOptions<TValue>

export function useRangePicker<TValue extends CalendarValue = CalendarValue>(
  options: UseRangePickerOptions<TValue>,
) {
  const disabledDate = useMemoizedFn(
    (...args: Parameters<NonNullable<UseRangePickerOptions<TValue>['disabledDate']>>) =>
      options.disabledDate?.(...args) ?? false,
  )
  const latest = useLatest(
    definedPickerOptions({ ...options, ...(options.disabledDate ? { disabledDate } : {}) }),
  )
  const controller = useLazyRef(() => createRangePicker<TValue>(latest.current)).current
  const previous = useLazyRef(() => latest.current)
  useCoreStore(controller)
  useIsomorphicLayoutEffect(() => {
    // Props synchronize an external core controller after React commits.
    if (shallowEqualObject(previous.current, latest.current)) return
    previous.current = latest.current
    controller.setOptions(latest.current)
  })
  return { ...controller.getState(), ...controller, controller }
}

export type UseRangePickerReturn<TValue extends CalendarValue = CalendarValue> = ReturnType<
  typeof useRangePicker<TValue>
>
