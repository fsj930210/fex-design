import { MenuRoot, MenuContent, MenuGroup, MenuGroupLabel, MenuItem } from '@fex-design/react/primitive/menu'

export function MenuGroupExample() {
  return <div className="w-full max-w-xs rounded-lg border border-border p-1">
    <MenuRoot layout="inline"><MenuContent aria-label="菜单分组">
      <MenuGroup>
        <MenuGroupLabel>工作空间</MenuGroupLabel>
        <MenuItem value="overview">概览</MenuItem>
        <MenuItem value="members">成员</MenuItem>
      </MenuGroup>
      <MenuGroup>
        <MenuGroupLabel>账户</MenuGroupLabel>
        <MenuItem value="profile">个人资料</MenuItem>
        <MenuItem value="billing" disabled>账单</MenuItem>
      </MenuGroup>
    </MenuContent></MenuRoot>
  </div>
}
