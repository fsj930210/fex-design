import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import { scrollbarViewportClassName } from '@fex-design/components-styles/scrollbar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { cn } from '@fex-design/utils'
import { ScrollbarRoot, ScrollbarViewport as PrimitiveViewport } from '../../primitive/scrollbar'
import { scrollbarAppearance } from './context'

/** Native projected viewports receive the same appearance as the automatic viewport. */
@Component({
  selector: 'div[scrollbarViewport]',
  standalone: true,
  exportAs: 'scrollbarViewport',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'scrollbar-viewport',
    '[class]': 'hostClassName()',
    '[style]': 'partStyle()',
  },
  template: '<ng-content />',
})
export class ScrollbarViewport extends PrimitiveViewport {
  private readonly appearance = inject(scrollbarAppearance, { optional: true })
  private readonly owner = inject(ScrollbarRoot, { optional: true })
  private readonly policy = computed(() =>
    resolveScrollbarOverflow(this.overflow(), this.owner?.overflow()),
  )
  protected override readonly hostClassName = createHostClassName(
    () =>
      cn(
        scrollbarViewportClassName({ overflowX: this.policy().x, overflowY: this.policy().y }),
        this.appearance?.classNames()?.viewport,
      ),
    () => this.class(),
  )
  protected readonly partStyle = computed(() => this.appearance?.styles()?.viewport)
}
