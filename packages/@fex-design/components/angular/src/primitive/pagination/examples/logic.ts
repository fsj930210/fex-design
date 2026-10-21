import { ChangeDetectionStrategy, Component } from '@angular/core'
import { usePagination } from '@fex-design/angular/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

@Component({
  selector: 'pagination-use-pagination-example',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './logic.html',
})
export class PaginationUsePaginationExample {
  readonly pagination = usePagination({ total: 200, defaultPage: 3, labels: paginationDemoLabels })
  readonly pageSizeOptions = [10, 20, 50, 100]
  jump = ''
  submitJump() {
    const page = Number(this.jump)
    if (Number.isInteger(page) && page > 0) this.pagination.controller.setPage(page, 'jump')
    this.jump = ''
  }
}
