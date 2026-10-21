import {
  MenuRoot,
  MenuContent,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
} from '@fex-design/solid/primitive/menu'
export function MenuPopoverPropsExample() {
  return (
    <div class="w-full max-w-xl">
      <MenuRoot>
        <MenuContent class="w-44 max-w-full" aria-label="Popup configuration">
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
            <SubMenuContent class="min-w-60">
              <div class="px-3 py-2 text-xs">Custom popup header</div>
              <MenuItem value="copy">Copy</MenuItem>
              <MenuItem value="archive">Archive</MenuItem>
            </SubMenuContent>
          </SubMenu>
        </MenuContent>
      </MenuRoot>
    </div>
  )
}
