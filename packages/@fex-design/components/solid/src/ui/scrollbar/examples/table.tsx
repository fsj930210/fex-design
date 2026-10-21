import { For, onMount, onCleanup } from 'solid-js'
import { Scrollbar } from '@fex-design/solid/ui/scrollbar'
import {
  scrollbarColumns,
  scrollbarRows,
  observeScrollbarHeader,
} from '@fex-design/docs-shared/scrollbar-demo'

export function ScrollbarTableExample() {
  let root: HTMLDivElement
  let header: HTMLTableSectionElement
  onMount(() => {
    onCleanup(observeScrollbarHeader(root, header))
  })
  return (
    <Scrollbar
      ref={root!}
      class="h-64 w-full max-w-xl rounded-md border"
      autoHide="never"
      viewportProps={{ role: 'region', 'aria-label': 'Orders', tabIndex: 0 }}
      styles={{ barY: { top: 'var(--table-header-height)' } }}
    >
      <table class="w-full min-w-[900px] table-fixed border-separate border-spacing-0 text-left text-sm">
        <thead ref={header!} class="sticky top-0 z-10 bg-background">
          <tr>
            <For each={scrollbarColumns}>
              {(column) => (
                <th scope="col" class="border-b px-4 py-3">
                  {column}
                </th>
              )}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={scrollbarRows}>
            {(row) => (
              <tr>
                <td class="border-b px-4 py-3">{row.id}</td>
                <td class="border-b px-4 py-3">{row.customer}</td>
                <td class="border-b px-4 py-3">{row.address}</td>
                <td class="border-b px-4 py-3">{row.status}</td>
                <td class="border-b px-4 py-3">{row.amount}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </Scrollbar>
  )
}
