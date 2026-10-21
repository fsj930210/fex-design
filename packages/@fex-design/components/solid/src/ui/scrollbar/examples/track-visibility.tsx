import { For } from 'solid-js'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { Scrollbar } from '@fex-design/solid/ui/scrollbar'

export function ScrollbarTrackVisibilityExample() {
  return (
    <div class="flex w-full flex-wrap gap-6">
      <section class="grid gap-3">
        <h4 class="text-sm font-medium">默认：透明轨道，滑块仍可见</h4>
        <Scrollbar
          class="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'auto', y: 'auto' }}
        >
          <div class="grid w-[40rem] gap-3 p-4">
            <For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For>
          </div>
        </Scrollbar>
      </section>
      <section class="grid gap-3">
        <h4 class="text-sm font-medium">showTrack：显示轨道与交角背景</h4>
        <Scrollbar
          showTrack
          class="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'auto', y: 'auto' }}
        >
          <div class="grid w-[40rem] gap-3 p-4">
            <For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For>
          </div>
        </Scrollbar>
      </section>
      <section class="grid gap-3">
        <h4 class="text-sm font-medium">showTrack + showCorner=false：仅显示轨道</h4>
        <Scrollbar
          showTrack
          showCorner={false}
          class="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'auto', y: 'auto' }}
        >
          <div class="grid w-[40rem] gap-3 p-4">
            <For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For>
          </div>
        </Scrollbar>
      </section>
      <section class="grid gap-3">
        <h4 class="text-sm font-medium">showTrack=false + showCorner：仅显示交角</h4>
        <Scrollbar
          showCorner
          class="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'auto', y: 'auto' }}
        >
          <div class="grid w-[40rem] gap-3 p-4">
            <For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For>
          </div>
        </Scrollbar>
      </section>
    </div>
  )
}
