import { useRef } from 'react'
import { Anchor } from '@fex-design/react/ui/anchor'

const items = [{ key: 'global', title: '全局偏移 48px', target: '#react-ui-offset-global' }, { key: 'item', title: '单项覆盖 96px', target: '#react-ui-offset-item', targetOffset: 96 }]

export function OffsetExample() {
  const container = useRef<HTMLDivElement>(null)
  return <div ref={container} className="grid h-80 w-full max-w-2xl grid-cols-[11rem_1fr] gap-6 overflow-auto rounded-lg border p-4"><Anchor items={items} targetOffset={48} container={() => container.current} className="sticky top-0 self-start" /><div className="grid gap-40 pb-64"><section id="react-ui-offset-global"><h3 className="font-semibold">使用全局偏移</h3></section><section id="react-ui-offset-item"><h3 className="font-semibold">覆盖单项偏移</h3></section></div></div>
}
