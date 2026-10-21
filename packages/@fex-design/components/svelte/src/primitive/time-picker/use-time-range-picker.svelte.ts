import { createTimeRangePickerController } from '@fex-design/core/time-picker/create-time-range-picker-controller'
import type { TimeRangePickerOptions } from '@fex-design/core/time-picker/range-types'
import { readableCoreStore } from '@fex-design/svelte/stores/core-store'
import { fromStore } from 'svelte/store'
import { untrack } from 'svelte'

export function useTimeRangePicker(
  source: TimeRangePickerOptions | (() => TimeRangePickerOptions) = {},
) {
  const options = () => (typeof source === 'function' ? source() : source)
  const controller = createTimeRangePickerController(untrack(options))
  const store = fromStore(readableCoreStore(controller))
  // Props synchronize an external controller; the readable store owns cleanup.
  $effect(() => controller.setOptions(options()))
  return { controller, snapshot: () => store.current }
}
