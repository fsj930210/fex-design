import { createContext, useContext } from 'solid-js'
import type { MenuDomBinding, MenuBranch } from '@fex-design/core/menu/dom-types'
export const MenuContext = createContext<MenuDomBinding>()
export const SubMenuContext = createContext<MenuBranch>()
export const MenuLevelContext = createContext<MenuBranch>()
export function useMenuContext() {
  const dom = useContext(MenuContext)
  if (!dom) throw new Error('Menu parts require MenuRoot')
  return dom
}
