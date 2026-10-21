import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { paginationContentClassName } from '@fex-design/components-styles/pagination'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[paginationContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'pagination-content' },
  template: '<ng-content />',
})
export class PaginationContent {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName(paginationContentClassName, () =>
    this.class(),
  )
}
