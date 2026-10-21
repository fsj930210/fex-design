import { createStore } from '../store/create-store'
import { getPaginationItems, paginationInteger } from './pagination-range'
import type {
  PaginationChangeReason,
  PaginationController,
  PaginationLabels,
  PaginationOptions,
  PaginationSnapshot,
  PaginationValue,
} from './types'

const defaultLabels: PaginationLabels = {
  navigation: 'Pagination',
  previous: 'Previous page',
  next: 'Next page',
  page: (page) => `Go to page ${page}`,
  pageSize: 'Rows per page',
  pageSizeOption: (size) => `${size} / page`,
  quickJumper: 'Go to page',
  total: (total) => `Total ${total} items`,
  jumpPrefix: 'Go to',
  jumpSuffix: 'page',
}

export function createPaginationController(initial: PaginationOptions = {}): PaginationController {
  let options = initial
  // Defaults are read once. Removing a controlled prop retains the last committed value.
  let internalPage = paginationInteger(initial.page ?? initial.defaultPage, 1, 1)
  let internalPageSize = paginationInteger(initial.pageSize ?? initial.defaultPageSize, 10, 1)
  const store = createStore(resolve())

  function resolve(): PaginationSnapshot {
    const total = paginationInteger(options.total, 0, 0)
    const pageSize = paginationInteger(options.pageSize ?? internalPageSize, 10, 1)
    const pageCount = Math.ceil(total / pageSize)
    const page = Math.min(
      paginationInteger(options.page ?? internalPage, 1, 1),
      Math.max(1, pageCount),
    )
    const disabled = options.disabled ?? false
    internalPage = page
    internalPageSize = pageSize
    return {
      total,
      page,
      pageSize,
      pageCount,
      disabled,
      pages: getPaginationItems(
        page,
        pageCount,
        paginationInteger(options.siblingCount, 1, 0),
        paginationInteger(options.boundaryCount, 1, 0),
      ),
      range: total === 0 ? [0, 0] : [(page - 1) * pageSize + 1, Math.min(total, page * pageSize)],
      canPrevious: !disabled && page > 1,
      canNext: !disabled && page < pageCount,
      labels: { ...defaultLabels, ...options.labels },
    }
  }

  function publish() {
    const next = resolve()
    const previous = store.getSnapshot()
    const samePages =
      next.pages.length === previous.pages.length &&
      next.pages.every((item, index) => item.key === previous.pages[index]?.key)
    const sameLabels = (Object.keys(defaultLabels) as (keyof PaginationLabels)[]).every(
      (key) => next.labels[key] === previous.labels[key],
    )
    if (
      next.total === previous.total &&
      next.page === previous.page &&
      next.pageSize === previous.pageSize &&
      next.disabled === previous.disabled &&
      samePages &&
      sameLabels
    )
      return
    store.setSnapshot(next)
  }

  function change(value: PaginationValue, reason: PaginationChangeReason) {
    const previous = store.getSnapshot()
    if (previous.disabled || (value.page === previous.page && value.pageSize === previous.pageSize))
      return
    // Controlled fields report intent; uncontrolled fields commit in a single store update.
    if (options.page === undefined) internalPage = value.page
    if (options.pageSize === undefined) internalPageSize = value.pageSize
    publish()
    options.onChange?.(value, {
      reason,
      previousValue: { page: previous.page, pageSize: previous.pageSize },
    })
  }

  function setPage(candidate: number, reason: PaginationChangeReason = 'page') {
    if (!Number.isFinite(candidate)) return
    // A jump confirms a whole page; InputNumber owns rounding on blur/stepping.
    if (reason === 'jump' && !Number.isInteger(candidate)) return
    const snapshot = store.getSnapshot()
    const page = Math.min(paginationInteger(candidate, 1, 1), Math.max(1, snapshot.pageCount))
    change({ page, pageSize: snapshot.pageSize }, reason)
  }

  return {
    getSnapshot: store.getSnapshot,
    subscribe: store.subscribe,
    // Configuration synchronization never emits user changes or initiates requests.
    setOptions(next) {
      options = next
      publish()
    },
    setPage,
    setPageSize(candidate) {
      if (!Number.isFinite(candidate) || candidate < 1) return
      const pageSize = paginationInteger(candidate, 10, 1)
      if (pageSize === store.getSnapshot().pageSize) return
      change({ page: 1, pageSize }, 'page-size')
    },
    previousPage() {
      if (store.getSnapshot().canPrevious) setPage(store.getSnapshot().page - 1, 'prev')
    },
    nextPage() {
      if (store.getSnapshot().canNext) setPage(store.getSnapshot().page + 1, 'next')
    },
  }
}

const paginationInputNumberOwnedProps = [
  'children',
  'value',
  'defaultValue',
  'controlled',
  'onChange',
  'min',
  'max',
  'step',
  'precision',
  'parser',
  'formatter',
  'disabled',
  'readOnly',
  'readonly',
  'size',
] as const

/** Keep numeric constraints and the jump value under Pagination ownership for JS callers too. */
export function filterPaginationInputNumberProps<T extends object>(
  props: T | undefined,
): Omit<T, (typeof paginationInputNumberOwnedProps)[number]> {
  const owned = new Set<string>(paginationInputNumberOwnedProps.map((key) => key.toLowerCase()))
  return Object.fromEntries(
    Object.entries(props ?? {}).filter(
      ([key]) => !owned.has(key.replace(/[-_:]/g, '').toLowerCase()),
    ),
  ) as Omit<T, (typeof paginationInputNumberOwnedProps)[number]>
}
