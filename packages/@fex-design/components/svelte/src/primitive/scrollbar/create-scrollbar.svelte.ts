import { onDestroy, untrack } from 'svelte'
import { createScrollbarController } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import type { ScrollbarOptions } from '@fex-design/core/scrollbar/types'

/** Standalone rune adapter; root is an action for native custom markup. */
export function createScrollbar(options: () => ScrollbarOptions = () => ({})) {
  const controller = createScrollbarController()
  // Props synchronize to the external DOM controller after Svelte commits.
  // Svelte disposes this effect; the action and onDestroy release DOM listeners.
  $effect(() => {
    const next = { ...options() }
    untrack(() => controller.setOptions(next))
  })
  onDestroy(() => controller.destroy())
  return {
    controller,
    root(element: HTMLElement) {
      // Actions can run before the first prop effect; connect with current options.
      controller.setOptions(untrack(options))
      return { destroy: controller.connect(element) }
    },
  }
}
