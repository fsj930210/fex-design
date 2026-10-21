import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/react/primitive/anchor'
import { useRef } from 'react'
export function AnchorCssVariablesExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={container}
      className="grid h-80 w-full max-w-2xl grid-cols-[14rem_1fr] gap-6 overflow-auto rounded-xl border p-4"
    >
      <AnchorRoot
        container={() => container.current!}

        className="sticky top-0 self-start [--anchor-indent:20px] [--primary:#7c3aed]"
      >
        <AnchorRail className="[--anchor-indent:20px] [--primary:#7c3aed]">
          <AnchorIndicator className="[--anchor-indent:20px] [--primary:#7c3aed]" />
        </AnchorRail>
        <AnchorList className="[--anchor-indent:20px] [--primary:#7c3aed]">
          <AnchorItem
            className="[--anchor-indent:20px] [--primary:#7c3aed]"
            value="overview"
            target="#anchor-styles-overview"
          >
            <AnchorLink className="[--anchor-indent:20px] [--primary:#7c3aed]">概览</AnchorLink>
          </AnchorItem>
          <AnchorItem
            className="[--anchor-indent:20px] [--primary:#7c3aed]"
            value="usage"
            target="#anchor-styles-usage"
          >
            <AnchorLink className="[--anchor-indent:20px] [--primary:#7c3aed]">使用方式</AnchorLink>
            <AnchorList className="[--anchor-indent:20px] [--primary:#7c3aed]">
              <AnchorItem
                className="[--anchor-indent:20px] [--primary:#7c3aed]"
                value="api"
                target="#anchor-styles-api"
              >
                <AnchorLink className="[--anchor-indent:20px] [--primary:#7c3aed]">API</AnchorLink>
              </AnchorItem>
            </AnchorList>
          </AnchorItem>
        </AnchorList>
      </AnchorRoot>
      <div className="grid gap-32 pb-64">
        <section id="anchor-styles-overview">
          <h3 className="font-semibold">概览</h3>
          <p className="text-muted-foreground">Anchor 根据滚动位置同步当前章节。</p>
        </section>
        <section id="anchor-styles-usage">
          <h3 className="font-semibold">使用方式</h3>
          <p className="text-muted-foreground">点击项目滚动到对应内容。</p>
        </section>
        <section id="anchor-styles-api">
          <h3 className="font-semibold">API</h3>
          <p className="text-muted-foreground">通过结构化组件自由组合。</p>
        </section>
      </div>
    </div>
  )
}
