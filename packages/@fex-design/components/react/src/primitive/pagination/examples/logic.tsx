import { useState } from 'react'
import { usePagination } from '@fex-design/react/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

const pageSizeOptions = [10, 20, 50, 100]

export default function PaginationUsePaginationExample() {
  const { controller, snapshot } = usePagination({
    total: 200,
    defaultPage: 3,
    labels: paginationDemoLabels,
  })
  const [jump, setJump] = useState('')
  const submitJump = () => {
    const page = Number(jump)
    if (Number.isInteger(page) && page > 0) controller.setPage(page, 'jump')
    setJump('')
  }

  return (
    <nav
      aria-label={snapshot.labels.navigation}
      className="grid w-full gap-3 rounded-lg border p-3"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-auto">{snapshot.labels.total(snapshot.total)}</span>
        <button
          type="button"
          disabled={!snapshot.canPrevious}
          onClick={() => controller.previousPage()}
        >
          {snapshot.labels.previous}
        </button>
        <ol className="flex flex-wrap items-center gap-1" aria-label={snapshot.labels.navigation}>
          {snapshot.pages.map((item) =>
            item.type === 'page' ? (
              <li key={item.key}>
                <button
                  type="button"
                  aria-current={item.page === snapshot.page ? 'page' : undefined}
                  onClick={() => controller.setPage(item.page)}
                >
                  {item.page}
                </button>
              </li>
            ) : (
              <li key={item.key} aria-hidden="true">
                …
              </li>
            ),
          )}
        </ol>
        <button type="button" disabled={!snapshot.canNext} onClick={() => controller.nextPage()}>
          {snapshot.labels.next}
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2">
          {snapshot.labels.pageSize}
          <select
            value={snapshot.pageSize}
            onChange={(event) => controller.setPageSize(Number(event.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {snapshot.labels.pageSizeOption(size)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          {snapshot.labels.jumpPrefix}
          <input
            type="number"
            min="1"
            max={snapshot.pageCount}
            value={jump}
            onChange={(event) => setJump(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submitJump()
            }}
          />
          {snapshot.labels.jumpSuffix}
        </label>
        <output aria-live="polite">
          {snapshot.page} / {snapshot.pageCount}
        </output>
      </div>
    </nav>
  )
}
