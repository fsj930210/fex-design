import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/react/primitive/anchor'
import { useRef } from 'react'
export function OffsetExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={container}
      className="grid h-80 w-full max-w-2xl grid-cols-[11rem_1fr] gap-6 overflow-auto rounded-lg border p-4"
    >
      <AnchorRoot
        container={() => container.current!}
        targetOffset={48}
        className="sticky top-0 self-start"
      >
        <AnchorRail>
          <AnchorIndicator />
        </AnchorRail>
        <AnchorList>
          <AnchorItem value="global" target="#anchor-offset-global">
            <AnchorLink>全局偏移 48px</AnchorLink>
          </AnchorItem>
          <AnchorItem value="item" target="#anchor-offset-item" targetOffset={96}>
            <AnchorLink>单项覆盖 96px</AnchorLink>
          </AnchorItem>
        </AnchorList>
      </AnchorRoot>
      <div className="grid gap-40 pb-64">
        <section id="anchor-offset-global"><h3 className="font-semibold">使用全局偏移</h3></section>
        <section id="anchor-offset-item"><h3 className="font-semibold">覆盖单项偏移</h3></section>
      </div>
    </div>
  )
}
