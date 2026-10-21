import { toValue, watchEffect, onScopeDispose, type MaybeRefOrGetter } from 'vue'
import { createMenuController } from '@fex-design/core/menu/create-menu-controller'
import { createMenuDom } from '@fex-design/core/menu/create-menu-dom'
import type { MenuOptions } from '@fex-design/core/menu/types'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
export function useMenu(source: MaybeRefOrGetter<MenuOptions> = {}) {
  const controller = createMenuController(toValue(source))
  const dom = createMenuDom(controller)
  const snapshot = useCoreStore(controller)
  // Reactive configuration synchronizes the external core controller.
  watchEffect(
    () => {
      controller.setOptions(toValue(source))
      dom.refresh()
    },
    { flush: 'post' },
  )
  onScopeDispose(() => dom.destroy())
  return { controller, dom, snapshot }
}
