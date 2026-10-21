import { afterRenderEffect, DestroyRef, inject, untracked } from '@angular/core'
import { createScrollbarController } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import type { ScrollbarOptions } from '@fex-design/core/scrollbar/types'

/** Initialize in an injection context; options and the native Root may be signals. */
export function createScrollbar(
  options: () => ScrollbarOptions,
  root: () => HTMLElement | undefined,
) {
  const controller = createScrollbarController()
  let connected: HTMLElement | undefined
  // The external controller reads geometry and writes DOM after Angular commits.
  // Browser-only render effects also keep SSR free of DOM subscriptions.
  afterRenderEffect(() => {
    const next = options()
    const element = root()
    untracked(() => {
      controller.setOptions(next)
      if (element !== connected) {
        controller.destroy()
        connected = element
        if (element) controller.connect(element)
      }
    })
  })
  inject(DestroyRef).onDestroy(() => controller.destroy())
  return { controller }
}
