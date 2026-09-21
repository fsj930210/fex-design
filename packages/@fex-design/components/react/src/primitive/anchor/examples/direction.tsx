import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/react/primitive/anchor'
import { useRef } from 'react'
function DirectionAnchor({ direction }: { direction: 'ltr' | 'rtl' }) {
  const arabic = direction === 'rtl'
  const container = useRef<HTMLElement>(null)
  return (
    <section ref={container} dir={direction} className="h-80 overflow-auto rounded-lg border">
      <div className="grid min-h-full grid-cols-[8rem_minmax(0,1fr)] gap-6 p-4">
        <div className="sticky top-4 self-start">
          <strong>{arabic ? 'RTL · مثال عربي' : 'LTR · 中文示例'}</strong>
          <AnchorRoot container={() => container.current} className="mt-3">
            <AnchorRail>
              <AnchorIndicator />
            </AnchorRail>
            <AnchorList>
              <AnchorItem value={`${direction}-overview`} target={`#${direction}-overview`}>
                <AnchorLink>{arabic ? 'نظرة عامة' : '概览'}</AnchorLink>
              </AnchorItem>
              <AnchorItem value={`${direction}-usage`} target={`#${direction}-usage`}>
                <AnchorLink>{arabic ? 'طريقة الاستخدام' : '使用方式'}</AnchorLink>
                <AnchorList>
                  <AnchorItem value={`${direction}-api`} target={`#${direction}-api`}>
                    <AnchorLink>{arabic ? 'واجهة البرمجة' : 'API'}</AnchorLink>
                  </AnchorItem>
                </AnchorList>
              </AnchorItem>
            </AnchorList>
          </AnchorRoot>
        </div>
        <div className="grid gap-32 pb-64">
          <section id={`${direction}-overview`}>{arabic ? 'نظرة عامة' : '概览'}</section>
          <section id={`${direction}-usage`}>{arabic ? 'طريقة الاستخدام' : '使用方式'}</section>
          <section id={`${direction}-api`}>{arabic ? 'واجهة البرمجة' : 'API'}</section>
        </div>
      </div>
    </section>
  )
}
export function DirectionExample() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <DirectionAnchor direction="ltr" />
      <DirectionAnchor direction="rtl" />
    </div>
  )
}
