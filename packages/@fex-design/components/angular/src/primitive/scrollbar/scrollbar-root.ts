import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core'
import type { ScrollbarRootOptions, ScrollbarScrollDetail } from '@fex-design/core/scrollbar/types'
import { scrollbarRootClassName } from '@fex-design/components-styles/scrollbar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { createScrollbar } from './create-scrollbar'

@Component({
  selector: 'div[scrollbarRoot]',
  standalone: true,
  exportAs: 'scrollbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'scrollbar-root',
    '[attr.data-show-track]': 'showTrack()',
    '[attr.data-show-corner]': 'showCorner() ?? showTrack()',
    '[class]': 'hostClassName()',
  },
  template: '<ng-content />',
})
export class ScrollbarRoot {
  readonly class = input<string>()
  readonly showTrack = input(false, { transform: booleanAttribute })
  readonly showCorner = input<boolean | undefined, unknown>(undefined, {
    transform: (value) => (value === undefined ? undefined : booleanAttribute(value)),
  })
  readonly overflow = input<ScrollbarRootOptions['overflow']>()
  readonly visibility = input<ScrollbarRootOptions['visibility']>()
  readonly autoHide = input<ScrollbarRootOptions['autoHide']>()
  readonly autoHideDelay = input<ScrollbarRootOptions['autoHideDelay']>()
  readonly dragScroll = input<ScrollbarRootOptions['dragScroll']>()
  readonly clickScroll = input<ScrollbarRootOptions['clickScroll']>()
  readonly minThumbSize = input<ScrollbarRootOptions['minThumbSize']>()
  readonly disabled = input<ScrollbarRootOptions['disabled']>()
  readonly scrollChange = output<ScrollbarScrollDetail>()
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  protected readonly hostClassName = createHostClassName(scrollbarRootClassName, () => this.class())
  readonly controller = createScrollbar(
    () => ({
      visibility: this.visibility(),
      autoHide: this.autoHide(),
      autoHideDelay: this.autoHideDelay(),
      dragScroll: this.dragScroll(),
      clickScroll: this.clickScroll(),
      minThumbSize: this.minThumbSize(),
      disabled: this.disabled(),
      onScroll: (detail) => this.scrollChange.emit(detail),
    }),
    () => this.element,
  ).controller
}
