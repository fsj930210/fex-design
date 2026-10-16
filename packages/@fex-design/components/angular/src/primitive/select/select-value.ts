import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, inject, input, TemplateRef } from '@angular/core'
import { getSelectValueLayout } from '@fex-design/core/select/value-layout'
import type { SelectOption } from '@fex-design/core/select/types'
import { selectPlaceholderClassName, selectValueClassName } from '@fex-design/components-styles/select'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { Tag, TagAction } from '../tag'
import { SelectRoot } from './select-root'

@Component({
  selector: 'div[selectValue]',
  standalone: true,
  imports: [NgTemplateOutlet, Tag, TagAction],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()' },
  templateUrl: './select-value.html',
})
export class SelectValue {
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly select = inject(SelectRoot)
  readonly placeholder = input('请选择', { transform: (value: string | undefined) => value ?? '请选择' })
  readonly maxTagCount = input<number>()
  readonly tag = input<TemplateRef<{ $implicit: SelectOption; remove: () => void }>>()
  readonly valueTemplate = contentChild<TemplateRef<unknown>>('value')
  protected readonly placeholderClass = selectPlaceholderClassName
  protected readonly hostClassName = createHostClassName(() => selectValueClassName)
  readonly layout = computed(() => getSelectValueLayout(this.select.selectedOptions, {
    multiple: this.select.isMultiple,
    showSearch: this.select.canSearch,
    open: this.select.snapshot().open,
    searchValue: this.select.snapshot().searchValue,
    maxTagCount: this.maxTagCount(),
  }))
  remove(option: SelectOption) {
    return () => this.select.removeValue(option.value)
  }
}
