import { Pagination } from '@fex-design/solid/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

export default function PaginationDisabledExample() {
  return (
    <div class="grid w-full gap-space-lg">
      <Pagination
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        disabled
        showTotal
        showSizeChanger
        showQuickJumper
      />
    </div>
  )
}
