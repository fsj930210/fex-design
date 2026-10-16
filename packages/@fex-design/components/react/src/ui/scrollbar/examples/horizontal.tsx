import { Scrollbar } from '@fex-design/react/ui/scrollbar'

export function ScrollbarHorizontalExample() {
  return <div className="flex w-full flex-wrap gap-6">
  <section className="grid gap-3"><h4 className="text-sm font-medium">只允许横向滚动</h4>
    <Scrollbar className="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"auto","y":"hidden"}}><div className="flex h-28 w-[48rem] items-center gap-4 p-4"><div className="grid h-20 w-40 shrink-0 place-items-center rounded bg-muted-background">面板 1</div>
        <div className="grid h-20 w-40 shrink-0 place-items-center rounded bg-muted-background">面板 2</div>
        <div className="grid h-20 w-40 shrink-0 place-items-center rounded bg-muted-background">面板 3</div>
        <div className="grid h-20 w-40 shrink-0 place-items-center rounded bg-muted-background">面板 4</div></div></Scrollbar>
  </section>
  </div>
}
