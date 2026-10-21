import { createEffect, type Accessor } from 'solid-js'
import { createPaginationController } from '@fex-design/core/pagination/create-pagination-controller'
import type { PaginationOptions } from '@fex-design/core/pagination/types'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'

export function usePagination(source: PaginationOptions | Accessor<PaginationOptions> = {}) {
  const options = () => (typeof source === 'function' ? source() : source)
  const controller = createPaginationController(options())
  const snapshot = createCoreStoreSignal(controller)
  // Reactive props synchronize the external controller; the store helper owns cleanup.
  createEffect(() => controller.setOptions(options()))
  return { controller, snapshot }
}
