import { onScopeDispose, shallowRef, watch } from 'vue'
import { createScrollbarController } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import type { ScrollbarOptions } from '@fex-design/core/scrollbar/types'

/** Standalone composable; DOM refs and options synchronize after Vue commits. */
export function useScrollbar(options: () => ScrollbarOptions = () => ({})) {
  const controller = createScrollbarController()
  const root = shallowRef<HTMLElement | null>(null)
  // Synchronize the external controller, preserving its identity and listeners.
  watch(() => ({ ...options() }), (next) => controller.setOptions(next), { immediate: true, flush: 'post' })
  // Template refs may be replaced by conditional markup; invalidate the old connection.
  watch(root, (element, _, onCleanup) => {
    if (element) onCleanup(controller.connect(element))
  }, { flush: 'post' })
  onScopeDispose(() => controller.destroy())
  return { controller, root }
}
