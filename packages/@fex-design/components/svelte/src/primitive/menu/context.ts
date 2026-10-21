import { getContext } from 'svelte'
import type { MenuDomBinding, MenuBranch } from '@fex-design/core/menu/dom-types'
export const menuKey = Symbol('Menu')
export const subMenuKey = Symbol('SubMenu')
export const menuLevelKey = Symbol('MenuLevel')
export function useMenuContext() {
  const dom = getContext<MenuDomBinding | undefined>(menuKey)
  if (!dom) throw new Error('Menu parts require MenuRoot')
  return dom
}
export function getMenuLevel() {
  return getContext<MenuBranch | undefined>(menuLevelKey)
}
export function getSubMenu() {
  const branch = getContext<MenuBranch | undefined>(subMenuKey)
  if (!branch) throw new Error('SubMenu parts require SubMenu')
  return branch
}
