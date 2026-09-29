import {
  DestroyRef,
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  untracked,
  ViewContainerRef,
  type EmbeddedViewRef,
} from '@angular/core'
import { Tooltip } from './tooltip-root'

@Directive({ selector: 'ng-template[tooltipPortal]', standalone: true })
export class TooltipPortal {
  readonly container = input<HTMLElement | null>()
  private readonly tooltip = inject(Tooltip)
  private readonly template = inject(TemplateRef<unknown>)
  private readonly views = inject(ViewContainerRef)
  private view: EmbeddedViewRef<unknown> | undefined
  constructor() {
    effect(() => {
      const mounted = this.tooltip.snapshot().mounted
      untracked(() => {
        if (!mounted) {
          this.views.clear()
          this.view = undefined
          return
        }
        if (!this.view) this.view = this.views.createEmbeddedView(this.template)
        const target = this.container() ?? this.tooltip.overlay.resolvePopupContainer()
        if (target)
          for (const node of this.view.rootNodes)
            if (node.parentNode !== target) target.appendChild(node)
      })
    })
    inject(DestroyRef).onDestroy(() => this.views.clear())
  }
}
