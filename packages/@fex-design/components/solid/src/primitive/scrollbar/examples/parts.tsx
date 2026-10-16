import { For } from 'solid-js'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner } from '@fex-design/solid/primitive/scrollbar'

export function ScrollbarPartsExample() {
  return <div class="flex w-full flex-wrap gap-6">
  <section class="grid gap-3"><h4 class="text-sm font-medium">显式组合 Bar、Track、Thumb、Corner</h4>
    <p class="max-w-72 text-sm text-muted-foreground">浅色长槽是 Track，深色滑块是 Thumb，右下方交角是 Corner；Bar 是外层定位容器。</p>
    <ScrollbarRoot showTrack class="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"auto","y":"auto"}}><ScrollbarViewport><div class="grid w-[40rem] gap-3 p-4"><For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For></div></ScrollbarViewport>
      <ScrollbarBar axis={"x"}><ScrollbarTrack axis={"x"}><ScrollbarThumb axis={"x"}></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarBar axis={"y"}><ScrollbarTrack axis={"y"}><ScrollbarThumb axis={"y"}></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarCorner></ScrollbarCorner></ScrollbarRoot>
  </section>
  </div>
}
