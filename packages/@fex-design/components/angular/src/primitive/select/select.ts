import { NgTemplateOutlet } from '@angular/common'
import { groupSelectOptions } from '@fex-design/core/select/filter-options'
import { getSelectVirtualRange } from '@fex-design/core/select/virtual'
import type { InputClassNames, InputStyles } from '@fex-design/core/input/types'
import type { SelectionValue } from '@fex-design/core/selection/types'
import type {
  SelectFilterOption,
  SelectOption,
  SelectVirtualOptions,
} from '@fex-design/core/select/types'
import {
  selectClearClassName,
  selectClearableIndicatorClassName,
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
  HostListener,
  Input,
  TemplateRef,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import { cn } from '@fex-design/utils'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { ChevronDownIcon } from '../../icons/chevron-down'
import { CheckIcon } from '@fex-design/angular/icons/check'
import { CircleXIcon } from '@fex-design/angular/icons/circle-x'
import { LoadingIcon } from '@fex-design/angular/icons/loading'
import { PopoverContent, PopoverPortal, PopoverTrigger } from '@fex-design/angular/primitive/popover'

import { SelectRoot } from './select-root'
import { SelectValue } from './select-value'
export { SelectRoot, type SelectChangeMeta } from './select-root'
@Component({
  selector: '[selectTrigger]',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PopoverTrigger,
    SelectValue,
    CircleXIcon,
    LoadingIcon,
    ChevronDownIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Apply wrapper layout after construction so it is not captured as an inner trigger class.
  host: { '[class]': "'contents'" },
  templateUrl: './select-trigger.html',
})
export class SelectTrigger {
  readonly select = inject(SelectRoot)
  @Input() placeholder = '请选择'
  @Input() maxTagCount: number | undefined
  readonly class = input<string | undefined>()
  readonly inputProps = input<{ class?: string; style?: string; name?: string; autocomplete?: string; inputmode?: string; 'aria-label'?: string; classNames?: InputClassNames; styles?: InputStyles<string> }>({})
  @ContentChild('prefix') prefix?: TemplateRef<void>
  @ContentChild('suffix') suffix?: TemplateRef<void>
  @ContentChild('clear') clear?: TemplateRef<void>
  @ContentChild('tag') tag?: TemplateRef<{ $implicit: SelectOption; remove: () => void }>
  readonly triggerClass = createHostClassName(
    () => cn(selectTriggerClassName(), this.inputProps().classNames?.root, this.inputProps().class),
    () => this.class(),
  )
  readonly valueContainerClass = selectValueContainerClassName
  readonly valueClass = selectValueClassName
  readonly inputClass = selectInputClassName
  readonly suffixClass = selectSuffixClassName
  readonly indicatorClass = selectIndicatorClassName
  readonly clearClass = selectClearClassName
  readonly clearableIndicatorClass = selectClearableIndicatorClassName
  input(event: Event) {
    this.select.controller.setSearchValue((event.currentTarget as HTMLInputElement).value)
    this.select.controller.open()
  }
  inputPointerdown() {
    this.select.controller.open()
  }
  keydown(event: KeyboardEvent) {
  if (event.defaultPrevented) return
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
  imports: [NgTemplateOutlet, PopoverPortal, PopoverContent, forwardRef(() => SelectList)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-content.html',
})
export class SelectContent {
  readonly select = inject(SelectRoot)
  @Input() popupRender: TemplateRef<{ menu: TemplateRef<unknown>; close: () => void }> | undefined
  readonly close = () => this.select.controller.close()
  readonly contentClass = selectContentClassName
}
@Component({
  selector: 'div[selectItem]',
  standalone: true,
  imports: [CheckIcon],
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
  imports: [NgTemplateOutlet, CheckIcon],
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
  readonly optionClass = selectOptionClassName
  readonly optionLabelClass = selectOptionLabelClassName
  readonly optionIndicatorClass = selectOptionIndicatorClassName
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
