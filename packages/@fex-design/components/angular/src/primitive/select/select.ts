import { NgTemplateOutlet } from '@angular/common'
import { createSelectController } from '@fex-design/core/select/create-select-controller'
import { filterSelectOptions, groupSelectOptions } from '@fex-design/core/select/filter-options'
import { getSelectVirtualRange } from '@fex-design/core/select/virtual'
import type {
  SelectFilterOption,
  SelectOption,
  SelectSnapshot,
  SelectVirtualOptions,
} from '@fex-design/core/select/types'
import { createSelectionController } from '@fex-design/core/selection/create-selection-controller'
import type { SelectionValue } from '@fex-design/core/selection/types'
import {
  selectClearClassName,
  selectContentClassName,
  selectIndicatorClassName,
  selectInputClassName,
  selectListClassName,
  selectGroupLabelClassName,
  selectOptionClassName,
  selectOptionIndicatorClassName,
  selectOptionLabelClassName,
  selectSuffixClassName,
  selectTriggerClassName,
  selectValueClassName,
  selectValueContainerClassName,
} from '@fex-design/components-styles/select'
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DestroyRef,
  EventEmitter,
  HostListener,
  Input,
  type OnChanges,
  Output,
  type SimpleChanges,
  TemplateRef,
  forwardRef,
  inject,
  signal,
  type Signal,
} from '@angular/core'
import { CircleXIcon } from '@fex-design/angular/icons/circle-x'
import { Tag, TagAction } from '../tag/tag'
import { LoadingIcon } from '@fex-design/angular/icons/loading'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'
import { Button } from '../button/button'
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from '../popover/popover'

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
export class SelectRoot implements OnChanges {
  private readonly popover = inject(Popover)
  private readonly destroyRef = inject(DestroyRef)
  private readonly optionsState = signal<readonly SelectOption[]>([])
  private readonly loadingState = signal(false)
  @Input()
  set items(value: readonly SelectOption[]) {
    this.optionsState.set(value)
  }
  get items() {
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
  @Input() virtual: SelectVirtualOptions | undefined
  @Input() maxCount: number | undefined
  @Input() status: 'error' | 'warning' | undefined
  @Output() readonly change = new EventEmitter<{
    value: SelectionValue | SelectionValue[] | undefined
    meta: SelectChangeMeta
  }>()
  @Output() readonly openChange = new EventEmitter<boolean>()
  @Output() readonly search = new EventEmitter<string>()
  readonly selection: ReturnType<typeof createSelectionController>
  readonly controller: ReturnType<typeof createSelectController>
  readonly snapshot: Signal<SelectSnapshot>
  readonly listId = `select-${crypto.randomUUID()}`
  private defaultValueInitialized = false
  private suppressChange = false
  constructor() {
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
        return root.items.filter((item) => item.disabled).map((item) => item.value)
      },
      onChange(values, meta) {
        if (root.suppressChange) return
        const resolve = (value: SelectionValue) =>
          root.items.find((item) => item.value === value) ?? { value, label: String(value) }
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
      selection: this.selection,
      get options() {
        return filterSelectOptions(
          root.items,
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
    this.snapshot = createCoreStoreSignal(controller)

    this.popover.connectOptions(() => ({
      open: this.snapshot().open,
      defaultOpen: this.defaultOpen,
    }))
    this.popover.syncOptions()
    const subscription = this.popover.openChange.subscribe((next) => this.syncOpen(next))
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
  ngOnChanges(_changes: SimpleChanges) {
    if (
      !this.defaultValueInitialized &&
      this.value === undefined &&
      this.defaultValue !== undefined
    ) {
      this.suppressChange = true
      this.selection.setValues(
        Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue],
      )
      this.suppressChange = false
      this.defaultValueInitialized = true
    }

    this.popover.syncOptions()
  }
  get isMultiple() {
    return this.multiple
  }
  get canSearch() {
    return this.showSearch
  }
  get visibleOptions() {
    return filterSelectOptions(this.items, this.snapshot().searchValue, this.filterOption)
  }
  get selectedOptions() {
    this.snapshot()
    return this.selection
      .getSnapshot()
      .values.map(
        (value) =>
          this.items.find((item) => item.value === value) ?? { value, label: String(value) },
      )
  }
  syncOpen(next: boolean) {
    if (next) this.controller.open()
    else this.controller.close()
  }
  removeValue(value: SelectionValue) {
    this.selection.unselect(value)
  }
}
@Component({
  selector: '[selectTrigger]',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PopoverTrigger,
    Button,
    CircleXIcon,
    LoadingIcon,
    Tag,
    TagAction,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-trigger.html',
})
export class SelectTrigger {
  readonly select = inject(SelectRoot)
  @Input() placeholder = ''
  @Input() maxTagCount: number | undefined
  @ContentChild('prefix') prefix?: TemplateRef<void>
  @ContentChild('suffix') suffix?: TemplateRef<void>
  @ContentChild('clear') clear?: TemplateRef<void>
  @ContentChild('tag') tag?: TemplateRef<{ $implicit: SelectOption; remove: () => void }>
  readonly triggerClass = selectTriggerClassName()
  readonly valueContainerClass = selectValueContainerClassName
  readonly valueClass = selectValueClassName
  readonly inputClass = selectInputClassName
  readonly suffixClass = selectSuffixClassName
  readonly indicatorClass = selectIndicatorClassName
  readonly clearClass = selectClearClassName
  get visibleSelected() {
    return this.maxTagCount === undefined
      ? this.select.selectedOptions
      : this.select.selectedOptions.slice(0, Math.max(0, this.maxTagCount))
  }
  get overflow() {
    return this.select.selectedOptions.length - this.visibleSelected.length
  }
  remove(value: SelectionValue) {
    return () => this.select.removeValue(value)
  }
  input(event: Event) {
    this.select.controller.setSearchValue((event.currentTarget as HTMLInputElement).value)
    this.select.controller.open()
  }
  inputPointerdown(event: PointerEvent) {
    const input = event.currentTarget as HTMLInputElement
    if (document.activeElement === input) this.select.controller.toggleOpen()
    else this.select.controller.open()
  }
  keydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      this.select.controller.open()
      this.select.controller.moveActive(event.key === 'ArrowDown' ? 1 : -1)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      this.select.controller.moveActiveTo(event.key === 'Home' ? 'first' : 'last')
    } else if (event.key === 'Enter') {
      event.preventDefault()
      this.select.controller.selectActive()
    } else if (event.key === 'Backspace' && !this.select.snapshot().searchValue)
      this.select.controller.removeLastSelected()
    else if (event.key === 'Escape') this.select.controller.close()
  }
}
@Component({
  selector: '[selectContent]',
  standalone: true,
  imports: [PopoverPortal, PopoverContent, forwardRef(() => SelectList)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-content.html',
})
export class SelectContent {
  readonly contentClass = selectContentClassName
}
@Component({
  selector: 'div[selectItem]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'option',
    '[class]': 'itemClass',
    '[attr.aria-selected]': 'selected',
    '[attr.aria-disabled]': 'disabled || null',
    '[attr.data-selected]': 'selected || null',
    '[attr.data-active]': 'active || null',
    '[attr.data-disabled]': 'disabled || null',
    '(pointermove)': "select.controller.setActiveValue(item.value, 'pointer')",
    '(pointerdown)': '$event.preventDefault()',
    '(click)': 'choose()',
  },
  templateUrl: './select-item.html',
})
export class SelectItem {
  readonly select = inject(SelectRoot)
  @Input({ alias: 'selectItem', required: true }) item!: SelectOption
  readonly itemClass = selectOptionClassName
  readonly labelClass = selectOptionLabelClassName
  readonly indicatorClass = selectOptionIndicatorClassName
  get selected() { return this.select.selection.isSelected(this.item.value) }
  get active() { return this.select.snapshot().activeValue === this.item.value }
  get disabled() { return this.item.disabled === true || this.select.selection.isDisabled(this.item.value) }
  choose() { if (!this.disabled) this.select.controller.selectValue(this.item.value) }
}
@Component({
  selector: 'div[selectGroup]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'group', '[attr.aria-label]': 'label' },
  template: '<ng-content />',
})
export class SelectGroup { @Input() label: string | undefined }
@Component({
  selector: 'div[selectLabel]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'labelClass' },
  template: '<ng-content />',
})
export class SelectLabel { readonly labelClass = selectGroupLabelClassName }
@Component({
  selector: 'div[selectSeparator]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'separator', class: 'my-1 h-px bg-border' },
  template: '',
})
export class SelectSeparator {}
@Component({
  selector: '[selectList]',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'listClass',
    role: 'listbox',
    '[attr.id]': 'select.listId',
    '[attr.aria-multiselectable]': 'select.isMultiple || null',
  },
  templateUrl: './select-list.html',
})
export class SelectList {
  readonly select = inject(SelectRoot)
  @Input() emptyText = 'No options'
  @Input() loadingText = 'Loading...'
  @ContentChild('option') option?: TemplateRef<{
    $implicit: SelectOption
    state: { selected: boolean; active: boolean; disabled: boolean }
  }>
  readonly listClass = `${selectListClassName} block`
  viewport = { scrollTop: 0, height: 320 }
  get range() {
    return this.select.virtual
      ? getSelectVirtualRange(
          this.select.visibleOptions.length,
          this.viewport.scrollTop,
          this.viewport.height,
          this.select.virtual,
        )
      : undefined
  }
  get virtualItems() {
    const range = this.range
    return range ? this.select.visibleOptions.slice(range.start, range.end) : []
  }
  get groups() {
    return groupSelectOptions(this.select.visibleOptions)
  }
  selected(item: SelectOption) {
    return this.select.selection.isSelected(item.value)
  }
  disabled(item: SelectOption) {
    return item.disabled === true || this.select.selection.isDisabled(item.value)
  }
  state(item: SelectOption) {
    return {
      selected: this.selected(item),
      active: this.select.snapshot().activeValue === item.value,
      disabled: this.disabled(item),
    }
  }
  choose(item: SelectOption) {
    if (!this.disabled(item)) this.select.controller.selectValue(item.value)
  }
  @HostListener('scroll', ['$event']) scroll(event: Event) {
    const element = event.currentTarget as HTMLElement
    this.viewport = { scrollTop: element.scrollTop, height: element.clientHeight }
  }
}
export type { SelectFilterOption, SelectOption, SelectVirtualOptions }
