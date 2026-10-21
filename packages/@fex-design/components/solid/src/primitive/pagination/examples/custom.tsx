import { For, Show } from 'solid-js'
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
} from '@fex-design/components-styles/pagination'

export default function PaginationCustomExample() {
  return (
    <div class="grid w-full gap-space-lg">
      <PaginationRoot total={200} labels={paginationDemoLabels} defaultPage={8}>
        {(snapshot) => (
          <>
            <span data-slot="pagination-total" class={paginationTotalClassName}>
              {snapshot().range[0]}–{snapshot().range[1]} / {snapshot().total}
            </span>
            <PaginationContent>
              <PaginationNavigationButton direction="prev">上一页</PaginationNavigationButton>
              <For each={snapshot().pages}>
                {(item) => (
                  <Show
                    when={item.type === 'page' ? item : undefined}
                    keyed
                    fallback={<PaginationEllipsis>…</PaginationEllipsis>}
                  >
                    {(item) => (
                      <PaginationPageButton page={item.page}>
                        {snapshot().page === item.page ? '[' + item.page + ']' : item.page}
                      </PaginationPageButton>
                    )}
                  </Show>
                )}
              </For>
              <PaginationNavigationButton direction="next">下一页</PaginationNavigationButton>
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
