import { Popover } from '@fex-design/react/ui/popover'
import type { PopoverProps } from '@fex-design/react/ui/popover'
import { Button } from '@fex-design/react/ui/button'


function DemoPopover({ label = '打开浮层', title = '提示信息', content = '这里可以放置说明和交互内容。', ...options }: Omit<PopoverProps, 'children'> & { label?: string }) {
  return <Popover {...options} title={title} content={content}><Button>{label}</Button></Popover>
}

export function BasicExample() {
  return <div className="w-full flex items-center justify-center min-h-[360px] py-16">{(<DemoPopover />)}</div>
}
