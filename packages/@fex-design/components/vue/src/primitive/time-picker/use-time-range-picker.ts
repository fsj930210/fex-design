import { createTimeRangePickerController } from '@fex-design/core/time-picker/create-time-range-picker-controller'
import type { TimeRangePickerOptions } from '@fex-design/core/time-picker/range-types'
import { computed, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'

export function useTimeRangePicker(source: MaybeRefOrGetter<TimeRangePickerOptions> = {}) {
  const controller = createTimeRangePickerController(toValue(source))
  const store = useCoreStore(controller)
  // Reactive options cross the external core boundary; useCoreStore owns cleanup.
  watchEffect(() => controller.setOptions(toValue(source)))
  return { controller, snapshot: computed(() => store.value) }
}
