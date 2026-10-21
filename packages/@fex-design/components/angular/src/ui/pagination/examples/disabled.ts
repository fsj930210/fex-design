import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Pagination } from '@fex-design/angular/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
@Component({
  selector: 'pagination-disabled-example',
  standalone: true,
  imports: [Pagination],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disabled.html',
})
export class PaginationDisabledExample {
  readonly labels = paginationDemoLabels
}
