import type { JSX } from 'solid-js'
import type { MenuEntry } from '@fex-design/core/menu/types'
import type { MenuItemSlot } from '@fex-design/solid/primitive/menu'
export type MenuItemData = MenuEntry<JSX.Element, JSX.CSSProperties>
export type MenuItemBinding = MenuItemSlot & { content: JSX.Element }
export interface MenuItemRenderers {
  renderItem?:
    | ((
        item: Extract<MenuItemData, { value: string; children?: never }>,
        binding: MenuItemBinding,
      ) => JSX.Element)
    | undefined
}

export type { MenuClassNames, MenuStyles } from '@fex-design/solid/primitive/menu'
