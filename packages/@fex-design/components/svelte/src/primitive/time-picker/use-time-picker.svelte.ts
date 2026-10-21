import { createTimePickerController } from '@fex-design/core/time-picker/create-time-picker-controller'
import type { TimePickerControllerOptions } from '@fex-design/core/time-picker/types'
import { readableCoreStore } from '@fex-design/svelte/stores/core-store'
import { fromStore } from 'svelte/store'
import { untrack } from 'svelte'

export function useTimePicker(
  source: TimePickerControllerOptions | (() => TimePickerControllerOptions) = {},
) {
  const options = () => (typeof source === 'function' ? source() : source)
  const controller = createTimePickerController(untrack(options))
  const store = fromStore(readableCoreStore(controller))
  // Props synchronize an external controller; the readable store owns cleanup.
  $effect(() => controller.setOptions(options()))
  return { controller, snapshot: () => store.current }
}
