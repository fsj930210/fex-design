import { DestroyRef, effect, inject } from '@angular/core'
import { createPaginationController } from '@fex-design/core/pagination/create-pagination-controller'
import type { PaginationOptions } from '@fex-design/core/pagination/types'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'

/** Call in an injection context; object options can also be synchronized in ngOnChanges. */
export function usePagination(
  source: PaginationOptions | (() => PaginationOptions) = {},
  destroyRef = inject(DestroyRef),
) {
  const options = () => (typeof source === 'function' ? source() : source)
  const controller = createPaginationController(options())
  const snapshot = createCoreStoreSignal(controller, destroyRef)
  if (typeof source === 'function') {
    // Signals synchronize an external controller; actions remain event driven.
    const binding = effect(() => controller.setOptions(source()), { manualCleanup: true })
    destroyRef.onDestroy(() => binding.destroy())
  }
  return { controller, snapshot }
}
