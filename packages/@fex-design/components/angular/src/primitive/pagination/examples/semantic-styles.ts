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
import {
  paginationDemoLabels,
  paginationDemoClassNames,
} from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationSimpleClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'

@Component({
  selector: 'pagination-semantic-styles-example',
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
  templateUrl: './semantic-styles.html',
})
export class PaginationSemanticStylesExample {
  readonly labels = paginationDemoLabels
  readonly classNames = paginationDemoClassNames
  readonly styles = {
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
  readonly pageSizeProps = {
    selectTriggerProps: {
      style:
        'border-color:#c4b5fd;color:#6d28d9;background-color:#ffffff;border-radius:6px;--focus-border:#8b5cf6;--input-ring-width:1px;--input-ring-color:#ddd6fe',
    },
    selectContentProps: {
      style:
        'border-color:#c4b5fd;color:#6d28d9;background-color:#ffffff;border-radius:6px;--focus-border:#8b5cf6;--input-ring-width:1px;--input-ring-color:#ddd6fe;--primary:#6d28d9;--muted-background:#f5f3ff',
    },
  }
  readonly jumperProps = {
    inputNumberProps: {
      style:
        'border-color:#c4b5fd;color:#6d28d9;background-color:#ffffff;border-radius:6px;--focus-border:#8b5cf6;--input-ring-width:1px;--input-ring-color:#ddd6fe',
    },
    inputProps: { style: 'color:#6d28d9' },
    incrementProps: { style: 'color:#6d28d9' },
    decrementProps: { style: 'color:#6d28d9' },
  }
  readonly cn = cn
  readonly totalClass = paginationTotalClassName
  readonly simpleClass = paginationSimpleClassName
  readonly jumperClass = paginationJumperGroupClassName
}
