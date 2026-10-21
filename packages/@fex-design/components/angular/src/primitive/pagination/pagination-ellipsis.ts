import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { MoreIcon } from '@fex-design/angular/icons/more'
import { paginationEllipsisClassName } from '@fex-design/components-styles/pagination'
import { PaginationState } from './pagination-state'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'span[paginationEllipsis]',
  standalone: true,
  imports: [MoreIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'aria-hidden': 'true', 'data-slot': 'pagination-ellipsis' },
  templateUrl: './pagination-ellipsis.html',
})
export class PaginationEllipsis {
  readonly class = input<string>()
  readonly state = inject(PaginationState)
  protected readonly hostClassName = createHostClassName(
    () => paginationEllipsisClassName({ size: this.state.size() }),
    () => this.class(),
  )
}
