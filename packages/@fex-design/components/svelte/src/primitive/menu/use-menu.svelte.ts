import { onDestroy, untrack } from 'svelte'
import { fromStore } from 'svelte/store'
import { createMenuController } from '@fex-design/core/menu/create-menu-controller'
import { createMenuDom } from '@fex-design/core/menu/create-menu-dom'
import type { MenuOptions } from '@fex-design/core/menu/types'
import { readableCoreStore } from '@fex-design/svelte/stores/core-store'
export function useMenu(source: MenuOptions | (() => MenuOptions) = {}) {
  const options = () => (typeof source === 'function' ? source() : source)
  const controller = createMenuController(untrack(options)),
    dom = createMenuDom(controller)
  const store = fromStore(readableCoreStore(controller))
  // Rune props synchronize the external controller; actions remain event driven.
  $effect(() => {
    const next = options()
    untrack(() => {
      controller.setOptions(next)
      dom.refresh()
    })
  })
  onDestroy(() => dom.destroy())
  return { controller, dom, snapshot: () => store.current }
}
