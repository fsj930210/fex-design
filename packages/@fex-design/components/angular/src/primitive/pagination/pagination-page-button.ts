import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
import { paginationButtonClassName } from '@fex-design/components-styles/pagination'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { PaginationState } from './pagination-state'
import { listenNativeEvent } from '@fex-design/angular/directives/listen-native-event'

@Component({
  selector: 'button[paginationPageButton]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    type: 'button',
    '[disabled]': 'blocked()',
    '[attr.aria-label]': 'state.snapshot().labels.page(page())',
    '[attr.aria-current]': "page() === state.snapshot().page ? 'page' : null",
    '[attr.data-active]': 'page() === state.snapshot().page || null',
    'data-slot': 'pagination-page-button',
  },
  templateUrl: './pagination-page-button.html',
})
export class PaginationPageButton {
  readonly class = input<string>()
  readonly page = input.required<number>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly state = inject(PaginationState)
  protected readonly hostClassName = createHostClassName(
    () => paginationButtonClassName({ size: this.state.size() }),
    () => this.class(),
  )
  readonly blocked = computed(
    () =>
      this.disabled() ||
      this.state.snapshot().disabled ||
      !Number.isInteger(this.page()) ||
      this.page() < 1 ||
      this.page() > this.state.snapshot().pageCount,
  )
  constructor() {
    listenNativeEvent('click', (event) => this.click(event))
  }
  click(event: MouseEvent) {
    if (!event.defaultPrevented && !this.blocked()) this.state.controller.setPage(this.page())
  }
}
