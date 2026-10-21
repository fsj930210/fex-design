import { createSelectController } from '@fex-design/core/select/create-select-controller'
import { filterSelectOptions } from '@fex-design/core/select/filter-options'
import type {
  SelectFilterOption,
  SelectOption,
  SelectSnapshot,
  SelectVirtualOptions,
} from '@fex-design/core/select/types'
import { createSelectionController } from '@fex-design/core/selection/create-selection-controller'
import type { SelectionValue } from '@fex-design/core/selection/types'
import type { PopoverOptions } from '@fex-design/core/popover/types'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
  type OnChanges,
  type OnInit,
  type SimpleChanges,
  type Signal,
} from '@angular/core'
import { createCoreStoreSignalBinding } from '@fex-design/angular/signals/core-store-signal'
import { Popover } from '@fex-design/angular/primitive/popover'

export interface SelectChangeMeta {
  selectedItem?: SelectOption | undefined
  selectedItems: SelectOption[]
  previousSelectedValues: SelectionValue[]
  changedValues: SelectionValue[]
}
@Component({
  selector: 'div[selectRoot]',
  standalone: true,
  providers: [Popover],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
})
export class SelectRoot implements OnChanges, OnInit {
  private readonly popover = inject(Popover)
  private readonly destroyRef = inject(DestroyRef)
  private readonly optionsState = signal<readonly SelectOption[]>([])
  private readonly loadingState = signal(false)
  @Input()
  set options(value: readonly SelectOption[]) {
    this.optionsState.set(value)
  }
  get options() {
    return this.optionsState()
  }
  @Input() multiple = false
  @Input() value: SelectionValue | SelectionValue[] | undefined
  @Input() defaultValue: SelectionValue | SelectionValue[] | undefined
  @Input() showSearch = false
  @Input() filterOption: SelectFilterOption | undefined
  @Input() open: boolean | undefined
  @Input() defaultOpen = false
  @Input() clearable = false
  @Input()
  set loading(value: boolean) {
    this.loadingState.set(value)
  }
  get loading() {
    return this.loadingState()
  }
  @Input() disabled = false
  @Input() popoverProps: PopoverOptions = {}
  @Input() virtual: SelectVirtualOptions | undefined
  @Input() maxCount: number | undefined
  @Input('aria-invalid') ariaInvalid: string | boolean | null | undefined
  @Input('data-warning') dataWarning: string | null | undefined
  @Output() readonly change = new EventEmitter<{
    value: SelectionValue | SelectionValue[] | undefined
    meta: SelectChangeMeta
  }>()
  @Output() readonly openChange = new EventEmitter<boolean>()
  @Output() readonly search = new EventEmitter<string>()
  selection!: ReturnType<typeof createSelectionController>
  controller!: ReturnType<typeof createSelectController>
  snapshot!: Signal<SelectSnapshot>
  private refreshSnapshot!: () => void
  readonly listId = `select-${crypto.randomUUID()}`
  ngOnInit() {
    // The controller getters intentionally capture the component instance for live signal inputs.
    // oxlint-disable-next-line typescript/no-this-alias
    const root = this
    this.selection = createSelectionController({
      get value() {
        return root.value
      },
      get defaultValue() {
        return root.defaultValue
      },
      get multiple() {
        return root.isMultiple
      },
      get disabledValues() {
        return root.options.filter((option) => option.disabled).map((option) => option.value)
      },
      onChange(values, meta) {
        const resolve = (value: SelectionValue) =>
          root.options.find((option) => option.value === value) ?? { value, label: String(value) }
        const selectedItems = values.map(resolve)
        const selectedItem =
          meta.changedValues.map(resolve).find((item) => values.includes(item.value)) ??
          selectedItems[0]
        root.change.emit({
          value: root.isMultiple ? values : values[0],
          meta: {
            selectedItem,
            selectedItems,
            previousSelectedValues: [...meta.previousValues],
            changedValues: [...meta.changedValues],
          },
        })
      },
    })
    let controller!: ReturnType<typeof createSelectController>
    controller = createSelectController({
      get disabled() {
        return root.disabled
      },
      selection: this.selection,
      get options() {
        return filterSelectOptions(
          root.options,
          controller.getSnapshot().searchValue,
          root.filterOption,
        )
      },
      get multiple() {
        return root.isMultiple
      },
      get maxCount() {
        return root.maxCount
      },
      get open() {
        return root.open
      },
      get defaultOpen() {
        return root.defaultOpen
      },
      onOpenChange: (next) => {
        root.popover.syncOptions()
        root.openChange.emit(next)
      },
      onSearch: (keyword) => root.search.emit(keyword),
    })
    this.controller = controller
    const binding = createCoreStoreSignalBinding(controller, this.destroyRef)
    this.snapshot = binding.snapshot
    this.refreshSnapshot = binding.refresh

    this.popover.connectOptions(() => ({
      ...this.popoverProps,
      open: this.snapshot().open,
      defaultOpen: this.defaultOpen,
      disabled: this.disabled,
    }))
    this.refreshSnapshot()
    this.popover.syncOptions()
    const subscription = this.popover.openChange.subscribe((next) => this.syncOpen(next))
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
  ngOnChanges(_changes: SimpleChanges) {
    if (!this.controller) return
    this.refreshSnapshot()
    this.popover.syncOptions()
  }
  get isMultiple() {
    return this.multiple
  }
  get canSearch() {
    return this.showSearch
  }
  get visibleOptions() {
    return filterSelectOptions(this.options, this.snapshot().searchValue, this.filterOption)
  }
  get selectedOptions() {
    this.snapshot()
    return this.selection
      .getSnapshot()
      .values.map(
        (value) =>
          this.options.find((option) => option.value === value) ?? { value, label: String(value) },
      )
  }
  syncOpen(next: boolean) {
    if (next) this.controller.open()
    else this.controller.close()
  }
  removeValue(value: SelectionValue) {
    if (!this.disabled) this.selection.unselect(value)
  }
}
