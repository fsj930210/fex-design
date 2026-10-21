import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  paginationHideOnSinglePageClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'pagination-hide-on-single-page-example',
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
  templateUrl: './hide-on-single-page.html',
})
export class PaginationHideOnSinglePageExample {
  readonly labels = paginationDemoLabels
  readonly totalClass = paginationTotalClassName
  readonly jumperClass = paginationJumperGroupClassName
  readonly hiddenClass = paginationHideOnSinglePageClassName
  readonly cn = cn
  readonly total = signal(5)
}
