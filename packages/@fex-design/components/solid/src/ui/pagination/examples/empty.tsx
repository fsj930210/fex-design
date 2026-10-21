import { Pagination } from '@fex-design/solid/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

export default function PaginationEmptyExample() {
  return (
    <div class="grid w-full gap-space-lg">
      <Pagination
        total={0}
        labels={paginationDemoLabels}
        defaultPage={1}
        showTotal
        showSizeChanger
        showQuickJumper
      />
      <Pagination
        total={0}
        labels={paginationDemoLabels}
        defaultPage={1}
        showTotal
        showSizeChanger
        showQuickJumper
        simple
      />
    </div>
  )
}
