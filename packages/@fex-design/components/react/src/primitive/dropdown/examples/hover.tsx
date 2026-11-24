import { useState } from 'react'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/react/primitive/dropdown'
import { MenuItem, SubMenu, SubMenuTrigger, SubMenuContent } from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/primitive/button'
export function DropdownHoverExample() {
  const [value, setValue] = useState('尚未选择')
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <DropdownRoot
        popoverProps={{ trigger: ['hover'], hoverCloseDelay: 180 }}
        menuProps={{ submenuTrigger: 'hover' }}
        onActivate={(info) => setValue(info.value)}
      >
        <DropdownTrigger>{(props) => <Button {...props}>操作</Button>}</DropdownTrigger>
        <DropdownPortal>
          <DropdownContent>
            <MenuItem value="rename">重命名</MenuItem>
            <SubMenu value="share">
              <SubMenuTrigger>分享</SubMenuTrigger>
              <SubMenuContent>
                <MenuItem value="link">复制链接</MenuItem>
                <SubMenu value="send">
                  <SubMenuTrigger>发送到</SubMenuTrigger>
                  <SubMenuContent>
                    <MenuItem value="email">电子邮件</MenuItem>
                  </SubMenuContent>
                </SubMenu>
              </SubMenuContent>
            </SubMenu>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>最近操作：{value}</output>
    </div>
  )
}
