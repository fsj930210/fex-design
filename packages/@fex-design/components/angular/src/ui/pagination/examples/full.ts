import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Pagination } from '@fex-design/angular/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
@Component({
  selector: 'pagination-full-example',
  standalone: true,
  imports: [Pagination],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './full.html',
})
export class PaginationFullExample {
  readonly labels = paginationDemoLabels
}
