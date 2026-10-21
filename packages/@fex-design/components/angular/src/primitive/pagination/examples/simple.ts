import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  PaginationRoot,
  PaginationContent,
  PaginationNavigationButton,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
} from '@fex-design/angular/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationSimpleClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
@Component({
  selector: 'pagination-simple-example',
  standalone: true,
  imports: [
    PaginationRoot,
    PaginationContent,
    PaginationNavigationButton,
    PaginationPageSizeSelect,
    PaginationQuickJumper,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './simple.html',
})
export class PaginationSimpleExample {
  readonly labels = paginationDemoLabels
  readonly totalClass = paginationTotalClassName
  readonly simpleClass = paginationSimpleClassName
  readonly jumperClass = paginationJumperGroupClassName
}
