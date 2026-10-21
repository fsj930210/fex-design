import type { NativeAttributes } from '@fex-design/angular/directives/native-attributes'
import { cn } from '@fex-design/utils'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
import { getPaginationPageSizes } from '@fex-design/core/pagination/pagination-range'
import type { SelectionValue } from '@fex-design/core/selection/types'
import {
  paginationPageSizeSelectClassName,
  paginationSelectTriggerClassName,
} from '@fex-design/components-styles/pagination'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { SelectRoot, SelectTrigger, SelectContent } from '../select'
import { PaginationState } from './pagination-state'

export type PaginationSelectRootOptions = Partial<
  Pick<
    SelectRoot,
    | 'showSearch'
    | 'filterOption'
    | 'open'
    | 'defaultOpen'
    | 'loading'
    | 'popoverProps'
    | 'virtual'
    | 'maxCount'
  >
> &
  Pick<NativeAttributes, 'class' | 'style'>

@Component({
  selector: 'div[paginationPageSizeSelect]',
  standalone: true,
  imports: [SelectRoot, SelectTrigger, SelectContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'pagination-page-size-select' },
  templateUrl: './pagination-page-size-select.html',
})
export class PaginationPageSizeSelect {
  readonly selectRootProps = input<PaginationSelectRootOptions>()
  readonly selectTriggerProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly selectContentProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly class = input<string>()
  readonly options = input<readonly number[]>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly inputProps = input<Record<string, unknown>>({})
  readonly state = inject(PaginationState)
  protected readonly hostClassName = createHostClassName(paginationPageSizeSelectClassName, () =>
    this.class(),
  )
  readonly triggerClassName = computed(() =>
    cn(
      paginationSelectTriggerClassName({ size: this.state.size() }),
      this.selectTriggerProps()?.class,
    ),
  )
  readonly items = computed(() =>
    getPaginationPageSizes(this.state.snapshot().pageSize, this.options()).map((value) => ({
      value,
      label: this.state.snapshot().labels.pageSizeOption(value),
    })),
  )
  readonly resolvedInputProps = computed(() => ({
    'aria-label': this.state.snapshot().labels.pageSize,
    ...this.inputProps(),
  }))
  change(value: SelectionValue | SelectionValue[] | undefined) {
    if (typeof value === 'number') this.state.controller.setPageSize(value)
  }
}
