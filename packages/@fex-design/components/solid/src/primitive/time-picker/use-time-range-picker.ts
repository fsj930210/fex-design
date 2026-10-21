import { createTimeRangePickerController } from '@fex-design/core/time-picker/create-time-range-picker-controller'
import type { TimeRangePickerOptions } from '@fex-design/core/time-picker/range-types'
import { createEffect, type Accessor } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'

export function useTimeRangePicker(
  source: TimeRangePickerOptions | Accessor<TimeRangePickerOptions> = {},
) {
  const options = () => (typeof source === 'function' ? source() : source)
  const controller = createTimeRangePickerController(options())
  const snapshot = createCoreStoreSignal(controller)
  // Synchronize reactive options with core; the store helper owns cleanup.
  createEffect(() => controller.setOptions(options()))
  return { controller, snapshot }
}
