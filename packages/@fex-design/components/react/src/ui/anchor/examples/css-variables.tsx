import { useRef } from 'react'
import { Anchor } from '@fex-design/react/ui/anchor'

const items = [
  { key: 'overview', title: '概览', target: '#react-ui-basic-overview' },
  {
    key: 'usage',
    title: '使用方式',
    target: '#react-ui-basic-usage',
    children: [{ key: 'api', title: 'API', target: '#react-ui-basic-api' }],
  },
]

export function AnchorCssVariablesExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={container}
      className="grid h-80 w-full max-w-2xl grid-cols-[14rem_1fr] gap-6 overflow-auto rounded-xl border p-4"
    >
      <Anchor
        items={items}
        container={() => container.current}
        className="sticky top-0 self-start [--anchor-indent:20px] [--primary:#7c3aed]"
      />
      <div className="grid gap-32 pb-64">
        <section id="react-ui-basic-overview">
          <h3 className="font-semibold">概览</h3>
          <p className="text-muted-foreground">Anchor 根据滚动位置同步当前章节。</p>
        </section>
        <section id="react-ui-basic-usage">
          <h3 className="font-semibold">使用方式</h3>
          <p className="text-muted-foreground">点击项目滚动到对应内容。</p>
        </section>
        <section id="react-ui-basic-api">
          <h3 className="font-semibold">API</h3>
          <p className="text-muted-foreground">通过结构化组件自由组合。</p>
        </section>
      </div>
    </div>
  )
}
