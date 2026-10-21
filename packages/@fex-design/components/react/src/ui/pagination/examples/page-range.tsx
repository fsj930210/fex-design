import { Pagination } from '@fex-design/react/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

export default function PaginationPageRangeExample() {
  return (
    <div className="grid w-full gap-space-lg">
      <Pagination
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        siblingCount={0}
        boundaryCount={0}
        showTotal
        showSizeChanger
        showQuickJumper
      />
      <Pagination
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        siblingCount={2}
        boundaryCount={2}
        showTotal
        showSizeChanger
        showQuickJumper
      />
    </div>
  )
}
