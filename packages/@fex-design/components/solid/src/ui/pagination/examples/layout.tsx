import { Pagination } from '@fex-design/solid/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

export default function PaginationLayoutExample() {
  return (
    <div class="grid w-full gap-space-lg">
      <Pagination
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        showTotal
        showSizeChanger
        showQuickJumper
        class="w-full"
      />
      <Pagination
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        showTotal
        showSizeChanger
        showQuickJumper
        class="w-full [&>[data-slot=pagination-total]]:me-auto"
      />
    </div>
  )
}
