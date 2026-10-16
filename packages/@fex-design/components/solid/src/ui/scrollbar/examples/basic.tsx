import { For } from 'solid-js'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { Scrollbar } from '@fex-design/solid/ui/scrollbar'

export function ScrollbarBasicExample() {
  return (
    <Scrollbar class="h-48 w-72 rounded-md border" autoHide="never" overflow={{ x: 'hidden' }} viewportProps={{ overflow: { y: 'auto' } }}>
      <div class="grid gap-3 p-4">
        <For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For>
      </div>
    </Scrollbar>
  )
}
