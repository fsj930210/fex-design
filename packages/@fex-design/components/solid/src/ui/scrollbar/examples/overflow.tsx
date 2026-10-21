import { For } from 'solid-js'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { Scrollbar } from '@fex-design/solid/ui/scrollbar'

export function ScrollbarOverflowExample() {
  return (
    <div class="flex w-full flex-wrap gap-6">
      <section class="grid gap-3">
        <h4 class="text-sm font-medium">Root 关闭横向；Viewport 只覆盖纵向</h4>
        <Scrollbar
          class="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'hidden', y: 'hidden' }}
          viewportProps={{ overflow: { y: 'auto' } }}
        >
          <div class="grid gap-3 p-4">
            <For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For>
          </div>
        </Scrollbar>
      </section>
      <section class="grid gap-3">
        <h4 class="text-sm font-medium">Root 关闭双轴；Viewport 重新开启横向</h4>
        <Scrollbar
          class="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'hidden', y: 'hidden' }}
          viewportProps={{ overflow: { x: 'auto' } }}
        >
          <div class="flex h-28 w-[48rem] items-center gap-4 p-4">
            <div class="grid h-20 w-40 shrink-0 place-items-center rounded bg-muted-background">
              面板 1
            </div>
            <div class="grid h-20 w-40 shrink-0 place-items-center rounded bg-muted-background">
              面板 2
            </div>
            <div class="grid h-20 w-40 shrink-0 place-items-center rounded bg-muted-background">
              面板 3
            </div>
            <div class="grid h-20 w-40 shrink-0 place-items-center rounded bg-muted-background">
              面板 4
            </div>
          </div>
        </Scrollbar>
      </section>
    </div>
  )
}
