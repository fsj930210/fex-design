import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
import type { PaginationDirection } from '@fex-design/core/pagination/types'
import { ChevronLeftIcon } from '@fex-design/angular/icons/chevron-left'
import { ChevronRightIcon } from '@fex-design/angular/icons/chevron-right'
import { paginationButtonClassName } from '@fex-design/components-styles/pagination'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { PaginationState } from './pagination-state'
import { listenNativeEvent } from '@fex-design/angular/directives/listen-native-event'

@Component({
  selector: 'button[paginationNavigationButton]',
  standalone: true,
  imports: [ChevronLeftIcon, ChevronRightIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    type: 'button',
    '[disabled]': 'blocked()',
    '[attr.aria-label]':
      "direction() === 'prev' ? state.snapshot().labels.previous : state.snapshot().labels.next",
    'data-slot': 'pagination-navigation-button',
    '[attr.data-direction]': 'direction()',
  },
  templateUrl: './pagination-navigation-button.html',
})
export class PaginationNavigationButton {
  readonly class = input<string>()
  readonly direction = input.required<PaginationDirection>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly state = inject(PaginationState)
  protected readonly hostClassName = createHostClassName(
    () => paginationButtonClassName({ size: this.state.size() }),
    () => this.class(),
  )
  readonly blocked = computed(
    () =>
      this.disabled() ||
      !(this.direction() === 'prev'
        ? this.state.snapshot().canPrevious
        : this.state.snapshot().canNext),
  )
  constructor() {
    listenNativeEvent('click', (event) => this.click(event))
  }
  click(event: MouseEvent) {
    if (event.defaultPrevented || this.blocked()) return
    if (this.direction() === 'prev') this.state.controller.previousPage()
    else this.state.controller.nextPage()
  }
}
