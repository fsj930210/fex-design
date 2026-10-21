import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core'
import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarThumbClassName } from '@fex-design/components-styles/scrollbar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[scrollbarThumb]',
  standalone: true,
  exportAs: 'scrollbarThumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'scrollbar-thumb',
    '[attr.data-axis]': 'axis()',
    '[class]': 'hostClassName()',
  },
  template: '<ng-content />',
})
export class ScrollbarThumb {
  readonly class = input<string>()
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly axis = input.required<ScrollbarAxis>()
  protected readonly hostClassName = createHostClassName(
    () => scrollbarThumbClassName({ axis: this.axis() }),
    () => this.class(),
  )
}
