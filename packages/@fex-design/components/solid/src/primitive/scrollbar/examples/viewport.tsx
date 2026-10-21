import { scrollbarViewportLines } from '@fex-design/docs-shared/scrollbar-demo'
import { For, createSignal } from 'solid-js'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
} from '@fex-design/solid/primitive/scrollbar'
import { Button } from '@fex-design/solid/ui/button'

export function ScrollbarViewportExample() {
  let viewport: HTMLDivElement | undefined
  const [lastKey, setLastKey] = createSignal('尚未按键')
  return (
    <div class="grid w-full max-w-md gap-4">
      <div class="flex flex-wrap gap-2">
        <Button onClick={() => viewport?.scrollTo({ top: 0 })}>回到顶部</Button>
        <Button onClick={() => viewport?.scrollBy({ top: 120 })}>向下 120px</Button>
        <Button onClick={() => viewport?.scrollTo({ top: viewport?.scrollHeight ?? 0 })}>
          滚动到底部
        </Button>
      </div>
      <ScrollbarRoot
        class="h-48 w-72 rounded-md border"
        autoHide="never"
        overflow={{ x: 'hidden' }}
      >
        <ScrollbarViewport
          role="region"
          aria-label="可通过键盘滚动的内容"
          tabIndex={0}
          class="outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          onKeyDown={(event) => setLastKey(event.key)}
          ref={(element) => {
            viewport = element
          }}
        >
          <div class="grid gap-3 p-4">
            <For each={scrollbarViewportLines}>{(line) => <p>{line}</p>}</For>
          </div>
        </ScrollbarViewport>
        <ScrollbarBar axis="y">
          <ScrollbarTrack axis="y">
            <ScrollbarThumb axis="y" />
          </ScrollbarTrack>
        </ScrollbarBar>
      </ScrollbarRoot>
      <output class="text-sm text-muted-foreground">最近按键：{lastKey()}</output>
    </div>
  )
}
