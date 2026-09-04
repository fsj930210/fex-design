import { AnchorIndicator, AnchorItem, AnchorLink, AnchorList, AnchorRail, AnchorRoot } from '@fex-design/solid/primitive/anchor'
import { createSignal, For } from 'solid-js'

export default function DirectionExample() {
  return <div class="grid w-full gap-6 sm:grid-cols-2"><For each={['ltr', 'rtl'] as const}>{(direction) => {
    const [container, setContainer] = createSignal<HTMLElement>()
    const rtl = direction === 'rtl'
    return <section ref={setContainer} dir={direction} class="h-80 overflow-auto rounded-lg border">
      <div class="grid min-h-full grid-cols-[8rem_minmax(0,1fr)] gap-6 p-4">
        <div class="sticky top-4 self-start">
          <strong>{rtl ? 'RTL · مثال عربي' : 'LTR · 中文示例'}</strong>
          <AnchorRoot container={() => container()!} class="mt-3">
            <AnchorRail><AnchorIndicator /></AnchorRail>
            <AnchorList>
              <AnchorItem value={`${direction}-overview`} target={`#solid-${direction}-overview`}><AnchorLink>{rtl ? 'نظرة عامة' : '概览'}</AnchorLink></AnchorItem>
              <AnchorItem value={`${direction}-usage`} target={`#solid-${direction}-usage`}>
                <AnchorLink>{rtl ? 'طريقة الاستخدام' : '使用方式'}</AnchorLink>
                <AnchorList><AnchorItem value={`${direction}-api`} target={`#solid-${direction}-api`}><AnchorLink>{rtl ? 'واجهة البرمجة' : 'API'}</AnchorLink></AnchorItem></AnchorList>
              </AnchorItem>
            </AnchorList>
          </AnchorRoot>
        </div>
        <div class="grid gap-32 pb-64">
          <section id={`solid-${direction}-overview`}>{rtl ? 'نظرة عامة' : '概览'}</section>
          <section id={`solid-${direction}-usage`}>{rtl ? 'طريقة الاستخدام' : '使用方式'}</section>
          <section id={`solid-${direction}-api`}>{rtl ? 'واجهة البرمجة' : 'API'}</section>
        </div>
      </div>
    </section>
  }}</For></div>
}
