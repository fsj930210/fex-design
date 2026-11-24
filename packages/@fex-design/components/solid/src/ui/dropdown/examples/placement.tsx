import { createSignal } from 'solid-js'
import { Dropdown } from '@fex-design/solid/ui/dropdown'
const placements = [
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
] as const
const positions = [
  'col-start-2 row-start-1',
  'col-start-3 row-start-1',
  'col-start-4 row-start-1',
  'col-start-1 row-start-2',
  'col-start-5 row-start-2',
  'col-start-1 row-start-3',
  'col-start-5 row-start-3',
  'col-start-1 row-start-4',
  'col-start-5 row-start-4',
  'col-start-2 row-start-5',
  'col-start-3 row-start-5',
  'col-start-4 row-start-5',
]
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'copy', label: '复制' },
]
export function DropdownPlacementExample() {
  return (
    <div class="grid w-full gap-4 p-6">
      <p>四个方向、三种对齐；关闭自动避让以展示所选位置。</p>
      <div class="grid grid-cols-[repeat(5,max-content)] grid-rows-[repeat(5,2.25rem)] justify-center gap-3 py-28">
        {placements.map((placement, index) => (
          <div class={positions[index]}>
            <Dropdown items={items} popoverProps={{ placement, avoidCollisions: false }}>
              {placement}
            </Dropdown>
          </div>
        ))}
      </div>
    </div>
  )
}
