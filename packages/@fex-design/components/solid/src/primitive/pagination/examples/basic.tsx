import { For, Show } from 'solid-js'
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
} from '@fex-design/solid/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

export default function PaginationBasicExample() {
  return (
    <div class="grid w-full gap-space-lg">
      <PaginationRoot total={200} labels={paginationDemoLabels} defaultPage={1}>
        {(snapshot) => (
          <>
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
          </>
        )}
      </PaginationRoot>
    </div>
  )
}
