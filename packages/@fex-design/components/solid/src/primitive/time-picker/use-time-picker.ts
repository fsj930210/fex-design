import { createTimePickerController } from '@fex-design/core/time-picker/create-time-picker-controller'
import type { TimePickerControllerOptions } from '@fex-design/core/time-picker/types'
import { createEffect, type Accessor } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'

export function useTimePicker(source: TimePickerControllerOptions | Accessor<TimePickerControllerOptions> = {}) {
  const options = () => typeof source === 'function' ? source() : source
  const controller = createTimePickerController(options())
  const snapshot = createCoreStoreSignal(controller)
  // Synchronize reactive options with core; the store helper owns cleanup.
  createEffect(() => controller.setOptions(options()))
  return { controller, snapshot }
}
