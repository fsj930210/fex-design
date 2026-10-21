import { createContext, use } from 'react'
import type { MenuDomBinding, MenuBranch } from '@fex-design/core/menu/dom-types'
export const MenuContext = createContext<MenuDomBinding | null>(null)
export const SubMenuContext = createContext<MenuBranch | undefined>(undefined)
export const MenuLevelContext = createContext<MenuBranch | undefined>(undefined)
export function useMenuContext() {
  const binding = use(MenuContext)
  if (!binding) throw new Error('Menu parts require MenuRoot')
  return binding
}
