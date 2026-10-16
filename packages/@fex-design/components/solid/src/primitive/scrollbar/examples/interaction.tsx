import { For } from 'solid-js'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner } from '@fex-design/solid/primitive/scrollbar'

export function ScrollbarInteractionExample() {
  return <div class="flex w-full flex-wrap gap-6">
  <section class="grid gap-3"><h4 class="text-sm font-medium">点击轨道翻页；滑块最小高度 40px</h4>
    <p class="max-w-72 text-sm text-muted-foreground">点击右侧浅色轨道中、深色滑块上方或下方的空白区域，每次滚动一屏。</p>
    <ScrollbarRoot showTrack class="h-48 w-72 rounded-md border [&_[data-slot=scrollbar-track]]:cursor-pointer" autoHide={"never"} overflow={{"x":"hidden","y":"auto"}} clickScroll={"page"} minThumbSize={40}><ScrollbarViewport><div class="grid gap-3 p-4"><For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For></div></ScrollbarViewport>
      <ScrollbarBar axis={"y"}><ScrollbarTrack axis={"y"}><ScrollbarThumb axis={"y"}></ScrollbarThumb></ScrollbarTrack></ScrollbarBar></ScrollbarRoot>
  </section>
  <section class="grid gap-3"><h4 class="text-sm font-medium">点击轨道跳转</h4>
    <p class="max-w-72 text-sm text-muted-foreground">点击右侧浅色轨道中的任意空白位置，滑块会移动到点击处。</p>
    <ScrollbarRoot showTrack class="h-48 w-72 rounded-md border [&_[data-slot=scrollbar-track]]:cursor-pointer" autoHide={"never"} overflow={{"x":"hidden","y":"auto"}} clickScroll={"jump"}><ScrollbarViewport><div class="grid gap-3 p-4"><For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For></div></ScrollbarViewport>
      <ScrollbarBar axis={"y"}><ScrollbarTrack axis={"y"}><ScrollbarThumb axis={"y"}></ScrollbarThumb></ScrollbarTrack></ScrollbarBar></ScrollbarRoot>
  </section>
  <section class="grid gap-3"><h4 class="text-sm font-medium">禁止拖动；仍可点击轨道跳转</h4>
    <p class="max-w-72 text-sm text-muted-foreground">此处不能拖动深色滑块，但点击右侧浅色轨道的空白位置仍可跳转。</p>
    <ScrollbarRoot showTrack class="h-48 w-72 rounded-md border [&_[data-slot=scrollbar-track]]:cursor-pointer" autoHide={"never"} overflow={{"x":"hidden","y":"auto"}} dragScroll={false} clickScroll={"jump"}><ScrollbarViewport><div class="grid gap-3 p-4"><For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For></div></ScrollbarViewport>
      <ScrollbarBar axis={"y"}><ScrollbarTrack axis={"y"}><ScrollbarThumb axis={"y"}></ScrollbarThumb></ScrollbarTrack></ScrollbarBar></ScrollbarRoot>
  </section>
  </div>
}
