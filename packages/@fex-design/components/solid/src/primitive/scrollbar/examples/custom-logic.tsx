import { For } from 'solid-js'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import {
  createScrollbar,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
} from '@fex-design/solid/primitive/scrollbar'

export function ScrollbarCustomLogicExample() {
  const binding = createScrollbar(() => ({ autoHide: 'never' }))
  return (
    <div
      ref={binding.rootRef}
      data-slot="scrollbar-root"
      class="relative isolate h-48 w-72 overflow-hidden rounded-md border"
    >
      <ScrollbarViewport overflow={{ x: 'hidden' }}>
        <div class="grid gap-3 p-4">
          <For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For>
        </div>
      </ScrollbarViewport>
      <ScrollbarBar axis="y">
        <ScrollbarTrack axis="y">
          <ScrollbarThumb axis="y" />
        </ScrollbarTrack>
      </ScrollbarBar>
    </div>
  )
}
