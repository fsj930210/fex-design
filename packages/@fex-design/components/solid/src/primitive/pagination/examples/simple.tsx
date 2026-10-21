import {
  PaginationRoot,
  PaginationContent,
  PaginationNavigationButton,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
} from '@fex-design/solid/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationSimpleClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'

export default function PaginationSimpleExample() {
  return (
    <div class="grid w-full gap-space-lg">
      <PaginationRoot total={200} labels={paginationDemoLabels} defaultPage={8}>
        {(snapshot) => (
          <>
            <span data-slot="pagination-total" class={paginationTotalClassName}>
              {snapshot().labels.total(snapshot().total)}
            </span>
            <PaginationContent>
              <PaginationNavigationButton direction="prev" />
              <span data-slot="pagination-simple" class={paginationSimpleClassName}>
                {snapshot().pageCount === 0 ? 0 : snapshot().page} / {snapshot().pageCount}
              </span>
              <PaginationNavigationButton direction="next" />
            </PaginationContent>
            <PaginationPageSizeSelect />
            <div data-slot="pagination-jumper" class={paginationJumperGroupClassName}>
              <span>{snapshot().labels.jumpPrefix}</span>
              <PaginationQuickJumper />
              <span>{snapshot().labels.jumpSuffix}</span>
            </div>
          </>
        )}
      </PaginationRoot>
    </div>
  )
}
