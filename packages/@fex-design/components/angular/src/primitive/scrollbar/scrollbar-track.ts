import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core'
import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarTrackClassName } from '@fex-design/components-styles/scrollbar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[scrollbarTrack]',
  standalone: true,
  exportAs: 'scrollbarTrack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'scrollbar-track',
    '[attr.data-axis]': 'axis()',
    '[class]': 'hostClassName()',
  },
  template: '<ng-content />',
})
export class ScrollbarTrack {
  readonly class = input<string>()
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly axis = input.required<ScrollbarAxis>()
  protected readonly hostClassName = createHostClassName(scrollbarTrackClassName, () =>
    this.class(),
  )
}
