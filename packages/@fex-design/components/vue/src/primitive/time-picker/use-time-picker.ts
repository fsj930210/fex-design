import { createTimePickerController } from '@fex-design/core/time-picker/create-time-picker-controller'
import type { TimePickerControllerOptions } from '@fex-design/core/time-picker/types'
import { computed, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'

export function useTimePicker(source: MaybeRefOrGetter<TimePickerControllerOptions> = {}) {
  const controller = createTimePickerController(toValue(source))
  const store = useCoreStore(controller)
  // Reactive options cross the external core boundary; useCoreStore owns cleanup.
  watchEffect(() => controller.setOptions(toValue(source)))
  return { controller, snapshot: computed(() => store.value) }
}
