import { For } from 'solid-js'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarCorner, ScrollbarTrack, ScrollbarThumb } from '@fex-design/solid/primitive/scrollbar'

export function ScrollbarBasicExample() {
  return (
    <ScrollbarRoot class="h-48 w-72 rounded-md border" autoHide="never" overflow={{ x: 'hidden' }}>
      <ScrollbarViewport overflow={{ y: 'auto' }}>
        <div class="grid gap-3 p-4">
        <For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For>
      </div>
      </ScrollbarViewport>
      <ScrollbarBar axis="y">
        <ScrollbarTrack axis="y">
          <ScrollbarThumb axis="y" />
        </ScrollbarTrack>
      </ScrollbarBar>
      <ScrollbarCorner />
    </ScrollbarRoot>
  )
}
