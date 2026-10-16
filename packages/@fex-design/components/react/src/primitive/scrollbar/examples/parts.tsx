import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner } from '@fex-design/react/primitive/scrollbar'

export function ScrollbarPartsExample() {
  return <div className="flex w-full flex-wrap gap-6">
  <section className="grid gap-3"><h4 className="text-sm font-medium">显式组合 Bar、Track、Thumb、Corner</h4>
    <p className="max-w-72 text-sm text-muted-foreground">浅色长槽是 Track，深色滑块是 Thumb，右下方交角是 Corner；Bar 是外层定位容器。</p>
    <ScrollbarRoot showTrack className="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"auto","y":"auto"}}><ScrollbarViewport><div className="grid w-[40rem] gap-3 p-4">{scrollbarDemoLines.map((line) => <p key={line}>{line}</p>)}</div></ScrollbarViewport>
      <ScrollbarBar axis={"x"}><ScrollbarTrack axis={"x"}><ScrollbarThumb axis={"x"}></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarBar axis={"y"}><ScrollbarTrack axis={"y"}><ScrollbarThumb axis={"y"}></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarCorner></ScrollbarCorner></ScrollbarRoot>
  </section>
  </div>
}
