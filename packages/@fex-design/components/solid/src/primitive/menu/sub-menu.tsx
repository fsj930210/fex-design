import { createEffect, untrack, useContext, type ParentProps } from 'solid-js'
import { createMenuBranch } from '@fex-design/core/menu/branch'
import type { MenuPopoverProps } from './popover-types'
import { MenuLevelContext, SubMenuContext, useMenuContext } from './context'
export type SubMenuProps = ParentProps<{
  value: string
  popoverProps?: MenuPopoverProps | undefined
}>
export function SubMenu(props: SubMenuProps) {
  const dom = useMenuContext(),
    branch = createMenuBranch(() => props, useContext(MenuLevelContext))
  // Reactive popup configuration synchronizes the external DOM controller.
  createEffect(() => {
    props.value
    Object.values(props.popoverProps ?? {})
    untrack(() => dom.refresh())
  })
  return <SubMenuContext.Provider value={branch}>{props.children}</SubMenuContext.Provider>
}
