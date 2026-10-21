import { Pagination } from '@fex-design/solid/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

export default function PaginationPageSizeOptionsExample() {
  return (
    <div class="grid w-full gap-space-lg">
      <Pagination
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        defaultPageSize={15}
        showTotal
        showSizeChanger
        showQuickJumper
        pageSizeOptions={[5, 15, 30]}
      />
    </div>
  )
}
