import { For } from 'solid-js'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { Scrollbar } from '@fex-design/solid/ui/scrollbar'

export function ScrollbarVisibilityExample() {
  return <div class="flex w-full flex-wrap gap-6">
  <section class="grid gap-3"><h4 class="text-sm font-medium">auto：内容溢出时显示</h4>
    <Scrollbar class="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"hidden","y":"auto"}} visibility={"auto"}><div class="grid gap-3 p-4"><For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For></div></Scrollbar>
  </section>
  <section class="grid gap-3"><h4 class="text-sm font-medium">always：内容不足时也显示</h4>
    <Scrollbar class="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"hidden","y":"auto"}} visibility={"always"}><p class="p-4">内容不足一屏</p></Scrollbar>
  </section>
  <section class="grid gap-3"><h4 class="text-sm font-medium">hidden：隐藏滚动条，保留原生滚动</h4>
    <Scrollbar class="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"hidden","y":"auto"}} visibility={"hidden"}><div class="grid gap-3 p-4"><For each={scrollbarDemoLines}>{(line) => <p>{line}</p>}</For></div></Scrollbar>
  </section>
  </div>
}
