import { Anchor } from '@fex-design/react/ui/anchor'
import { useRef } from 'react'

const items = [
  { key: 'first', title: '第一节', target: '#react-ui-click-lock-first' },
  { key: 'second', title: '点击第二节', target: '#react-ui-click-lock-second' },
  { key: 'third', title: '第三节', target: '#react-ui-click-lock-third' },
]

export function ClickLockExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div className="grid w-full max-w-2xl gap-3">
      <p className="text-sm text-muted-foreground">点击“第二节”：容器会滚到底，但高亮仍保留在点击项。</p>
      <div ref={container} className="grid h-72 grid-cols-[10rem_1fr] gap-6 overflow-auto rounded-lg border p-4">
        <Anchor items={items} container={() => container.current} className="sticky top-0 self-start" />
        <div className="grid gap-28 pb-16">
          {items.map((item) => <section key={item.key} id={`react-ui-click-lock-${item.key}`}><h3 className="font-semibold">{item.title}</h3></section>)}
        </div>
      </div>
    </div>
  )
}
