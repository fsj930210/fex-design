import {
  DestroyRef,
  effect,
  inject,
  Injector,
  runInInjectionContext,
  untracked,
} from '@angular/core'
import {
  createPopover as createCorePopover,
  type PopoverController,
} from '@fex-design/core/popover/create-popover'
import type { PopoverOptions } from '@fex-design/core/popover/types'
import { createCoreStoreSignal } from '../../signals/core-store-signal'

/** Angular adapter for custom templates; initialize after inputs are available. */
export function createPopover(
  options: () => PopoverOptions,
  parent?: () => PopoverController | undefined,
) {
  const injector = inject(Injector)
  let controller: PopoverController | undefined
  let readSnapshot:
    | ReturnType<typeof createCoreStoreSignal<ReturnType<PopoverController['getSnapshot']>>>
    | undefined
  function instance() {
    if (!controller) {
      controller = createCorePopover(options(), parent?.())
      const store = controller
      readSnapshot = runInInjectionContext(injector, () => createCoreStoreSignal(store))
    }
    return controller
  }
  // Angular input signals are an external boundary with the stable Core store.
  // Track only options, not subscriptions created while initializing Core.
  effect(() => {
    const next = options()
    untracked(() => instance().setOptions(next))
  })
  inject(DestroyRef).onDestroy(() => controller?.destroy())
  return {
    get overlay() {
      return instance()
    },
    snapshot() {
      instance()
      return readSnapshot!()
    },
  }
}
