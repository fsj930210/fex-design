import { createSignal } from 'solid-js'
import { Pagination } from '@fex-design/solid/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import { Button } from '@fex-design/solid/ui/button'

export default function PaginationHideOnSinglePageExample() {
  const [total, setTotal] = createSignal(5)
  return (
    <div class="grid w-full gap-space-lg">
      <div class="flex flex-wrap items-center gap-2">
        <Button onClick={() => setTotal(total() === 5 ? 200 : 5)}>切换总数 5 / 200</Button>
        <span>总条数：{total()}</span>
      </div>
      <Pagination
        total={total()}
        labels={paginationDemoLabels}
        defaultPage={8}
        showTotal
        showSizeChanger
        showQuickJumper
        hideOnSinglePage
      />
    </div>
  )
}
