import { inject, type InjectionKey, type ComputedRef } from 'vue'
import type { PaginationSize } from '@fex-design/core/pagination/types'
import type { usePagination } from './use-pagination'

export const paginationContextKey: InjectionKey<
  ReturnType<typeof usePagination> & { size: ComputedRef<PaginationSize> }
> = Symbol('PaginationRoot')
export function usePaginationContext() {
  const context = inject(paginationContextKey)
  if (!context) throw new Error('Pagination parts must be used inside PaginationRoot.')
  return context
}

/** Forward Vue's merged listener forms once, before a part performs its action. */
export function callPaginationHandler(handler: unknown, event: Event): void {
  if (Array.isArray(handler)) {
    for (const listener of handler) callPaginationHandler(listener, event)
  } else if (typeof handler === 'function') handler(event)
}
