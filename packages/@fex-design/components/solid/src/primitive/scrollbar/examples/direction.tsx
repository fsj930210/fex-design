import { For } from 'solid-js'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '@fex-design/solid/primitive/scrollbar'

export function ScrollbarDirectionExample() {
  return (
    <div class="flex w-full flex-wrap gap-6">
      <section class="grid gap-3">
        <h4 class="text-sm font-medium">LTR：纵向滚动条在右侧</h4>
        <ScrollbarRoot
          class="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'auto', y: 'auto' }}
          dir={'ltr'}
        >
          <ScrollbarViewport>
            <div class="grid w-[40rem] gap-3 p-4">
              <For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For>
            </div>
          </ScrollbarViewport>
          <ScrollbarBar axis={'x'}>
            <ScrollbarTrack axis={'x'}>
              <ScrollbarThumb axis={'x'}></ScrollbarThumb>
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarBar axis={'y'}>
            <ScrollbarTrack axis={'y'}>
              <ScrollbarThumb axis={'y'}></ScrollbarThumb>
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarCorner></ScrollbarCorner>
        </ScrollbarRoot>
      </section>
      <section class="grid gap-3">
        <h4 class="text-sm font-medium">RTL：纵向滚动条在左侧</h4>
        <ScrollbarRoot
          class="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'auto', y: 'auto' }}
          dir={'rtl'}
        >
          <ScrollbarViewport>
            <div class="grid w-[40rem] gap-3 p-4">
              <For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For>
            </div>
          </ScrollbarViewport>
          <ScrollbarBar axis={'x'}>
            <ScrollbarTrack axis={'x'}>
              <ScrollbarThumb axis={'x'}></ScrollbarThumb>
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarBar axis={'y'}>
            <ScrollbarTrack axis={'y'}>
              <ScrollbarThumb axis={'y'}></ScrollbarThumb>
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarCorner></ScrollbarCorner>
        </ScrollbarRoot>
      </section>
    </div>
  )
}
