import { useState } from 'react'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/react/primitive/dropdown'
import { MenuItem } from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/primitive/button'

export function DropdownSemanticStylesExample() {
  const [value, setValue] = useState('尚未选择')
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <DropdownRoot onActivate={(info) => setValue(info.value)}>
        <DropdownTrigger>{(props) => <Button {...props}>操作</Button>}</DropdownTrigger>
        <DropdownPortal>
          <DropdownContent className=" border-blue-500 bg-blue-50 text-blue-950">
            <MenuItem value="rename" className="font-semibold hover:bg-blue-200">
              重命名
            </MenuItem>
            <MenuItem value="duplicate" className="font-semibold hover:bg-blue-200">
              复制
            </MenuItem>
            <MenuItem value="archive" disabled>
              归档
            </MenuItem>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>最近操作：{value}</output>
    </div>
  )
}
