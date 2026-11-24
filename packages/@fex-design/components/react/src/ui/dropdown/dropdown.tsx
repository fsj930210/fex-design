import type { ReactNode } from 'react'
import { Button } from '@fex-design/react/primitive/button'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
  type DropdownRootProps,
} from '@fex-design/react/primitive/dropdown'
import { MenuItems, type MenuItemData, type MenuItemRenderers } from '@fex-design/react/ui/menu'

export interface DropdownProps extends Omit<DropdownRootProps, 'children'>, MenuItemRenderers {
  items: readonly MenuItemData[]
  children?: ReactNode
}

export function Dropdown({ items, children, menuProps, renderItem, ...props }: DropdownProps) {
  return (
    <DropdownRoot {...props} menuProps={menuProps}>
      <DropdownTrigger>{(binding) => <Button {...binding}>{children}</Button>}</DropdownTrigger>
      <DropdownPortal>
        <DropdownContent>
          <MenuItems items={items} renderItem={renderItem} />
        </DropdownContent>
      </DropdownPortal>
    </DropdownRoot>
  )
}
