import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  inject,
  input,
  output,
  TemplateRef,
  type OnChanges,
  type OnInit,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import type {
  PaginationSize,
  PaginationChangeDetails,
  PaginationLabels,
  PaginationValue,
  PaginationSnapshot,
} from '@fex-design/core/pagination/types'
import { paginationRootClassName } from '@fex-design/components-styles/pagination'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { PaginationState } from './pagination-state'

@Component({
  selector: 'nav[paginationRoot]',
  exportAs: 'paginationRoot',
  standalone: true,
  providers: [PaginationState],
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'pagination-root',
    '[attr.data-size]': 'size()',
    '[attr.data-page-count]': 'snapshot().pageCount',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.aria-label]': "labels()?.navigation ?? 'Pagination'",
  },
  template:
    '<ng-content />@if (contentTemplate(); as content) { <ng-container [ngTemplateOutlet]="content" [ngTemplateOutletContext]="{ $implicit: snapshot(), snapshot: snapshot() }" /> }',
})
export class PaginationRoot implements OnChanges, OnInit {
  readonly contentTemplate =
    contentChild<TemplateRef<{ $implicit: PaginationSnapshot; snapshot: PaginationSnapshot }>>(
      'content',
    )
  readonly class = input<string>()
  readonly size = input<PaginationSize>('md')
  readonly total = input(0)
  readonly page = input<number>()
  readonly defaultPage = input<number>()
  readonly pageSize = input<number>()
  readonly defaultPageSize = input<number>()
  readonly siblingCount = input<number>()
  readonly boundaryCount = input<number>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly labels = input<Partial<PaginationLabels>>()
  readonly change = output<{ value: PaginationValue; details: PaginationChangeDetails }>()
  readonly state = inject(PaginationState)
  readonly snapshot = this.state.snapshot
  protected readonly hostClassName = createHostClassName(
    () => paginationRootClassName({ size: this.size() }),
    () => this.class(),
  )
  get controller() {
    return this.state.controller
  }
  ngOnChanges() {
    this.syncOptions()
  }
  ngOnInit() {
    this.syncOptions()
  }
  private syncOptions() {
    this.state.size.set(this.size())
    this.state.setOptions({
      total: this.total(),
      page: this.page(),
      defaultPage: this.defaultPage(),
      pageSize: this.pageSize(),
      defaultPageSize: this.defaultPageSize(),
      siblingCount: this.siblingCount(),
      boundaryCount: this.boundaryCount(),
      disabled: this.disabled(),
      labels: this.labels(),
      onChange: (value, details) => this.change.emit({ value, details }),
    })
  }
}
