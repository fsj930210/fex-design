import { useState } from 'react'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/react/primitive/dropdown'
import { MenuItem } from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/primitive/button'

export function DropdownControlledExample() {
  const [open, setOpen] = useState(false)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <Button onClick={() => setOpen(!open)}>外部切换</Button>
      <DropdownRoot open={open} onOpenChange={setOpen}>
        <DropdownTrigger>{(props) => <Button {...props}>受控菜单</Button>}</DropdownTrigger>
        <DropdownPortal>
          <DropdownContent>
            <MenuItem value="rename">重命名</MenuItem>
            <MenuItem value="duplicate">复制</MenuItem>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>菜单状态：{open ? '打开' : '关闭'}</output>
      <DropdownRoot defaultOpen={false} onOpenChange={setUncontrolledOpen}>
        <DropdownTrigger>{(props) => <Button {...props}>非受控菜单</Button>}</DropdownTrigger>
        <DropdownPortal>
          <DropdownContent>
            <MenuItem value="rename">重命名</MenuItem>
            <MenuItem value="duplicate">复制</MenuItem>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>非受控菜单状态：{uncontrolledOpen ? '打开' : '关闭'}</output>
    </div>
  )
}
