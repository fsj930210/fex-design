import {
  Menu,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
  MenuGroup,
  MenuSeparator,
} from '@fex-design/react/ui/menu'
import { Button } from '@fex-design/react/ui/button'
import { useState } from 'react'
import type { CSSProperties } from 'react'
export function MenuCssVariablesExample() {
  const [styled, setStyled] = useState(true)
  const [open, setOpen] = useState<string[]>(['workspace'])
  const theme = styled
    ? ({
        '--menu-background': '#faf5ff',
        '--menu-color': '#3b0764',
        '--menu-item-background': '#ffffff',
        '--menu-item-color': '#5b21b6',
        '--menu-item-hover-background': '#ede9fe',
        '--menu-item-hover-color': '#4c1d95',
        '--menu-item-selected-background': '#ddd6fe',
        '--menu-item-selected-color': '#4c1d95',
        '--menu-item-disabled-color': '#a78bfa',
        '--menu-item-height': '40px',
        '--menu-item-radius': '10px',
        '--menu-indent': '24px',
      } as CSSProperties)
    : undefined
  function show(next: boolean) {
    setStyled(next)
    setOpen(['workspace'])
  }
  return (
    <div className="grid min-h-80 w-full max-w-xl content-start gap-3">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => show(false)}>
          默认主题
        </Button>
        <Button size="sm" onClick={() => show(true)}>
          紫色主题
        </Button>
      </div>
      <Menu
        layout="inline"
        defaultValue={['overview']}
        openValues={open}
        onOpenChange={setOpen}
        className="w-full max-w-xs rounded-xl border border-border p-2"
        style={theme}
      >
        <MenuItem value="overview">概览</MenuItem>
        <SubMenu value="workspace">
          <SubMenuTrigger>工作空间</SubMenuTrigger>
          <SubMenuContent>
            <MenuItem value="members">成员</MenuItem>
            <MenuItem value="roles">角色</MenuItem>
            <MenuItem value="billing" disabled>
              账单
            </MenuItem>
          </SubMenuContent>
        </SubMenu>
        <MenuSeparator />
        <MenuGroup label="账户">
          <MenuItem value="profile">个人资料</MenuItem>
          <MenuItem value="logout">退出登录</MenuItem>
        </MenuGroup>
      </Menu>
    </div>
  )
}
