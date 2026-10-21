import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core'
import { scrollbarCornerClassName } from '@fex-design/components-styles/scrollbar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[scrollbarCorner]',
  standalone: true,
  exportAs: 'scrollbarCorner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'scrollbar-corner', '[class]': 'hostClassName()' },
  template: '<ng-content />',
})
export class ScrollbarCorner {
  readonly class = input<string>()
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  protected readonly hostClassName = createHostClassName(scrollbarCornerClassName, () =>
    this.class(),
  )
}
