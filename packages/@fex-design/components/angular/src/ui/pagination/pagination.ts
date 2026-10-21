import type { InputVariant } from '@fex-design/core/input/types'
import type {
  PaginationPart,
  PaginationClassNames,
  PaginationStyles,
} from '@fex-design/core/pagination/types'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { cn } from '@fex-design/utils'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import type { NativeAttributes } from '@fex-design/angular/directives/native-attributes'
import {
  paginationRootClassName,
  paginationTotalClassName,
  paginationSimpleClassName,
  paginationJumperGroupClassName,
  paginationHideOnSinglePageClassName,
} from '@fex-design/components-styles/pagination'
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
  PaginationState,
  type PaginationSnapshot,
  type PaginationSelectRootOptions,
} from '@fex-design/angular/primitive/pagination'

export interface PaginationTotalContext {
  $implicit: PaginationSnapshot
  snapshot: PaginationSnapshot
}
export interface PaginationPageContext {
  $implicit: number
  page: number
  current: boolean
}

@Component({
  host: { '[style]': 'styles()?.root ?? null' },
  selector: 'nav[pagination]',
  exportAs: 'pagination',
  standalone: true,
  providers: [PaginationState],
  imports: [
    NgTemplateOutlet,
    PaginationContent,
    PaginationPageButton,
    PaginationNavigationButton,
    PaginationEllipsis,
    PaginationPageSizeSelect,
    PaginationQuickJumper,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.html',
})
export class Pagination extends PaginationRoot {
  readonly classNames = input<PaginationClassNames>()
  readonly styles = input<PaginationStyles<string>>()
  readonly showTotal = input(false, { transform: booleanAttribute })
  readonly showSizeChanger = input(false, { transform: booleanAttribute })
  readonly pageSizeOptions = input<readonly number[]>()
  readonly showQuickJumper = input(false, { transform: booleanAttribute })
  readonly simple = input(false, { transform: booleanAttribute })
  readonly hideOnSinglePage = input(false, { transform: booleanAttribute })
  readonly pageSizeSelectProps = input<{
    selectRootProps?: PaginationSelectRootOptions | undefined
    disabled?: boolean
    class?: string
    style?: string
    inputProps?: Record<string, unknown>
    selectTriggerProps?: Pick<NativeAttributes, 'class' | 'style'> | undefined
    selectContentProps?: Pick<NativeAttributes, 'class' | 'style'> | undefined
  }>()
  readonly quickJumperProps = input<{
    disabled?: boolean
    class?: string
    style?: string
    inputProps?: NativeAttributes
    inputActionsProps?: Pick<NativeAttributes, 'class' | 'style'> | undefined
    incrementProps?: Pick<NativeAttributes, 'class' | 'style'> | undefined
    decrementProps?: Pick<NativeAttributes, 'class' | 'style'> | undefined
    inputNumberProps?:
      | (Pick<NativeAttributes, 'class' | 'style'> & { variant?: InputVariant | undefined })
      | undefined
  }>()
  readonly totalTemplate = contentChild<TemplateRef<PaginationTotalContext>>('total')
  readonly pageTemplate = contentChild<TemplateRef<PaginationPageContext>>('page')
  readonly previousTemplate = contentChild<TemplateRef<unknown>>('previous')
  readonly nextTemplate = contentChild<TemplateRef<unknown>>('next')
  readonly ellipsisTemplate = contentChild<TemplateRef<unknown>>('ellipsis')
  protected override readonly hostClassName = createHostClassName(
    () =>
      cn(
        paginationRootClassName({ size: this.size() }),
        this.hideOnSinglePage() && paginationHideOnSinglePageClassName,
        this.classNames()?.root,
      ),
    () => this.class(),
  )
  readonly totalClassName = paginationTotalClassName
  readonly simpleClassName = paginationSimpleClassName
  readonly jumperClassName = paginationJumperGroupClassName
  partClass(part: PaginationPart, base?: string, extra?: string) {
    return cn(base, this.classNames()?.[part], extra)
  }
  partStyle(part: PaginationPart, extra?: string) {
    return [this.styles()?.[part], extra].filter(Boolean).join(';')
  }
  readonly displayedPage = computed(() =>
    this.snapshot().pageCount === 0 ? 0 : this.snapshot().page,
  )
}
