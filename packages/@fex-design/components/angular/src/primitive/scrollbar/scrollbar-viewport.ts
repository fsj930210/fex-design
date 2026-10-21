import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core'
import type { ScrollbarOverflow } from '@fex-design/core/scrollbar/types'
import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import { scrollbarViewportClassName } from '@fex-design/components-styles/scrollbar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { ScrollbarRoot } from './scrollbar-root'

@Component({
  selector: 'div[scrollbarViewport]',
  standalone: true,
  exportAs: 'scrollbarViewport',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'scrollbar-viewport', '[class]': 'hostClassName()' },
  template: '<ng-content />',
})
export class ScrollbarViewport {
  readonly class = input<string>()
  readonly overflow = input<ScrollbarOverflow>()
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  private readonly root = inject(ScrollbarRoot, { optional: true })
  private readonly resolved = computed(() =>
    resolveScrollbarOverflow(this.overflow(), this.root?.overflow()),
  )
  protected readonly hostClassName = createHostClassName(
    () =>
      scrollbarViewportClassName({ overflowX: this.resolved().x, overflowY: this.resolved().y }),
    () => this.class(),
  )
}
