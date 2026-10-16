import { createEffect, createSignal, onCleanup, untrack } from 'solid-js'
import { createScrollbarController } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import type { ScrollbarOptions } from '@fex-design/core/scrollbar/types'

/** Standalone reactive primitive; ref callbacks can replace custom Root elements. */
export function createScrollbar(options: () => ScrollbarOptions = () => ({})) {
  const controller = createScrollbarController()
  const [root, setRoot] = createSignal<HTMLElement>()
  // Only prop access is tracked; Core owns imperative DOM state and subscriptions.
  createEffect(() => {
    const next = { ...options() }
    untrack(() => controller.setOptions(next))
  })
  // Resolve native ref changes after rendering; effect cleanup releases the old Root.
  createEffect(() => {
    const element = root()
    if (element) onCleanup(untrack(() => {
      controller.setOptions(options())
      return controller.connect(element)
    }))
  })
  onCleanup(() => controller.destroy())
  return { controller, rootRef: (element: HTMLElement) => { setRoot(element) } }
}
