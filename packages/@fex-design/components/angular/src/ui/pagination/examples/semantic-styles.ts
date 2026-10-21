import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Pagination, type PaginationStyles } from '@fex-design/angular/ui/pagination'
import {
  paginationDemoLabels,
  paginationDemoClassNames,
} from '@fex-design/docs-shared/pagination-demo'
@Component({
  selector: 'pagination-semantic-styles-example',
  standalone: true,
  imports: [Pagination],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class PaginationSemanticStylesExample {
  readonly labels = paginationDemoLabels
  readonly classNames = paginationDemoClassNames
  readonly styles: PaginationStyles<string> = {
    root: 'background-color:#faf5ff',
    total: 'color:#6d28d9',
    content: 'column-gap:6px',
    pageButton: 'border-color:#c4b5fd',
    navigationButton: 'color:#6d28d9',
    ellipsis: 'color:#8b5cf6',
    simple: 'color:#6d28d9',
    pageSizeSelect: 'min-width:128px',
    jumper: 'color:#6d28d9',
    quickJumper: 'width:96px',
  }
}
