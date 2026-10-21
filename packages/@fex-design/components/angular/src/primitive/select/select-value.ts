import type { NativeAttributes } from '@fex-design/angular/directives/native-attributes'
import type { TagOptions } from '@fex-design/core/tag/types'
import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
  TemplateRef,
} from '@angular/core'
import { getSelectValueLayout } from '@fex-design/core/select/value-layout'
import type { SelectOption } from '@fex-design/core/select/types'
import {
  selectPlaceholderClassName,
  selectValueClassName,
} from '@fex-design/components-styles/select'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { Tag, TagAction } from '@fex-design/angular/primitive/tag'
import { SelectRoot } from './select-root'

export type SelectTagCustomization = Omit<TagOptions, 'disabled'> &
  Pick<NativeAttributes, 'class' | 'style'>
export interface SelectValueCustomization extends Pick<NativeAttributes, 'class' | 'style'> {
  placeholder?: string | undefined
  maxTagCount?: number | undefined
  tagProps?: SelectTagCustomization | ((option: SelectOption) => SelectTagCustomization) | undefined
  tagActionProps?:
    | Pick<NativeAttributes, 'class' | 'style'>
    | ((option: SelectOption) => Pick<NativeAttributes, 'class' | 'style'>)
    | undefined
  overflowTagProps?: SelectTagCustomization | undefined
}
@Component({
  selector: 'div[selectValue]',
  standalone: true,
  imports: [NgTemplateOutlet, Tag, TagAction],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()' },
  templateUrl: './select-value.html',
})
export class SelectValue {
  readonly class = input<string>()
  readonly tagProps = input<SelectValueCustomization['tagProps']>()
  readonly tagActionProps = input<SelectValueCustomization['tagActionProps']>()
  readonly overflowTagProps = input<SelectTagCustomization>()
  tagConfig(option: SelectOption) {
    const config = this.tagProps()
    return typeof config === 'function' ? config(option) : config
  }
  actionConfig(option: SelectOption) {
    const config = this.tagActionProps()
    return typeof config === 'function' ? config(option) : config
  }
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly select = inject(SelectRoot)
  readonly placeholder = input('请选择', {
    transform: (value: string | undefined) => value ?? '请选择',
  })
  readonly maxTagCount = input<number>()
  readonly tag = input<TemplateRef<{ $implicit: SelectOption; remove: () => void }>>()
  readonly valueTemplate = contentChild<TemplateRef<unknown>>('value')
  protected readonly placeholderClass = selectPlaceholderClassName
  protected readonly hostClassName = createHostClassName(selectValueClassName, () => this.class())
  readonly layout = computed(() =>
    getSelectValueLayout(this.select.selectedOptions, {
      multiple: this.select.isMultiple,
      showSearch: this.select.canSearch,
      open: this.select.snapshot().open,
      searchValue: this.select.snapshot().searchValue,
      maxTagCount: this.maxTagCount(),
    }),
  )
  remove(option: SelectOption) {
    return () => this.select.removeValue(option.value)
  }
}
