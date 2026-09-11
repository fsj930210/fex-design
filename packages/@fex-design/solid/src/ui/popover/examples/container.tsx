import { createSignal, For } from 'solid-js'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import { Popover } from '@fex-design/solid/ui/popover'
import { Button } from '@fex-design/solid/ui/button'

export function ContainerExample() {
type DemoCase = { label: string; options: PopoverOptions }
let container: HTMLDivElement | undefined
const cases = [
  { label: '挂载到 body', options: {} },
  { label: '在框内打开浮层', options: {
    getPopupContainer: () => container ?? document.body,
  } },
] satisfies DemoCase[]

  return <div class="w-full flex items-center justify-center min-h-[360px] py-16">{<div class="grid w-full gap-4">
    
    
    <div ref={container} class="relative w-full h-96 overflow-auto rounded-lg border-2 border-dashed p-6">
<p>自定义挂载区域：浮层插入此虚线框，仍以按钮为定位参照。</p>
<div class="flex min-h-[560px] justify-center gap-4 pt-24">
      <For each={cases}>{(item) =>
        <div>
          <Popover {...item.options} title="提示信息"
            content={(state) => <p>这里可以放置说明和交互内容。</p>}>
            {(binding) => <Button {...binding.props} ref={binding.ref}>{item.label}</Button>}
          </Popover>
        </div>
      }</For>
      </div>
    </div>
  </div>}</div>
}
