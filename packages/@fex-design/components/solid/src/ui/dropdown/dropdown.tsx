import type { ParentProps } from 'solid-js'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/solid/primitive/dropdown'
import { Button } from '@fex-design/solid/primitive/button'
import { MenuItems, type MenuItemData, type MenuItemRenderers } from '@fex-design/solid/ui/menu'
import type { DropdownRootOptions } from '@fex-design/solid/primitive/dropdown'
export type DropdownProps = ParentProps<
  DropdownRootOptions &
    MenuItemRenderers & {
      items: readonly MenuItemData[]
    }
>
export function Dropdown(props: DropdownProps) {
  return (
    <DropdownRoot {...props}>
      <DropdownTrigger>
        {(binding) => (
          <Button {...binding.props} ref={binding.ref}>
            {props.children}
          </Button>
        )}
      </DropdownTrigger>
      <DropdownPortal>
        <DropdownContent>
          <MenuItems items={props.items} renderItem={props.renderItem} />
        </DropdownContent>
      </DropdownPortal>
    </DropdownRoot>
  )
}
