import { ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, input, viewChild } from '@angular/core'
import type { ScrollbarPart } from '@fex-design/core/scrollbar/types'
import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import { ScrollbarRoot, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner } from '../../primitive/scrollbar'
import { ScrollbarViewport } from './scrollbar-viewport'
import { scrollbarAppearance, type ScrollbarStyle } from './context'

@Component({
  selector: 'div[scrollbar]', standalone: true,
  exportAs: 'scrollbar',
  imports: [ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner],
  providers: [
    { provide: ScrollbarRoot, useExisting: forwardRef(() => Scrollbar) },
    { provide: scrollbarAppearance, useExisting: forwardRef(() => Scrollbar) },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'scrollbar-root' },
  templateUrl: './scrollbar.html',
})
export class Scrollbar extends ScrollbarRoot {
  readonly classNames = input<Partial<Record<ScrollbarPart, string>>>()
  readonly styles = input<Partial<Record<ScrollbarPart, ScrollbarStyle>>>()
  protected readonly axes = ['x', 'y'] as const
  protected readonly resolved = computed(() => resolveScrollbarOverflow(this.projectedViewport()?.overflow(), this.overflow()))
  private readonly projectedViewport = contentChild(ScrollbarViewport)
  private readonly defaultViewport = viewChild(ScrollbarViewport)
  readonly viewportElement = computed(() => (this.projectedViewport() ?? this.defaultViewport())?.element)
}
