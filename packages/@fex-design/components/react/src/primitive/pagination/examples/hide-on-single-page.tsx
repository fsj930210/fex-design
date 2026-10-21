import { useState } from 'react'
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
  paginationHideOnSinglePageClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { Button } from '@fex-design/react/ui/button'

export default function PaginationHideOnSinglePageExample() {
  const [total, setTotal] = useState(5)
  return (
    <div className="grid w-full gap-space-lg">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => setTotal(total === 5 ? 200 : 5)}>切换总数 5 / 200</Button>
        <span>总条数：{total}</span>
      </div>
      <PaginationRoot
        total={total}
        labels={paginationDemoLabels}
        defaultPage={8}
        className={cn(paginationHideOnSinglePageClassName)}
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
