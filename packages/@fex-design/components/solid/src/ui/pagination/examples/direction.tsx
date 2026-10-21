import { Pagination } from '@fex-design/solid/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

export default function PaginationDirectionExample() {
  return (
    <div class="grid w-full gap-space-lg">
      <Pagination
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        dir="ltr"
        showTotal
        showSizeChanger
        showQuickJumper
      />
      <Pagination
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        dir="rtl"
        showTotal
        showSizeChanger
        showQuickJumper
      />
    </div>
  )
}
