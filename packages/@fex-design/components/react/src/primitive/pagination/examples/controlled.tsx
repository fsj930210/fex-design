import { useState } from 'react'
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
  type PaginationValue,
  type PaginationChangeDetails,
} from '@fex-design/react/primitive/pagination'
import {
  paginationDemoLabels,
  paginationDemoInitialChange,
  formatPaginationDemoChange,
} from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
import { Button } from '@fex-design/react/ui/button'

export default function PaginationControlledExample() {
  const [total, setTotal] = useState(200)
  const [value, setValue] = useState({ page: 3, pageSize: 10 })
  const [lastChange, setLastChange] = useState(paginationDemoInitialChange)
  function change(next: PaginationValue, details: PaginationChangeDetails) {
    setValue(next)
    setLastChange(formatPaginationDemoChange(next, details))
  }
  function reset() {
    setValue({ page: 3, pageSize: 10 })
    setTotal(200)
    setLastChange('已从外部重置')
  }
  return (
    <div className="grid w-full gap-space-lg">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setValue({ ...value, page: 5 })}>设为第 5 页</Button>
        <Button onClick={() => setValue({ page: 1, pageSize: 20 })}>每页 20 条</Button>
        <Button onClick={() => setTotal(35)}>总数改为 35 条</Button>
        <Button onClick={reset}>重置</Button>
      </div>
      <p className="text-sm text-muted-foreground">
        外部值：第 {value.page} 页，每页 {value.pageSize} 条，总数 {total} 条
      </p>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {lastChange}
      </p>
      <PaginationRoot
        total={total}
        labels={paginationDemoLabels}
        page={value.page}
        pageSize={value.pageSize}
        onChange={change}
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
