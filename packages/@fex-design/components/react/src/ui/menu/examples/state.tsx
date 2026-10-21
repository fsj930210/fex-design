import { Button } from '@fex-design/react/ui/button'
import { Menu, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent } from '@fex-design/react/ui/menu'
import { useState } from 'react'

export function MenuStateExample() {
  const [value, setValue] = useState<string[]>(['members'])
  const [open, setOpen] = useState<string[]>(['workspace'])
  return (
    <div className="grid w-full max-w-2xl gap-4">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => setValue(['members'])}>
          设置成员
        </Button>
        <Button size="sm" onClick={() => setValue(['profile'])}>
          设置个人资料
        </Button>
        <Button size="sm" onClick={() => setValue([])}>
          清空选择
        </Button>
        <Button size="sm" onClick={() => setOpen(['workspace'])}>
          展开工作空间
        </Button>
        <Button size="sm" onClick={() => setOpen([])}>
          收起工作空间
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        选择：{JSON.stringify(value)}；展开：{JSON.stringify(open)}
      </p>
      <div className="grid items-start gap-4 sm:grid-cols-2">
        <section className="grid min-w-0 gap-2">
          <h3 className="text-sm font-medium">受控 value / openValues</h3>
          <Menu
            value={value}
            openValues={open}
            onValueChange={setValue}
            onOpenChange={setOpen}
            layout="inline"
            className="w-full max-w-xs rounded-lg border border-border p-1"
            aria-label="受控菜单"
          >
            <SubMenu value="workspace">
              <SubMenuTrigger>工作空间</SubMenuTrigger>
              <SubMenuContent>
                <MenuItem value="members">成员</MenuItem>
              </SubMenuContent>
            </SubMenu>
            <MenuItem value="profile">个人资料</MenuItem>
          </Menu>
        </section>
        <section className="grid min-w-0 gap-2">
          <h3 className="text-sm font-medium">非受控 defaultValue / defaultOpenValues</h3>
          <Menu
            defaultValue={['members']}
            defaultOpenValues={['workspace']}
            layout="inline"
            className="w-full max-w-xs rounded-lg border border-border p-1"
            aria-label="非受控菜单"
          >
            <SubMenu value="workspace">
              <SubMenuTrigger>工作空间</SubMenuTrigger>
              <SubMenuContent>
                <MenuItem value="members">成员</MenuItem>
              </SubMenuContent>
            </SubMenu>
            <MenuItem value="profile">个人资料</MenuItem>
          </Menu>
        </section>
      </div>
    </div>
  )
}
