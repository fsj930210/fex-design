import type { TimePickerControllerOptions } from '@fex-design/core/time-picker/types'
import { createTimePickerController } from '@fex-design/core/time-picker/create-time-picker-controller'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'

export function useTimePicker(options: TimePickerControllerOptions = {}) {
  const onChange = useMemoizedFn<NonNullable<TimePickerControllerOptions['onChange']>>(
    (value, details) => options.onChange?.(value, details),
  )
  const controller = useLazyRef(() => createTimePickerController({ ...options, onChange })).current
  const snapshot = useCoreStore(controller)
  // Props synchronize the external controller after commit; core deduplicates snapshots.
  useIsomorphicLayoutEffect(() => controller.setOptions({ ...options, onChange }))
  return { controller, snapshot }
}
