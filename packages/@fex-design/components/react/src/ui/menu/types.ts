import type { CSSProperties } from 'react'
import type { ReactNode } from 'react'
import type { MenuEntry } from '@fex-design/core/menu/types'
import type { MenuItemRenderProps } from '@fex-design/react/primitive/menu'
export type MenuItemData = MenuEntry<ReactNode, CSSProperties>
export type MenuItemBinding = MenuItemRenderProps & { content: ReactNode }
export interface MenuItemRenderers {
  renderItem?:
    | ((
        item: Extract<MenuItemData, { value: string; children?: never }>,
        binding: MenuItemBinding,
      ) => ReactNode)
    | undefined
}

export type { MenuClassNames, MenuStyles } from '@fex-design/react/primitive/menu'
