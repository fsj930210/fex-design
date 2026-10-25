import { createSignal } from 'solid-js'
import { usePagination } from '@fex-design/solid/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

const pageSizeOptions = [10, 20, 50, 100]

export default function PaginationUsePaginationExample() {
  const { controller, snapshot } = usePagination({
    total: 200,
    defaultPage: 3,
    labels: paginationDemoLabels,
  })
  const [jump, setJump] = createSignal('')
  const submitJump = () => {
    const page = Number(jump())
    if (Number.isInteger(page) && page > 0) controller.setPage(page, 'jump')
    setJump('')
  }
  return (
    <nav aria-label={snapshot().labels.navigation} class="grid w-full gap-3 rounded-lg border p-3">
      <div class="flex flex-wrap items-center gap-2">
        <span class="mr-auto">{snapshot().labels.total(snapshot().total)}</span>
        <button
          type="button"
          disabled={!snapshot().canPrevious}
          onClick={() => controller.previousPage()}
        >
          {snapshot().labels.previous}
        </button>
        <ol class="flex flex-wrap items-center gap-1" aria-label={snapshot().labels.navigation}>
          {snapshot().pages.map((item) =>
            item.type === 'page' ? (
              <li>
                <button
                  type="button"
                  aria-current={item.page === snapshot().page ? 'page' : undefined}
                  onClick={() => controller.setPage(item.page)}
                >
                  {item.page}
                </button>
              </li>
            ) : (
              <li aria-hidden="true">…</li>
            ),
          )}
        </ol>
        <button type="button" disabled={!snapshot().canNext} onClick={() => controller.nextPage()}>
          {snapshot().labels.next}
        </button>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <label class="flex items-center gap-2">
          {snapshot().labels.pageSize}
          <select
            value={snapshot().pageSize}
            onChange={(event) => controller.setPageSize(Number(event.currentTarget.value))}
          >
            {pageSizeOptions.map((size) => (
              <option value={size}>{snapshot().labels.pageSizeOption(size)}</option>
            ))}
          </select>
        </label>
        <label class="flex items-center gap-2">
          {snapshot().labels.jumpPrefix}
          <input
            type="number"
            min="1"
            max={snapshot().pageCount}
            value={jump()}
            onInput={(event) => setJump(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submitJump()
            }}
          />
          {snapshot().labels.jumpSuffix}
        </label>
        <output aria-live="polite">
          {snapshot().page} / {snapshot().pageCount}
        </output>
      </div>
    </nav>
  )
}
