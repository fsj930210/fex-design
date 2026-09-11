import { Popover } from '@fex-design/react/ui/popover'
import type { PopoverProps } from '@fex-design/react/ui/popover'
import { Button } from '@fex-design/react/ui/button'
const placements = ['topLeft', 'top', 'topRight', 'leftTop', 'rightTop', 'left', 'right', 'leftBottom', 'rightBottom', 'bottomLeft', 'bottom', 'bottomRight'] as const
const positions = ['col-start-2 row-start-1', 'col-start-3 row-start-1', 'col-start-4 row-start-1', 'col-start-1 row-start-2', 'col-start-5 row-start-2', 'col-start-1 row-start-3', 'col-start-5 row-start-3', 'col-start-1 row-start-4', 'col-start-5 row-start-4', 'col-start-2 row-start-5', 'col-start-3 row-start-5', 'col-start-4 row-start-5']

function DemoPopover({ label = '打开浮层', title = '提示信息', content = '这里可以放置说明和交互内容。', ...options }: Omit<PopoverProps, 'children'> & { label?: string }) {
  return <Popover {...options} title={title} content={content}><Button>{label}</Button></Popover>
}

export function PlacementExample() {
  return <div className="w-full flex items-center justify-center min-h-[600px] py-16">{(<div className="grid w-full gap-4 overflow-visible"><p>四个方向 × 三种对齐，共 12 个位置；本例关闭自动避让，浮层始终保持所选方向。</p><div className="grid grid-cols-[repeat(5,5rem)] grid-rows-[repeat(5,2.25rem)] justify-center gap-3 px-8 py-28 [&_button]:h-9 [&_button]:w-20 [&_button]:justify-center [&_button]:px-2">{placements.map((placement, index) => <div key={placement} className={positions[index]}><DemoPopover placement={placement} label={placement} arrow avoidCollisions={false} /></div>)}</div></div>)}</div>
}
