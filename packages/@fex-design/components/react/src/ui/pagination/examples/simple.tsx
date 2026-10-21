import { Pagination } from '@fex-design/react/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

export default function PaginationSimpleExample() {
  return (
    <div className="grid w-full gap-space-lg">
      <Pagination
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        showTotal
        showSizeChanger
        showQuickJumper
        simple
      />
    </div>
  )
}
