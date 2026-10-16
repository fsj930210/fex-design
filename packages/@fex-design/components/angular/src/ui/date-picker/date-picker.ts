import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, inject, Injector, input, TemplateRef, viewChild } from '@angular/core'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import { getPickerContentKind } from '@fex-design/core/date-picker/view'
import { createHostStyle } from '@fex-design/angular/signals/host-style'
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter, DatePickerState, type DatePickerFooterContent } from '@fex-design/angular/primitive/date-picker'
import { Popover } from '../../primitive/popover'
import { PickerOwnerToken } from '../../primitive/date-picker/owner-context'
import { PickerContainerToken } from '../../primitive/date-picker/container-context'
import { PickerAppearanceToken } from '../../primitive/date-picker/appearance-context'
@Component({
  selector: 'div[datePicker]', exportAs: 'datePicker', standalone: true,
  imports: [NgTemplateOutlet, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter],
  hostDirectives: [Popover],
  providers: [DatePickerState, { provide: DatePickerRoot, useExisting: forwardRef(() => DatePicker) }, { provide: PickerOwnerToken, useExisting: DatePickerState }, { provide: PickerContainerToken, useFactory: () => inject(DatePicker) }, { provide: PickerAppearanceToken, useFactory: () => inject(DatePicker).appearance }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'date-picker' }, templateUrl: './date-picker.html',
})
export class DatePicker extends DatePickerRoot {
  readonly placeholder = input<string>()
  readonly prefix = input<string | number | TemplateRef<unknown>>()
  readonly suffix = input<string | number | TemplateRef<unknown>>()
  readonly size = input<InputSize>()
  readonly variant = input<InputVariant>()
  readonly footer = input<DatePickerFooterContent>()
  readonly prefixTemplate = contentChild<TemplateRef<unknown>>('prefix')
  readonly suffixTemplate = contentChild<TemplateRef<unknown>>('suffix')
  readonly triggerTemplate = contentChild<TemplateRef<unknown>>('trigger')
  readonly panelTemplate = contentChild<TemplateRef<unknown>>('panel')
  readonly footerTemplate = contentChild<TemplateRef<unknown>>('footer')
  readonly footerContent = computed(() => this.footer() === undefined ? this.footerTemplate() : this.footer())
  readonly footerKind = computed(() => getPickerContentKind(this.footerContent()))
  protected readonly injector = inject(Injector)
  protected readonly triggerInjector = viewChild('trigger', { read: Injector })
  protected readonly hostStyle = createHostStyle()
}
