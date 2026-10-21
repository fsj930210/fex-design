import type { PaginationItem } from './types'

/** Invalid numeric configuration falls back; all public page values are safe integers. */
export function paginationInteger(
  value: number | undefined,
  fallback: number,
  min: number,
): number {
  return value === undefined || !Number.isFinite(value)
    ? fallback
    : Math.min(Number.MAX_SAFE_INTEGER, Math.max(min, Math.floor(value)))
}

/** Work scales with visible pages, rather than the total number of records/pages. */
export function getPaginationItems(
  page: number,
  pageCount: number,
  siblingCount: number,
  boundaryCount: number,
): PaginationItem[] {
  if (pageCount === 0) return []
  const visible = new Set<number>()
  const add = (start: number, end: number) => {
    for (let value = Math.max(1, start); value <= Math.min(pageCount, end); value++)
      visible.add(value)
  }
  add(1, boundaryCount)
  add(pageCount - boundaryCount + 1, pageCount)
  add(page - siblingCount, page + siblingCount)
  const items: PaginationItem[] = []
  let previous = 0
  for (const value of [...visible].sort((left, right) => left - right)) {
    if (previous === 0 && value > 1) {
      if (value === 2) items.push({ type: 'page', key: 'page-1', page: 1 })
      else items.push({ type: 'ellipsis', key: 'ellipsis-start' })
    }
    // A single missing page is more useful than an ellipsis of the same width.
    if (previous > 0 && value - previous === 2) {
      items.push({ type: 'page', key: `page-${previous + 1}`, page: previous + 1 })
    } else if (previous > 0 && value - previous > 2) {
      items.push({ type: 'ellipsis', key: value <= page ? 'ellipsis-start' : 'ellipsis-end' })
    }
    items.push({ type: 'page', key: `page-${value}`, page: value })
    previous = value
  }
  if (previous < pageCount) {
    if (previous === pageCount - 1)
      items.push({ type: 'page', key: `page-${pageCount}`, page: pageCount })
    else items.push({ type: 'ellipsis', key: 'ellipsis-end' })
  }
  return items
}

export function getPaginationPageSizes(
  pageSize: number,
  options: readonly number[] = [10, 20, 50, 100],
): number[] {
  return [
    ...new Set([...options.filter((value) => Number.isSafeInteger(value) && value > 0), pageSize]),
  ].sort((a, b) => a - b)
}
