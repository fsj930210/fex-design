import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
} from '@fex-design/react/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationSimpleClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'

export default function PaginationEmptyExample() {
  return (
    <div className="grid w-full gap-space-lg">
      <PaginationRoot total={0} labels={paginationDemoLabels} defaultPage={1}>
        {(snapshot) => (
          <>
            <span data-slot="pagination-total" className={paginationTotalClassName}>
              {snapshot.labels.total(snapshot.total)}
            </span>
            <PaginationContent>
              <PaginationNavigationButton direction="prev" />
              {snapshot.pages.map((item) =>
                item.type === 'page' ? (
                  <PaginationPageButton key={item.key} page={item.page} />
                ) : (
                  <PaginationEllipsis key={item.key} />
                ),
              )}
              <PaginationNavigationButton direction="next" />
            </PaginationContent>
            <PaginationPageSizeSelect />
            <div data-slot="pagination-jumper" className={paginationJumperGroupClassName}>
              <span>{snapshot.labels.jumpPrefix}</span>
              <PaginationQuickJumper />
              <span>{snapshot.labels.jumpSuffix}</span>
            </div>
          </>
        )}
      </PaginationRoot>
      <PaginationRoot total={0} labels={paginationDemoLabels} defaultPage={1}>
        {(snapshot) => (
          <>
            <span data-slot="pagination-total" className={paginationTotalClassName}>
              {snapshot.labels.total(snapshot.total)}
            </span>
            <PaginationContent>
              <PaginationNavigationButton direction="prev" />
              <span data-slot="pagination-simple" className={paginationSimpleClassName}>
                {snapshot.pageCount === 0 ? 0 : snapshot.page} / {snapshot.pageCount}
              </span>
              <PaginationNavigationButton direction="next" />
            </PaginationContent>
            <PaginationPageSizeSelect />
            <div data-slot="pagination-jumper" className={paginationJumperGroupClassName}>
              <span>{snapshot.labels.jumpPrefix}</span>
              <PaginationQuickJumper />
              <span>{snapshot.labels.jumpSuffix}</span>
            </div>
          </>
        )}
      </PaginationRoot>
    </div>
  )
}
