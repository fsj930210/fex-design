import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { Scrollbar } from '@fex-design/react/ui/scrollbar'

export function ScrollbarOverflowExample() {
  return (
    <div className="flex w-full flex-wrap gap-6">
      <section className="grid gap-3">
        <h4 className="text-sm font-medium">Root 关闭横向；Viewport 只覆盖纵向</h4>
        <Scrollbar
          className="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'hidden', y: 'hidden' }}
          viewportProps={{ overflow: { y: 'auto' } }}
        >
          <div className="grid gap-3 p-4">
            {scrollbarDemoLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Scrollbar>
      </section>
      <section className="grid gap-3">
        <h4 className="text-sm font-medium">Root 关闭双轴；Viewport 重新开启横向</h4>
        <Scrollbar
          className="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'hidden', y: 'hidden' }}
          viewportProps={{ overflow: { x: 'auto' } }}
        >
          <div className="flex h-28 w-[48rem] items-center gap-4 p-4">
            <div className="grid h-20 w-40 shrink-0 place-items-center rounded bg-muted-background">
              面板 1
            </div>
            <div className="grid h-20 w-40 shrink-0 place-items-center rounded bg-muted-background">
              面板 2
            </div>
            <div className="grid h-20 w-40 shrink-0 place-items-center rounded bg-muted-background">
              面板 3
            </div>
            <div className="grid h-20 w-40 shrink-0 place-items-center rounded bg-muted-background">
              面板 4
            </div>
          </div>
        </Scrollbar>
      </section>
    </div>
  )
}
