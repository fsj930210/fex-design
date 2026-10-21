import { untrack } from 'svelte'
import { fromStore } from 'svelte/store'
import { createPaginationController } from '@fex-design/core/pagination/create-pagination-controller'
import type { PaginationOptions } from '@fex-design/core/pagination/types'
import { readableCoreStore } from '@fex-design/svelte/stores/core-store'

export function usePagination(source: PaginationOptions | (() => PaginationOptions) = {}) {
  const options = () => (typeof source === 'function' ? source() : source)
  const controller = createPaginationController(untrack(options))
  const store = fromStore(readableCoreStore(controller))
  // Reactive props synchronize an external controller; the readable store owns cleanup.
  $effect(() => controller.setOptions(options()))
  return { controller, snapshot: () => store.current }
}
