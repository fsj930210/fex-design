import { useRef } from 'react'
import { Anchor } from '@fex-design/react/ui/anchor'

const items = [{ key: 'intro', title: '介绍', target: '#react-ui-horizontal-intro' }, { key: 'features', title: '功能', target: '#react-ui-horizontal-features' }, { key: 'api', title: 'API', target: '#react-ui-horizontal-api' }]

export function HorizontalExample() {
  const container = useRef<HTMLDivElement>(null)
  return <div ref={container} className="h-80 w-full max-w-2xl overflow-auto rounded-lg border px-4 pb-4"><Anchor items={items} orientation="horizontal" container={() => container.current} className="sticky top-0 z-10 bg-background pt-4" /><div className="grid gap-24 pt-8 pb-48"><section id="react-ui-horizontal-intro"><h3 className="font-semibold">介绍</h3></section><section id="react-ui-horizontal-features"><h3 className="font-semibold">功能</h3></section><section id="react-ui-horizontal-api"><h3 className="font-semibold">API</h3></section></div></div>
}
