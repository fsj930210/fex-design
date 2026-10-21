import type { SnapshotStore } from '../store/create-store'

export type PaginationDirection = 'prev' | 'next'
export type PaginationSize = 'sm' | 'md' | 'lg'
export type PaginationPart =
  | 'root'
  | 'total'
  | 'content'
  | 'pageButton'
  | 'navigationButton'
  | 'ellipsis'
  | 'simple'
  | 'pageSizeSelect'
  | 'jumper'
  | 'quickJumper'
export type PaginationClassNames = Partial<Record<PaginationPart, string>>
export type PaginationStyles<TStyle> = Partial<Record<PaginationPart, TStyle>>
export type PaginationChangeReason = 'page' | 'page-size' | 'prev' | 'next' | 'jump'
export type PaginationItem =
  | { type: 'page'; key: string; page: number }
  | { type: 'ellipsis'; key: 'ellipsis-start' | 'ellipsis-end' }

export interface PaginationValue {
  page: number
  pageSize: number
}

export interface PaginationChangeDetails {
  reason: PaginationChangeReason
  previousValue: PaginationValue
}

export interface PaginationLabels {
  navigation: string
  previous: string
  next: string
  page: (page: number) => string
  pageSize: string
  pageSizeOption: (pageSize: number) => string
  quickJumper: string
  total: (total: number) => string
  jumpPrefix: string
  jumpSuffix: string
}

export interface PaginationOptions {
  total?: number | undefined
  page?: number | undefined
  defaultPage?: number | undefined
  pageSize?: number | undefined
  defaultPageSize?: number | undefined
  siblingCount?: number | undefined
  boundaryCount?: number | undefined
  disabled?: boolean | undefined
  labels?: Partial<PaginationLabels> | undefined
  onChange?: ((value: PaginationValue, details: PaginationChangeDetails) => void) | undefined
}

export interface PaginationSnapshot extends PaginationValue {
  total: number
  pageCount: number
  pages: readonly PaginationItem[]
  range: readonly [number, number]
  canPrevious: boolean
  canNext: boolean
  disabled: boolean
  labels: PaginationLabels
}

export interface PaginationController extends SnapshotStore<PaginationSnapshot> {
  setOptions: (options: PaginationOptions) => void
  setPage: (page: number, reason?: PaginationChangeReason) => void
  setPageSize: (pageSize: number) => void
  previousPage: () => void
  nextPage: () => void
}
