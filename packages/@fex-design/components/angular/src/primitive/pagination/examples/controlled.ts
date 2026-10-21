import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
  type PaginationValue,
  type PaginationChangeDetails,
} from '@fex-design/angular/primitive/pagination'
import {
  paginationDemoLabels,
  paginationDemoInitialChange,
  formatPaginationDemoChange,
} from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'pagination-controlled-example',
  standalone: true,
  imports: [
    PaginationRoot,
    PaginationContent,
    PaginationPageButton,
    PaginationNavigationButton,
    PaginationEllipsis,
    PaginationPageSizeSelect,
    PaginationQuickJumper,
    Button,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controlled.html',
})
export class PaginationControlledExample {
  readonly labels = paginationDemoLabels
  readonly totalClass = paginationTotalClassName
  readonly jumperClass = paginationJumperGroupClassName
  readonly total = signal(200)
  readonly value = signal({ page: 3, pageSize: 10 })
  readonly lastChange = signal(paginationDemoInitialChange)
  change(event: { value: PaginationValue; details: PaginationChangeDetails }) {
    this.value.set(event.value)
    this.lastChange.set(formatPaginationDemoChange(event.value, event.details))
  }
  setPage() {
    this.value.update((value) => ({ ...value, page: 5 }))
  }
  setPageSize() {
    this.value.set({ page: 1, pageSize: 20 })
  }
  reset() {
    this.value.set({ page: 3, pageSize: 10 })
    this.total.set(200)
    this.lastChange.set('已从外部重置')
  }
}
