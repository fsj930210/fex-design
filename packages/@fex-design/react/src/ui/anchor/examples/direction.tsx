import { useRef } from 'react'
import { Anchor } from '@fex-design/react/ui/anchor'

const getItems = (direction: 'ltr' | 'rtl') => [{ key: `${direction}-overview`, title: direction === 'rtl' ? 'نظرة عامة' : '概览', target: `#react-ui-${direction}-overview` }, { key: `${direction}-usage`, title: direction === 'rtl' ? 'طريقة الاستخدام' : '使用方式', target: `#react-ui-${direction}-usage`, children: [{ key: `${direction}-api`, title: direction === 'rtl' ? 'واجهة البرمجة' : 'API', target: `#react-ui-${direction}-api` }] }]

function DirectionAnchor({ direction }: { direction: 'ltr' | 'rtl' }) {
  const container = useRef<HTMLElement>(null)
  const arabic = direction === 'rtl'
  return <section ref={container} dir={direction} className="h-80 overflow-auto rounded-lg border"><div className="grid min-h-full grid-cols-[8rem_minmax(0,1fr)] gap-6 p-4"><div className="sticky top-4 self-start"><strong>{arabic ? 'RTL · مثال عربي' : 'LTR · 中文示例'}</strong><Anchor items={getItems(direction)} container={() => container.current} className="mt-3" /></div><div className="grid gap-32 pb-64"><section id={`react-ui-${direction}-overview`}>{arabic ? 'نظرة عامة' : '概览'}</section><section id={`react-ui-${direction}-usage`}>{arabic ? 'طريقة الاستخدام' : '使用方式'}</section><section id={`react-ui-${direction}-api`}>{arabic ? 'واجهة البرمجة' : 'API'}</section></div></div></section>
}

export function DirectionExample() {
  return <div className="grid w-full gap-6 sm:grid-cols-2"><DirectionAnchor direction="ltr" /><DirectionAnchor direction="rtl" /></div>
}
