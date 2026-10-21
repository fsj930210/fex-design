import { DestroyRef, effect, inject, untracked } from '@angular/core'
import { createMenuController } from '@fex-design/core/menu/create-menu-controller'
import { createMenuDom } from '@fex-design/core/menu/create-menu-dom'
import type { MenuOptions } from '@fex-design/core/menu/types'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'
export function useMenu(source: MenuOptions | (() => MenuOptions) = {}) {
  const options = () => (typeof source === 'function' ? source() : source)
  const controller = createMenuController(options()),
    dom = createMenuDom(controller)
  const snapshot = createCoreStoreSignal(controller)
  // Signal inputs synchronize an external core controller.
  effect(() => {
    const next = options()
    untracked(() => {
      controller.setOptions(next)
      dom.refresh()
    })
  })
  inject(DestroyRef).onDestroy(() => dom.destroy())
  return { controller, dom, snapshot }
}
