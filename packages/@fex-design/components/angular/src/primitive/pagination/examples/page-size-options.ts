import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
} from '@fex-design/angular/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
@Component({
  selector: 'pagination-page-size-options-example',
  standalone: true,
  imports: [
    PaginationRoot,
    PaginationContent,
    PaginationPageButton,
    PaginationNavigationButton,
    PaginationEllipsis,
    PaginationPageSizeSelect,
    PaginationQuickJumper,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page-size-options.html',
})
export class PaginationPageSizeOptionsExample {
  readonly labels = paginationDemoLabels
  readonly totalClass = paginationTotalClassName
  readonly jumperClass = paginationJumperGroupClassName
}
