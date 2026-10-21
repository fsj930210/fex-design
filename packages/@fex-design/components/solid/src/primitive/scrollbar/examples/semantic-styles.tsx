import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '@fex-design/solid/primitive/scrollbar'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { For } from 'solid-js'
export function ScrollbarSemanticStylesExample() {
  return (
    <div class="flex w-full flex-wrap gap-6">
      <section class="grid gap-3">
        <h4 class="text-sm font-medium">各轴部件独立设置 classNames/styles</h4>
        <ScrollbarRoot
          showTrack
          autoHide="never"
          overflow={{ x: 'auto', y: 'auto' }}
          class="h-48 w-72 rounded-md border"
        >
          <ScrollbarViewport
            class="bg-muted-background/30"
            style={{ 'background-color': 'var(--background)' }}
          >
            <div class="grid w-[40rem] gap-3 p-4">
              <For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For>
            </div>
          </ScrollbarViewport>
          <ScrollbarBar axis="x" class="z-20" style={{ 'inset-inline-start': '16px' }}>
            <ScrollbarTrack axis="x" class="bg-primary/15" style={{ 'border-radius': '4px' }}>
              <ScrollbarThumb axis="x" class="bg-primary" style={{ 'border-radius': '4px' }} />
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarBar axis="y" class="z-20" style={{ top: '16px' }}>
            <ScrollbarTrack axis="y" class="bg-primary/15" style={{ 'border-radius': '4px' }}>
              <ScrollbarThumb axis="y" class="bg-primary" style={{ 'border-radius': '4px' }} />
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarCorner class="bg-primary/15" style={{ 'border-radius': '2px' }} />
        </ScrollbarRoot>
      </section>
    </div>
  )
}
