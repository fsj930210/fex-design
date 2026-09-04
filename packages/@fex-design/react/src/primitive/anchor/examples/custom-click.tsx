import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/react/primitive/anchor'
import { useRef } from 'react'
export function CustomClickExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div ref={container} className="grid h-80 w-full max-w-2xl grid-cols-[14rem_1fr] gap-6 overflow-auto rounded-lg border p-4">
      <AnchorRoot container={() => container.current} className="sticky top-0 self-start">
        <AnchorRail>
          <AnchorIndicator />
        </AnchorRail>
        <AnchorList>
          <AnchorItem value="normal" target="#anchor-click-normal">
            <AnchorLink onClick={() => console.log('正常点击')}>正常点击并滚动</AnchorLink>
          </AnchorItem>
          <AnchorItem value="blocked" target="#anchor-click-blocked">
            <AnchorLink
              onClick={(event) => {
                event.preventDefault()
                console.log('已阻止内部滚动')
              }}
            >
              阻止内部滚动
            </AnchorLink>
          </AnchorItem>
        </AnchorList>
      </AnchorRoot>
      <div className="grid gap-40 pb-64">
        <section id="anchor-click-normal">正常目标</section>
        <section id="anchor-click-blocked">被阻止的目标</section>
      </div>
    </div>
  )
}
