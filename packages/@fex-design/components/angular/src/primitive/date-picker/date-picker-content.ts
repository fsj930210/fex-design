import { mergePickerStyle } from './style'
import { getPickerAppearance } from './appearance-context'

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { NativeAttributesDirective, type NativeAttributes } from '@fex-design/angular/directives/native-attributes'

import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { datePickerContentClassName } from '@fex-design/components-styles/date-picker'
import { Popover, PopoverContent, PopoverPortal } from '@fex-design/angular/primitive/popover'
import { PickerContainerToken } from './container-context'
@Component({
  selector: 'div[datePickerContent], div[rangePickerContent]',
  standalone: true, imports: [NativeAttributesDirective, NgTemplateOutlet, PopoverContent, PopoverPortal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'date-picker-content' },
  templateUrl: './date-picker-content.html',
})
export class DatePickerContent {
  protected readonly appearance = getPickerAppearance()
  protected readonly contentStyle = computed(() => mergePickerStyle(this.appearance().popoverProps?.styles?.root, this.contentProps()?.style))
  readonly class = input<string>()
  readonly contentProps = input<NativeAttributes>()
  private readonly scope = inject(PickerContainerToken, { optional: true })
  private readonly localPopover = inject(Popover, { optional: true })
  protected readonly customContainer = computed(() => !this.localPopover || Boolean(this.scope?.containerTemplate() && this.localPopover === this.scope.popover))
  protected readonly contentClassName = createHostClassName(datePickerContentClassName, () => [this.appearance().popoverProps?.classNames?.root, this.contentProps()?.class, this.class()].filter(Boolean).join(' ') || undefined)
}
export { DatePickerContent as RangePickerContent }
