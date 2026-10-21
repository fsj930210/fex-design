import { Pagination } from '@fex-design/react/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

export default function PaginationLayoutExample() {
  return (
    <div className="grid w-full gap-space-lg">
      <Pagination
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        showTotal
        showSizeChanger
        showQuickJumper
        className="w-full"
      />
      <Pagination
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        showTotal
        showSizeChanger
        showQuickJumper
        className="w-full [&>[data-slot=pagination-total]]:me-auto"
      />
    </div>
  )
}
