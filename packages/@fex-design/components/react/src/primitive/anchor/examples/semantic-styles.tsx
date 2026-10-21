import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/react/primitive/anchor'
import { useRef } from 'react'
export function AnchorSemanticStylesExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={container}
      className="grid h-80 w-full max-w-2xl grid-cols-[14rem_1fr] gap-6 overflow-auto rounded-xl border p-4"
    >
      <AnchorRoot
        container={() => container.current!}

        className="sticky top-0 self-start w-full rounded-xl border border-primary/30 bg-muted/20 p-3"
      >
        <AnchorRail className="w-1 bg-primary/15">
          <AnchorIndicator style={{ width: 3 }} className="bg-success" />
        </AnchorRail>
        <AnchorList className="gap-2 rounded-lg bg-background/70 p-2">
          <AnchorItem
            className="group rounded-lg border border-dashed border-primary/20 p-1"
            value="overview"
            target="#anchor-styles-overview"
          >
            <AnchorLink
              style={{ minHeight: 36 }}
              className="rounded-md px-3 group-data-[highlighted]:bg-primary/10"
            >
              概览
            </AnchorLink>
          </AnchorItem>
          <AnchorItem
            className="group rounded-lg border border-dashed border-primary/20 p-1"
            value="usage"
            target="#anchor-styles-usage"
          >
            <AnchorLink
              style={{ minHeight: 36 }}
              className="rounded-md px-3 group-data-[highlighted]:bg-primary/10"
            >
              使用方式
            </AnchorLink>
            <AnchorList className="gap-2 rounded-lg bg-background/70 p-2">
              <AnchorItem
                className="group rounded-lg border border-dashed border-primary/20 p-1"
                value="api"
                target="#anchor-styles-api"
              >
                <AnchorLink
                  style={{ minHeight: 36 }}
                  className="rounded-md px-3 group-data-[highlighted]:bg-primary/10"
                >
                  API
                </AnchorLink>
              </AnchorItem>
            </AnchorList>
          </AnchorItem>
        </AnchorList>
      </AnchorRoot>
      <div className="grid gap-32 pb-64">
        <section id="anchor-styles-overview">概览</section>
        <section id="anchor-styles-usage">使用方式</section>
        <section id="anchor-styles-api">API</section>
      </div>
    </div>
  )
}
