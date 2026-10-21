import { use, type ReactNode } from 'react'
import { createMenuBranch } from '@fex-design/core/menu/branch'
import type { MenuPopoverProps } from './popover-types'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useLatest } from '@fex-design/react/hooks/use-latest'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import { MenuLevelContext, SubMenuContext, useMenuContext } from './context'
export interface SubMenuProps {
  value: string
  popoverProps?: MenuPopoverProps | undefined
  children?: ReactNode
}
export function SubMenu({ value, popoverProps, children }: SubMenuProps) {
  const dom = useMenuContext(),
    parent = use(MenuLevelContext)
  const latest = useLatest({ value, popoverProps })
  const branch = useLazyRef(() => createMenuBranch(() => latest.current, parent)).current
  // Popup props configure an external floating controller.
  useIsomorphicLayoutEffect(() => dom.refresh())
  return <SubMenuContext value={branch}>{children}</SubMenuContext>
}
