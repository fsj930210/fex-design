import { useState, type CSSProperties } from 'react'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/react/primitive/dropdown'
import { MenuItem } from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/primitive/button'

export function DropdownCssVariablesExample() {
  const [value, setValue] = useState('尚未选择')
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <DropdownRoot onActivate={(info) => setValue(info.value)}>
        <DropdownTrigger>{(props) => <Button {...props}>操作</Button>}</DropdownTrigger>
        <DropdownPortal>
          <DropdownContent
            style={
              {
                '--popover-background': '#f5f3ff',
                '--popover-border': '#8b5cf6',
                '--popover-foreground': '#4c1d95',
                '--menu-item-hover-background': '#ddd6fe',
              } as CSSProperties
            }
          >
            <MenuItem value="rename">重命名</MenuItem>
            <MenuItem value="duplicate">复制</MenuItem>
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
