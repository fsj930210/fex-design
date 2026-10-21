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

export default function PaginationCustomExample() {
  return (
    <div className="grid w-full gap-space-lg">
      <PaginationRoot total={200} labels={paginationDemoLabels} defaultPage={8}>
        {(snapshot) => (
          <>
            <span data-slot="pagination-total" className={paginationTotalClassName}>
              {snapshot.range[0]}–{snapshot.range[1]} / {snapshot.total}
            </span>
            <PaginationContent>
              <PaginationNavigationButton direction="prev">上一页</PaginationNavigationButton>
              {snapshot.pages.map((item) =>
                item.type === 'page' ? (
                  <PaginationPageButton key={item.key} page={item.page}>
                    {snapshot.page === item.page ? '[' + item.page + ']' : item.page}
                  </PaginationPageButton>
                ) : (
                  <PaginationEllipsis key={item.key}>…</PaginationEllipsis>
                ),
              )}
              <PaginationNavigationButton direction="next">下一页</PaginationNavigationButton>
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
