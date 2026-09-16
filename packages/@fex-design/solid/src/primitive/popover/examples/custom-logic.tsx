import { createPopover } from '@fex-design/solid/primitive/popover'
import { Button } from '@fex-design/solid/ui/button'

export function CustomLogicExample() {
  const popover = createPopover(() => ({}))
  return (
    <div class="flex items-center gap-3">
      <Button onClick={() => popover.overlay.toggle()}>
        {popover.snapshot().open ? '关闭' : '打开'}
      </Button>
      <output>状态：{popover.snapshot().open ? '已打开' : '已关闭'}</output>
    </div>
  )
}
