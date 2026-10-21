import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Pagination } from '@fex-design/angular/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'pagination-hide-on-single-page-example',
  standalone: true,
  imports: [Pagination, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hide-on-single-page.html',
})
export class PaginationHideOnSinglePageExample {
  readonly labels = paginationDemoLabels
  readonly total = signal(5)
}
