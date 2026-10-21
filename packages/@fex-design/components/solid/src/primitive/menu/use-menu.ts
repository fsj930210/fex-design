import { createEffect, onCleanup, untrack, type Accessor } from 'solid-js'
import { createMenuController } from '@fex-design/core/menu/create-menu-controller'
import { createMenuDom } from '@fex-design/core/menu/create-menu-dom'
import type { MenuOptions } from '@fex-design/core/menu/types'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
export function useMenu(source: MenuOptions | Accessor<MenuOptions> = {}) {
  const options = () => (typeof source === 'function' ? source() : source)
  const controller = createMenuController(untrack(options)),
    dom = createMenuDom(controller)
  const snapshot = createCoreStoreSignal(controller)
  // Reactive configuration synchronizes an external controller, not business state.
  createEffect(() => {
    const next = options()
    untrack(() => {
      controller.setOptions(next)
      dom.refresh()
    })
  })
  onCleanup(() => dom.destroy())
  return { controller, dom, snapshot }
}
