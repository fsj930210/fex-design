import { splitProps, type ParentProps } from 'solid-js'
import type { MenuOptions } from '@fex-design/core/menu/types'
import { MenuContext, MenuLevelContext, SubMenuContext } from './context'
import { useMenu } from './use-menu'
export type MenuRootProps = ParentProps<MenuOptions>
export function MenuRoot(props: MenuRootProps) {
  const [local, options] = splitProps(props, ['children'])
  const binding = useMenu(() => ({ ...options }))
  return (
    <MenuContext.Provider value={binding.dom}>
      <MenuLevelContext.Provider value={undefined}>
        <SubMenuContext.Provider value={undefined}>{local.children}</SubMenuContext.Provider>
      </MenuLevelContext.Provider>
    </MenuContext.Provider>
  )
}
