import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { Scrollbar } from '@fex-design/react/ui/scrollbar'

export function ScrollbarBothAxesExample() {
  return <div className="flex w-full flex-wrap gap-6">
  <section className="grid gap-3"><h4 className="text-sm font-medium">横向、纵向与交角</h4>
    <Scrollbar className="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"auto","y":"auto"}}><div className="grid w-[40rem] gap-3 p-4">{scrollbarDemoLines.map((line) => <p key={line}>{line}</p>)}</div></Scrollbar>
  </section>
  </div>
}
