import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
} from '@fex-design/angular/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
@Component({
  selector: 'pagination-basic-example',
  standalone: true,
  imports: [
    PaginationRoot,
    PaginationContent,
    PaginationPageButton,
    PaginationNavigationButton,
    PaginationEllipsis,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class PaginationBasicExample {
  readonly labels = paginationDemoLabels
}
