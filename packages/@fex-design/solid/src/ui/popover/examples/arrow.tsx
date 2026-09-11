import { createSignal, For } from 'solid-js'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import { Popover } from '@fex-design/solid/ui/popover'
import { Button } from '@fex-design/solid/ui/button'

export function ArrowExample() {
type DemoCase = { label: string; options: PopoverOptions }
const cases = [
  { label: '不显示箭头', options: { arrow: false, placement: 'bottomLeft' } },
  { label: '箭头距面板边缘 16px', options: { arrow: true, placement: 'bottomLeft' } },
  { label: '箭头距面板边缘 28px', options: { arrow: true, arrowPadding: 28, placement: 'bottomLeft' } },
] satisfies DemoCase[]

  return <div class="w-full flex items-center justify-center min-h-[360px] py-16">{<div class="grid gap-4">
    
    
    <div class="flex flex-wrap gap-3">
      <For each={cases}>{(item) =>
        <div>
          <Popover {...item.options} title="提示信息"
            content={(state) => <p>这里可以放置说明和交互内容。</p>}>
            {(binding) => <Button {...binding.props} ref={binding.ref}>{item.label}</Button>}
          </Popover>
        </div>
      }</For>
      
    </div>
  </div>}</div>
}
