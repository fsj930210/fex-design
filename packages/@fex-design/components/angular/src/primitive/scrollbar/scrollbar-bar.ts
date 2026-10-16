import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core'
import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarBarClassName } from '@fex-design/components-styles/scrollbar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[scrollbarBar]', standalone: true,
  exportAs: 'scrollbarBar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'scrollbar-bar', '[attr.data-axis]': 'axis()', 'data-visible': 'false', '[class]': 'hostClassName()' },
  template: '<ng-content />',
})
export class ScrollbarBar {
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly axis = input.required<ScrollbarAxis>()
  protected readonly hostClassName = createHostClassName(() => scrollbarBarClassName({ axis: this.axis() }))
}
