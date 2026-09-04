import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/react/primitive/anchor'
import { useRef } from 'react'
export function HorizontalExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div ref={container} className="h-80 w-full max-w-2xl overflow-auto rounded-lg border px-4 pb-4">
      <AnchorRoot
        orientation="horizontal"
        container={() => container.current!}
        className="sticky top-0 z-10 bg-background pt-4"
      >
        <AnchorRail>
          <AnchorIndicator />
        </AnchorRail>
        <AnchorList>
          <AnchorItem value="intro" target="#anchor-horizontal-intro">
            <AnchorLink>介绍</AnchorLink>
          </AnchorItem>
          <AnchorItem value="features" target="#anchor-horizontal-features">
            <AnchorLink>功能</AnchorLink>
          </AnchorItem>
          <AnchorItem value="api" target="#anchor-horizontal-api">
            <AnchorLink>API</AnchorLink>
          </AnchorItem>
        </AnchorList>
      </AnchorRoot>
      <div className="grid gap-24 pt-8 pb-48">
        <section id="anchor-horizontal-intro"><h3 className="font-semibold">介绍</h3></section>
        <section id="anchor-horizontal-features"><h3 className="font-semibold">功能</h3></section>
        <section id="anchor-horizontal-api"><h3 className="font-semibold">API</h3></section>
      </div>
    </div>
  )
}
