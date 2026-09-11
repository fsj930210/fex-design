import type { PopoverPortalOptions } from '@fex-design/core/popover/types'
import { DestroyRef, Directive, effect, inject, input, TemplateRef, untracked, ViewContainerRef, type EmbeddedViewRef } from '@angular/core'
import { Popover } from './popover-root'

/** TemplateRef is required so lazy content is not eagerly projected by Angular. */
@Directive({ selector: 'ng-template[popoverPortal]', standalone: true })
export class PopoverPortal {
  readonly container = input<PopoverPortalOptions['container']>()
  private readonly popover = inject(Popover)
  private readonly template = inject(TemplateRef<unknown>)
  private readonly views = inject(ViewContainerRef)
  private view: EmbeddedViewRef<unknown> | undefined

  constructor() {
    // Presence controls creation/destruction. Moving Angular-owned root nodes to
    // the portal container is the only framework-specific DOM operation here.
    effect(() => {
      const snapshot = this.popover.snapshot()
      const mounted = snapshot.mounted
      const container = this.container()
      untracked(() => {
        if (!mounted) {
          this.views.clear()
          this.view = undefined
          return
        }
        if (!this.view) this.view = this.views.createEmbeddedView(this.template)
        const target = container ?? snapshot.popupContainer
        if (target) {
          for (const node of this.view.rootNodes) {
            if (node.parentNode !== target) target.appendChild(node)
          }
        }
      })
    })
    inject(DestroyRef).onDestroy(() => this.views.clear())
  }
}
