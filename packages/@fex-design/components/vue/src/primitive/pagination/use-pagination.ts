import { computed, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'
import { createPaginationController } from '@fex-design/core/pagination/create-pagination-controller'
import type { PaginationOptions } from '@fex-design/core/pagination/types'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'

export function usePagination(source: MaybeRefOrGetter<PaginationOptions> = {}) {
  const controller = createPaginationController(toValue(source))
  const store = useCoreStore(controller)
  // Reactive props synchronize an external core controller; useCoreStore owns cleanup.
  watchEffect(() => controller.setOptions(toValue(source)))
  return { controller, snapshot: computed(() => store.value) }
}
