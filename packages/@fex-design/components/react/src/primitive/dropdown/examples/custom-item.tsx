import { useState } from 'react'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/react/primitive/dropdown'
import { MenuItem } from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/primitive/button'

export function DropdownCustomItemExample() {
  const [selected, setSelected] = useState('尚未选择')
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <DropdownRoot onActivate={(info) => setSelected(info.value)}>
        <DropdownTrigger>{(props) => <Button {...props}>选择操作</Button>}</DropdownTrigger>
        <DropdownPortal>
          <DropdownContent>
            <MenuItem value="edit" textValue="编辑">
              {({ props }) => (
                <button
                  {...props}
                  className={`${props.className} flex h-[var(--menu-item-height)] items-center justify-between gap-6 px-[var(--menu-item-padding-x)] text-sm`}
                >
                  <span>编辑资料</span>
                  <kbd>⌘ E</kbd>
                </button>
              )}
            </MenuItem>
            <MenuItem value="archive" textValue="归档">
              {({ props }) => (
                <button
                  {...props}
                  className={`${props.className} flex h-[var(--menu-item-height)] items-center justify-between gap-6 px-[var(--menu-item-padding-x)] text-sm`}
                >
                  <span>归档项目</span>
                  <kbd>⌘ A</kbd>
                </button>
              )}
            </MenuItem>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>最近操作：{selected}</output>
    </div>
  )
}
