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

export default function PaginationPageRangeExample() {
  return (
    <div class="grid w-full gap-space-lg">
      <PaginationRoot
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        siblingCount={0}
        boundaryCount={0}
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
      <PaginationRoot
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        siblingCount={2}
        boundaryCount={2}
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
