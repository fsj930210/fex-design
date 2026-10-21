import { createMenuController } from '@fex-design/core/menu/create-menu-controller'
import { createMenuDom } from '@fex-design/core/menu/create-menu-dom'
import type { MenuOptions } from '@fex-design/core/menu/types'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import useUnmount from '@fex-design/react/hooks/use-unmount'

/** Independent logic: bind custom hosts with dom.bindItem / dom.bindContent. */
export function useMenu(options: MenuOptions = {}) {
  const controller = useLazyRef(() => createMenuController(options)).current
  const dom = useLazyRef(() => createMenuDom(controller)).current
  const snapshot = useCoreStore(controller)
  // Props synchronize an external controller after React commits.
  useIsomorphicLayoutEffect(() => {
    controller.setOptions(options)
    dom.refresh()
  })
  useUnmount(() => dom.destroy())
  return { controller, dom, snapshot }
}
