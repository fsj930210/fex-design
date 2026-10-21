import type { TimeRangePickerOptions } from '@fex-design/core/time-picker/range-types'
import { createTimeRangePickerController } from '@fex-design/core/time-picker/create-time-range-picker-controller'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'

export function useTimeRangePicker(options: TimeRangePickerOptions = {}) {
  const onChange = useMemoizedFn<NonNullable<TimeRangePickerOptions['onChange']>>(
    (value, details) => options.onChange?.(value, details),
  )
  const onOpenChange = useMemoizedFn((open: boolean) => options.onOpenChange?.(open))
  const controller = useLazyRef(() =>
    createTimeRangePickerController({ ...options, onChange, onOpenChange }),
  ).current
  const snapshot = useCoreStore(controller)
  // Props synchronize the external controller after commit; core deduplicates snapshots.
  useIsomorphicLayoutEffect(() => controller.setOptions({ ...options, onChange, onOpenChange }))
  return { controller, snapshot }
}
