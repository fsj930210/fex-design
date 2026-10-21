import { getContext, setContext } from 'svelte'
import type { PaginationSize } from '@fex-design/core/pagination/types'
import type { usePagination } from './use-pagination.svelte'

const paginationContextKey = Symbol('PaginationRoot')
export function setPaginationContext(
  context: ReturnType<typeof usePagination> & { size: () => PaginationSize },
) {
  setContext(paginationContextKey, context)
}
export function getPaginationContext() {
  const context = getContext<
    (ReturnType<typeof usePagination> & { size: () => PaginationSize }) | undefined
  >(paginationContextKey)
  if (!context) throw new Error('Pagination parts must be used inside PaginationRoot.')
  return context
}
