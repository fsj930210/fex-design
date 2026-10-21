import type { ReactNode } from 'react'
import type { MenuOptions } from '@fex-design/core/menu/types'
import { MenuContext, MenuLevelContext, SubMenuContext } from './context'
import { useMenu } from './use-menu'
export interface MenuRootProps extends MenuOptions {
  children?: ReactNode
}
export function MenuRoot({ children, ...options }: MenuRootProps) {
  const { dom } = useMenu(options)
  return (
    <MenuContext value={dom}>
      <MenuLevelContext value={undefined}>
        <SubMenuContext value={undefined}>{children}</SubMenuContext>
      </MenuLevelContext>
    </MenuContext>
  )
}
