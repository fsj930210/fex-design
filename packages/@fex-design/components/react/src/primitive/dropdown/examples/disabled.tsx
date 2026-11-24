import { useState } from 'react'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/react/primitive/dropdown'
import { MenuItem } from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/primitive/button'

export function DropdownDisabledExample() {
  const [disabled, setDisabled] = useState(false)
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <Button onClick={() => setDisabled(!disabled)}>切换禁用</Button>
      <DropdownRoot disabled={disabled}>
        <DropdownTrigger>{(props) => <Button {...props}>操作</Button>}</DropdownTrigger>
        <DropdownPortal>
          <DropdownContent>
            <MenuItem value="rename">重命名</MenuItem>
            <MenuItem value="duplicate">复制</MenuItem>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>触发器状态：{disabled ? '禁用' : '启用'}</output>
    </div>
  )
}
