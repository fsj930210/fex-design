import { inject, type InjectionKey } from 'vue'
import type { MenuDomBinding, MenuBranch } from '@fex-design/core/menu/dom-types'
export const menuKey: InjectionKey<MenuDomBinding> = Symbol('Menu')
export const subMenuKey: InjectionKey<MenuBranch | undefined> = Symbol('SubMenu')
export const menuLevelKey: InjectionKey<MenuBranch | undefined> = Symbol('MenuLevel')
export function useMenuContext() {
  const binding = inject(menuKey)
  if (!binding) throw new Error('Menu parts require MenuRoot')
  return binding
}
