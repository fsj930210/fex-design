import { useState } from 'react'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/react/primitive/dropdown'
import {
  MenuItem,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
} from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/primitive/button'
export function DropdownExtendedMenuExample() {
  const [extended, setExtended] = useState(true)
  const [selected, setSelected] = useState('尚未选择')
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <Button onClick={() => setExtended(!extended)}>{extended ? '隐藏' : '显示'}扩展操作</Button>
      <DropdownRoot onActivate={(info) => setSelected(info.value)}>
        <DropdownTrigger>{(props) => <Button {...props}>操作</Button>}</DropdownTrigger>
        <DropdownPortal>
          <DropdownContent>
            <MenuItem value="edit">编辑</MenuItem>
            <MenuItem value="copy">复制</MenuItem>
            {extended && (
              <>
                <MenuSeparator />
                <MenuGroup>
                  <MenuGroupLabel>扩展操作</MenuGroupLabel>
                  <MenuItem value="archive">归档</MenuItem>
                  <MenuItem value="export">导出</MenuItem>
                </MenuGroup>
              </>
            )}
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>最近操作：{selected}</output>
    </div>
  )
}
