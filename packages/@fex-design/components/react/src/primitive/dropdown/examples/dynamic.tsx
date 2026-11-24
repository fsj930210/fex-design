import { useState } from 'react'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/react/primitive/dropdown'
import { MenuItem } from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/primitive/button'
export function DropdownDynamicExample() {
  const [hasItems, setHasItems] = useState(true)
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <Button onClick={() => setHasItems(!hasItems)}>切换菜单项</Button>
      <DropdownRoot closeOnSelect={false}>
        <DropdownTrigger>{(props) => <Button {...props}>操作</Button>}</DropdownTrigger>
        <DropdownPortal>
          <DropdownContent aria-label={hasItems ? '操作菜单' : '操作菜单，无可用操作'}>
            {hasItems ? (
              <>
                <MenuItem value="rename">重命名</MenuItem>
                <MenuItem value="duplicate">复制</MenuItem>
                <MenuItem value="clear" onClick={() => setHasItems(false)}>
                  移除菜单项
                </MenuItem>
              </>
            ) : (
              <span aria-hidden="true" className="px-3 py-2 text-muted-foreground">
                暂无操作
              </span>
            )}
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>菜单项：{hasItems ? '三个' : '无'}</output>
    </div>
  )
}
