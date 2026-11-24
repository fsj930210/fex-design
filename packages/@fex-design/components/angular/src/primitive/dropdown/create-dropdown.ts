import {
  DestroyRef,
  effect,
  inject,
  Injector,
  runInInjectionContext,
  untracked,
} from '@angular/core'
import { createDropdown as createCoreDropdown } from '@fex-design/core/dropdown/create-dropdown'
import type { DropdownOptions } from '@fex-design/core/dropdown/types'
import type { PopoverController } from '@fex-design/core/popover/create-popover'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'

/** Angular adapter for consumers that supply their own hosts. */
export function createDropdown(
  options: () => DropdownOptions,
  parent?: () => PopoverController | undefined,
) {
  const injector = inject(Injector)
  let controller: ReturnType<typeof createCoreDropdown> | undefined
  let overlaySnapshot:
    | ReturnType<typeof createCoreStoreSignal<ReturnType<PopoverController['getSnapshot']>>>
    | undefined
  let menuSnapshot:
    | ReturnType<
        typeof createCoreStoreSignal<
          ReturnType<ReturnType<typeof createCoreDropdown>['menu']['getSnapshot']>
        >
      >
    | undefined
  function instance() {
    if (!controller) {
      controller = createCoreDropdown(options(), parent?.())
      const current = controller
      runInInjectionContext(injector, () => {
        overlaySnapshot = createCoreStoreSignal(current.overlay)
        menuSnapshot = createCoreStoreSignal(current.menu)
      })
    }
    return controller
  }
  // Angular signal inputs are the external configuration boundary.
  effect(() => {
    const next = options()
    untracked(() => instance().setOptions(next))
  })
  inject(DestroyRef).onDestroy(() => controller?.destroy())
  return {
    get controller() {
      return instance()
    },
    snapshot() {
      instance()
      return overlaySnapshot!()
    },
    menuSnapshot() {
      instance()
      return menuSnapshot!()
    },
    syncOptions() {
      instance().setOptions(options())
    },
  }
}
