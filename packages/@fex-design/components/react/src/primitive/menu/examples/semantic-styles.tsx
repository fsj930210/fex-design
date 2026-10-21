import {
  MenuRoot,
  MenuContent,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
} from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/ui/button'
import { useState } from 'react'
import type { MenuPopoverProps } from '@fex-design/react/primitive/menu'
import type { MenuClassNames, MenuStyles } from '@fex-design/react/primitive/menu'
export function MenuSemanticStylesExample() {
  const [styled, setStyled] = useState(true)
  const [open, setOpen] = useState<string[]>(['workspace'])
  const names: MenuClassNames = styled
    ? {
        root: 'rounded-xl border-2 border-violet-300 bg-violet-50 p-2',
        item: 'rounded-lg hover:bg-violet-100 data-[selected=true]:bg-violet-200 data-[selected=true]:text-violet-950',
        subMenuTrigger: 'rounded-lg bg-violet-100 text-violet-950 hover:bg-violet-200',
        subMenuContent: 'min-w-48',
        group: 'rounded-lg bg-violet-100/50',
        separator: 'bg-violet-300',
      }
    : { root: 'rounded-xl border border-border bg-background p-2', subMenuContent: 'min-w-48' }
  const partStyles: MenuStyles | undefined = styled
    ? {
        root: { borderRadius: '16px' },
        item: { fontWeight: 500 },
        subMenuTrigger: { fontWeight: 600 },
      }
    : undefined
  const popup: MenuPopoverProps | undefined = styled
    ? {
        classNames: {
          root: 'border-2 border-violet-300 bg-violet-50',
          content: 'rounded-lg bg-violet-100/50 p-2',
        },
        styles: { root: { borderRadius: '16px' }, content: { gap: '8px' } },
      }
    : undefined
  function show(next: boolean) {
    setStyled(next)
    setOpen(['workspace'])
  }
  return (
    <div className="grid min-h-80 w-full max-w-xl content-start gap-3">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => show(false)}>
          默认样式
        </Button>
        <Button size="sm" onClick={() => show(true)}>
          整体定制
        </Button>
      </div>
      <MenuRoot
        layout="vertical"
        defaultValue={['overview']}
        openValues={open}
        onOpenChange={setOpen}
      >
        <MenuContent className={'w-44 max-w-full ' + names.root} style={partStyles?.root}>
          <MenuItem value="overview" className={names.item} style={partStyles?.item}>
            概览
          </MenuItem>
          <SubMenu value="workspace" popoverProps={popup}>
            <SubMenuTrigger className={names.subMenuTrigger} style={partStyles?.subMenuTrigger}>
              工作空间
            </SubMenuTrigger>
            <SubMenuContent className={names.subMenuContent} style={partStyles?.subMenuContent}>
              <MenuItem value="members" className={names.item} style={partStyles?.item}>
                成员
              </MenuItem>
              <MenuItem value="roles" className={names.item} style={partStyles?.item}>
                角色
              </MenuItem>
              <MenuItem value="billing" className={names.item} style={partStyles?.item} disabled>
                账单
              </MenuItem>
            </SubMenuContent>
          </SubMenu>
          <MenuSeparator className={names.separator} style={partStyles?.separator} />
          <MenuGroup className={names.group} style={partStyles?.group}>
            <MenuGroupLabel>账户</MenuGroupLabel>
            <MenuItem value="profile" className={names.item} style={partStyles?.item}>
              个人资料
            </MenuItem>
            <MenuItem value="logout" className={names.item} style={partStyles?.item}>
              退出登录
            </MenuItem>
          </MenuGroup>
        </MenuContent>
      </MenuRoot>
    </div>
  )
}
