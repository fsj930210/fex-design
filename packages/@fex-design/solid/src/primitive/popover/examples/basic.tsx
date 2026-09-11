import { createSignal, For } from 'solid-js'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import { Popover, PopoverTrigger, PopoverPortal, PopoverContent, PopoverArrow, PopoverHeader, PopoverTitle } from '@fex-design/solid/primitive/popover'
import { Button } from '@fex-design/solid/ui/button'

export function BasicExample() {
type DemoCase = { label: string; options: PopoverOptions }
const cases = [{ label: '打开浮层', options: {} }]

  return <div class="w-full flex items-center justify-center min-h-[360px] py-16">{<div class="grid gap-4">
    
    
    <div class="flex flex-wrap gap-3">
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
