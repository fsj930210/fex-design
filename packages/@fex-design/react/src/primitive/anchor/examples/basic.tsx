import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/react/primitive/anchor'
import { useRef } from 'react'
export function BasicExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={container}
      className="grid h-80 w-full max-w-2xl grid-cols-[10rem_1fr] gap-6 overflow-auto rounded-lg border p-4"
    >
      <AnchorRoot
        container={() => container.current!}
       
        className="sticky top-0 self-start"
      >
        <AnchorRail>
          <AnchorIndicator />
        </AnchorRail>
        <AnchorList>
          <AnchorItem value="overview" target="#anchor-basic-overview">
            <AnchorLink>概览</AnchorLink>
          </AnchorItem>
          <AnchorItem value="usage" target="#anchor-basic-usage">
            <AnchorLink>使用方式</AnchorLink>
            <AnchorList>
              <AnchorItem value="api" target="#anchor-basic-api">
                <AnchorLink>API</AnchorLink>
              </AnchorItem>
            </AnchorList>
          </AnchorItem>
        </AnchorList>
      </AnchorRoot>
      <div className="grid gap-24 pb-48">
        <section id="anchor-basic-overview"><h3 className="font-semibold">概览</h3><p className="text-muted-foreground">Anchor 根据滚动位置同步当前章节。</p></section>
        <section id="anchor-basic-usage"><h3 className="font-semibold">使用方式</h3><p className="text-muted-foreground">点击项目滚动到对应内容。</p></section>
        <section id="anchor-basic-api"><h3 className="font-semibold">API</h3><p className="text-muted-foreground">通过结构化组件自由组合。</p></section>
      </div>
    </div>
  )
}
