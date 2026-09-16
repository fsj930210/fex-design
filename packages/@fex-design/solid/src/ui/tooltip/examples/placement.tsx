import type { FloatingPlacement } from '@fex-design/core/floating/placement'
import { For } from 'solid-js'
import { Tooltip } from '@fex-design/solid/ui/tooltip'
import { Button } from '@fex-design/solid/ui/button'
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
const cases = placements.map((placement, index) => ({ placement, cell: cells[index] }))
export function PlacementExample() {
  return (
    <div class="w-full flex items-center justify-center min-h-[600px] py-16">
      <div class="grid w-full gap-4 overflow-visible">
        <p>四个方向 × 三种对齐，共 12 个位置；本例关闭自动避让，浮层始终保持所选方向。</p>
        <div class="grid grid-cols-[repeat(5,5rem)] grid-rows-[repeat(5,2.25rem)] justify-center gap-3 px-8 py-28 [&_button]:h-9 [&_button]:w-20 [&_button]:justify-center [&_button]:px-2">
          <For each={cases}>
            {(item) => (
              <div style={{ 'grid-area': item.cell }}>
                <Tooltip placement={item.placement} title={item.placement} avoidCollisions={false}>
                  {(trigger) => (
                    <Button {...trigger.props} ref={trigger.ref} variant="outlined">
                      {item.placement}
                    </Button>
                  )}
                </Tooltip>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}
