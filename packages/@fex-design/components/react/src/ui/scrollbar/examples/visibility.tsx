import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { Scrollbar } from '@fex-design/react/ui/scrollbar'

export function ScrollbarVisibilityExample() {
  return <div className="flex w-full flex-wrap gap-6">
  <section className="grid gap-3"><h4 className="text-sm font-medium">auto：内容溢出时显示</h4>
    <Scrollbar className="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"hidden","y":"auto"}} visibility={"auto"}><div className="grid gap-3 p-4">{scrollbarDemoLines.map((line) => <p key={line}>{line}</p>)}</div></Scrollbar>
  </section>
  <section className="grid gap-3"><h4 className="text-sm font-medium">always：内容不足时也显示</h4>
    <Scrollbar className="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"hidden","y":"auto"}} visibility={"always"}><p className="p-4">内容不足一屏</p></Scrollbar>
  </section>
  <section className="grid gap-3"><h4 className="text-sm font-medium">hidden：隐藏滚动条，保留原生滚动</h4>
    <Scrollbar className="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"hidden","y":"auto"}} visibility={"hidden"}><div className="grid gap-3 p-4">{scrollbarDemoLines.map((line) => <p key={line}>{line}</p>)}</div></Scrollbar>
  </section>
  </div>
}
