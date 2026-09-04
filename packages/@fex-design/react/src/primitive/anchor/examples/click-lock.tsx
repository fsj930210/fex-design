import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/react/primitive/anchor'
import { useRef } from 'react'

const sections = [
  ['first', '第一节'],
  ['second', '点击第二节'],
  ['third', '第三节'],
] as const

export function ClickLockExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div className="grid w-full max-w-2xl gap-3">
      <p className="text-sm text-muted-foreground">点击“第二节”：容器会滚到底，但高亮仍保留在点击项。</p>
      <div ref={container} className="grid h-72 grid-cols-[10rem_1fr] gap-6 overflow-auto rounded-lg border p-4">
        <AnchorRoot container={() => container.current} className="sticky top-0 self-start">
          <AnchorRail><AnchorIndicator /></AnchorRail>
          <AnchorList>
            {sections.map(([key, title]) => <AnchorItem key={key} value={key} target={`#anchor-click-lock-${key}`}><AnchorLink>{title}</AnchorLink></AnchorItem>)}
          </AnchorList>
        </AnchorRoot>
        <div className="grid gap-28 pb-16">
          {sections.map(([key, title]) => <section key={key} id={`anchor-click-lock-${key}`}><h3 className="font-semibold">{title}</h3></section>)}
        </div>
      </div>
    </div>
  )
}
