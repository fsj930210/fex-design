import { Menu, MenuGroup, MenuGroupLabel, MenuItem } from '@fex-design/react/ui/menu'

export function MenuGroupExample() {
  return (<div className="w-full max-w-xs rounded-lg border border-border p-1">
    <Menu>
      <MenuContent aria-label="????">
        <MenuGroup>
          <MenuGroupLabel>????</MenuGroupLabel>
          <MenuItem value="overview">??</MenuItem>
          <MenuItem value="members">??</MenuItem>
        </MenuGroup>
        <MenuGroup>
          <MenuGroupLabel>??</MenuGroupLabel>
          <MenuItem value="profile">????</MenuItem>
          <MenuItem value="billing" disabled>??</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  </div>)
}
