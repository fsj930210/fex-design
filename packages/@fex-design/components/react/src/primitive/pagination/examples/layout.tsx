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
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'

export default function PaginationLayoutExample() {
  return (
    <div className="grid w-full gap-space-lg">
      <PaginationRoot
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        className={cn('w-full')}
      >
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
      <PaginationRoot
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        className={cn('w-full [&>[data-slot=pagination-total]]:me-auto')}
      >
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
    </div>
  )
}
