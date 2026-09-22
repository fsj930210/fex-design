import { NgTemplateOutlet } from '@angular/common'
import {
  normalizeSelectOptions,
  type SelectFieldNames,
  type SelectItem,
} from '@fex-design/core/select/normalize-options'
import type {
  SelectFilterOption,
  SelectOption,
  SelectVirtualOptions,
} from '@fex-design/core/select/types'
import type { SelectionValue } from '@fex-design/core/selection/types'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core'
import {
  SelectContent,
  SelectList,
  SelectRoot,
  SelectTrigger,
  type SelectChangeMeta,
} from '@fex-design/angular/primitive/select'

export interface SelectInputProps {
  class?: string
  style?: string
  name?: string
  autocomplete?: string
  inputmode?: string
  'aria-label'?: string
}

export interface SelectPopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

@Component({
  selector: 'div[select]',
  standalone: true,
  imports: [NgTemplateOutlet, SelectRoot, SelectTrigger, SelectContent, SelectList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select.html',
})
export class Select<TItem extends object = SelectOption> {
  readonly options = input.required<readonly SelectItem<TItem>[]>()
  readonly fieldNames = input<SelectFieldNames<TItem>>(
    { value: 'value', label: 'label' } as SelectFieldNames<TItem>,
  )
  readonly value = input<SelectionValue | SelectionValue[]>()
  readonly defaultValue = input<SelectionValue | SelectionValue[]>()
  readonly multiple = input(false, { transform: booleanAttribute })
  readonly searchable = input(false, { transform: booleanAttribute })
  readonly clearable = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly loading = input(false, { transform: booleanAttribute })
  readonly placeholder = input('')
  readonly emptyText = input('No options')
  readonly maxCount = input<number>()
  readonly maxTagCount = input<number>()
  readonly virtual = input<SelectVirtualOptions>()
  readonly filterOption = input<SelectFilterOption>()
  readonly status = input<'error' | 'warning'>()
  readonly inputProps = input<SelectInputProps>({})
  readonly popoverProps = input<SelectPopoverProps>({})
  readonly change = output<{
    value: SelectionValue | SelectionValue[] | undefined
    meta: SelectChangeMeta
  }>()
  readonly search = output<string>()
  readonly openChange = output<boolean>()
  readonly prefix = contentChild<TemplateRef<void>>('prefix')
  readonly suffix = contentChild<TemplateRef<void>>('suffix')
  readonly clear = contentChild<TemplateRef<void>>('clear')
  readonly footer = contentChild<TemplateRef<void>>('footer')
  protected readonly normalizedOptions = computed(() =>
    normalizeSelectOptions(this.options(), this.fieldNames()),
  )
  protected handleOpenChange(open: boolean) {
    this.popoverProps().onOpenChange?.(open)
    this.openChange.emit(open)
  }
}

export type { SelectFieldNames, SelectFilterOption, SelectOption, SelectVirtualOptions }
