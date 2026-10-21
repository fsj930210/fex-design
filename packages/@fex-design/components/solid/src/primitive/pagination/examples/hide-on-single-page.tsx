import { createSignal, For, Show } from 'solid-js'
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
} from '@fex-design/solid/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationJumperGroupClassName,
  paginationHideOnSinglePageClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { Button } from '@fex-design/solid/ui/button'

export default function PaginationHideOnSinglePageExample() {
  const [total, setTotal] = createSignal(5)
  return (
    <div class="grid w-full gap-space-lg">
      <div class="flex flex-wrap items-center gap-2">
        <Button onClick={() => setTotal(total() === 5 ? 200 : 5)}>切换总数 5 / 200</Button>
        <span>总条数：{total()}</span>
      </div>
      <PaginationRoot
        total={total()}
        labels={paginationDemoLabels}
        defaultPage={8}
        class={cn(paginationHideOnSinglePageClassName)}
      >
        {(snapshot) => (
          <>
            <span data-slot="pagination-total" class={paginationTotalClassName}>
              {snapshot().labels.total(snapshot().total)}
            </span>
            <PaginationContent>
              <PaginationNavigationButton direction="prev" />
              <For each={snapshot().pages}>
                {(item) => (
                  <Show
                    when={item.type === 'page' ? item : undefined}
                    keyed
                    fallback={<PaginationEllipsis />}
                  >
                    {(item) => <PaginationPageButton page={item.page} />}
                  </Show>
                )}
              </For>
              <PaginationNavigationButton direction="next" />
            </PaginationContent>
            <PaginationPageSizeSelect />
            <div data-slot="pagination-jumper" class={paginationJumperGroupClassName}>
              <span>{snapshot().labels.jumpPrefix}</span>
              <PaginationQuickJumper />
              <span>{snapshot().labels.jumpSuffix}</span>
            </div>
          </>
        )}
      </PaginationRoot>
    </div>
  )
}
