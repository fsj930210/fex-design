import { createSignal } from 'solid-js'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/solid/primitive/dropdown'
import { MenuItem } from '@fex-design/solid/primitive/menu'
import { Button } from '@fex-design/solid/primitive/button'

export function DropdownControlledExample() {
  const [open, setOpen] = createSignal(false)
  const [uncontrolledOpen, setUncontrolledOpen] = createSignal(false)
  return (
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <Button onClick={() => setOpen(!open())}>外部切换</Button>
      <DropdownRoot open={open()} onOpenChange={setOpen}>
        <DropdownTrigger>
          {(slot) => (
            <Button {...slot.props} ref={slot.ref}>
              受控菜单
            </Button>
          )}
        </DropdownTrigger>
        <DropdownPortal>
          <DropdownContent>
            <MenuItem value="rename">重命名</MenuItem>
            <MenuItem value="duplicate">复制</MenuItem>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>菜单状态：{open() ? '打开' : '关闭'}</output>
      <DropdownRoot defaultOpen={false} onOpenChange={setUncontrolledOpen}>
        <DropdownTrigger>
          {(slot) => (
            <Button {...slot.props} ref={slot.ref}>
              非受控菜单
            </Button>
          )}
        </DropdownTrigger>
        <DropdownPortal>
          <DropdownContent>
            <MenuItem value="rename">重命名</MenuItem>
            <MenuItem value="duplicate">复制</MenuItem>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>非受控菜单状态：{uncontrolledOpen() ? '打开' : '关闭'}</output>
    </div>
  )
}
