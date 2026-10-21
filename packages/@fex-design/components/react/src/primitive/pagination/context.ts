import { createContext, use } from 'react'
import type { PaginationSize } from '@fex-design/core/pagination/types'
import type { usePagination } from './use-pagination'

export const PaginationContext = createContext<
  (ReturnType<typeof usePagination> & { size: PaginationSize }) | null
>(null)
export function usePaginationContext() {
  const context = use(PaginationContext)
  if (!context) throw new Error('Pagination parts must be used inside PaginationRoot.')
  return context
}
