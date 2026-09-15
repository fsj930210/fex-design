import { createSignal, For } from 'solid-js'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverTitle,
} from '@fex-design/solid/primitive/popover'
import { Button } from '@fex-design/solid/ui/button'

export function PlacementExample() {
  type DemoCase = { label: string; options: PopoverOptions }
  const placements: FloatingPlacement[] = [
    'topLeft',
    'top',
    'topRight',
    'leftTop',
    'rightTop',
    'left',
    'right',
    'leftBottom',
    'rightBottom',
    'bottomLeft',
    'bottom',
    'bottomRight',
  ]
  const cells = [
    '1 / 2',
    '1 / 3',
    '1 / 4',
    '2 / 1',
    '2 / 5',
    '3 / 1',
    '3 / 5',
    '4 / 1',
    '4 / 5',
    '5 / 2',
    '5 / 3',
    '5 / 4',
  ]
  const cases = placements.map((placement, index) => ({
    label: placement,
    options: { placement, arrow: true, avoidCollisions: false },
    cell: cells[index],
  }))

  return (
    <div class="w-full flex items-center justify-center min-h-[600px] py-16">
      {
        <div class="grid w-full gap-4">
          <div class="grid grid-cols-[repeat(5,5rem)] grid-rows-[repeat(5,2.25rem)] justify-center gap-3 px-8 py-28 [&_button]:h-9 [&_button]:w-20 [&_button]:justify-center [&_button]:px-2">
            <For each={cases}>
              {(item) => (
                <div style={{ 'grid-area': item.cell }}>
                  <Popover {...item.options}>
                    {(state) => (
                      <>
                        <PopoverTrigger>
                          {(binding) => (
                            <Button {...binding.props} ref={binding.ref}>
                              {item.label}
                            </Button>
                          )}
                        </PopoverTrigger>
                        <PopoverPortal>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>
                              <PopoverTitle>提示信息</PopoverTitle>
                            </PopoverHeader>
                            <p>这里可以放置说明和交互内容。</p>
                          </PopoverContent>
                        </PopoverPortal>
                      </>
                    )}
                  </Popover>
                </div>
              )}
            </For>
          </div>
        </div>
      }
    </div>
  )
}
