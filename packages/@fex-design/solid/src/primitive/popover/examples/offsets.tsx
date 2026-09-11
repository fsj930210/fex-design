import { createSignal, For } from 'solid-js'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import { Popover, PopoverTrigger, PopoverPortal, PopoverContent, PopoverArrow, PopoverHeader, PopoverTitle } from '@fex-design/solid/primitive/popover'
import { Button } from '@fex-design/solid/ui/button'

export function OffsetsExample() {
type DemoCase = { label: string; options: PopoverOptions }
const [sideOffset, setSideOffset] = createSignal(12)
const [alignOffset, setAlignOffset] = createSignal(0)
const cases: DemoCase[] = (['start', 'center', 'end'] as const).map((align) => ({ label: align, options: { side: 'bottom', align, arrow: true, avoidCollisions: false, get sideOffset() { return sideOffset() }, get alignOffset() { return alignOffset() } } }))

  return <div class="w-full flex items-center justify-center min-h-[480px] py-16">{<div class="grid gap-4">
    
    <label>浮层与触发元素距离 {sideOffset()}px <input type="range" min="0" max="40" value={sideOffset()} onInput={(event) => setSideOffset(event.currentTarget.valueAsNumber)} /></label>
    <label>面板与触发元素对齐偏移 {alignOffset()}px <input type="range" min="-40" max="40" value={alignOffset()} onInput={(event) => setAlignOffset(event.currentTarget.valueAsNumber)} /></label>
    <div class="flex flex-wrap justify-center gap-16 pt-12 pb-24">
      <For each={cases}>{(item) =>
        <div>
          <Popover {...item.options}>
            {(state) => <>
              <PopoverTrigger>{(binding) => <Button {...binding.props} ref={binding.ref}>{item.label}</Button>}</PopoverTrigger>
              <PopoverPortal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader><PopoverTitle>提示信息</PopoverTitle></PopoverHeader>
                  <p>这里可以放置说明和交互内容。</p>
                </PopoverContent>
              </PopoverPortal>
            </>}
          </Popover>
        </div>
      }</For>
      
    </div>
  </div>}</div>
}
