import { Pagination } from '@fex-design/solid/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

export default function PaginationCustomExample() {
  return (
    <div class="grid w-full gap-space-lg">
      <Pagination
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        showSizeChanger
        showQuickJumper
        showTotal={(snapshot) => `${snapshot.range[0]}–${snapshot.range[1]} / ${snapshot.total}`}
        pageRender={(page, current) => (current ? '[' + page + ']' : page)}
        previous="上一页"
        next="下一页"
        ellipsis="…"
      />
    </div>
  )
}
