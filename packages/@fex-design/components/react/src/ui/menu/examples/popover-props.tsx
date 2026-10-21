import { Menu, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent } from '@fex-design/react/ui/menu'
export function MenuPopoverPropsExample() {
  return (
    <div className="w-full max-w-xl">
      <Menu className="w-44 max-w-full" aria-label="Popup configuration">
        <SubMenu
          value="actions"
          popoverProps={{
            align: 'end',
            sideOffset: 12,
            collisionPadding: 16,
            lazyMount: true,
            destroyOnHidden: true,
            zIndex: 80,
            getPopupContainer: (reference) => reference?.ownerDocument.body ?? document.body,
          }}
        >
          <SubMenuTrigger>Actions</SubMenuTrigger>
          <SubMenuContent className="min-w-60">
            <div className="px-3 py-2 text-xs">Custom popup header</div>
            <MenuItem value="copy">Copy</MenuItem>
            <MenuItem value="archive">Archive</MenuItem>
          </SubMenuContent>
        </SubMenu>
      </Menu>
    </div>
  )
}
