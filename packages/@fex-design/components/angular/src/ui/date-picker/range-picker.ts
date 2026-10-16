import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, inject, Injector, input, TemplateRef, viewChild } from '@angular/core'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import { getPickerContentKind } from '@fex-design/core/date-picker/view'
import { createHostStyle } from '@fex-design/angular/signals/host-style'
import { RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter, RangePickerState, type DatePickerFooterContent } from '@fex-design/angular/primitive/date-picker'
import { Popover } from '../../primitive/popover'
import { PickerOwnerToken } from '../../primitive/date-picker/owner-context'
import { PickerContainerToken } from '../../primitive/date-picker/container-context'
import { PickerAppearanceToken } from '../../primitive/date-picker/appearance-context'
@Component({
  selector: 'div[rangePicker]', exportAs: 'rangePicker', standalone: true,
  imports: [NgTemplateOutlet, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter],
  hostDirectives: [Popover],
  providers: [RangePickerState, { provide: RangePickerRoot, useExisting: forwardRef(() => RangePicker) }, { provide: PickerOwnerToken, useExisting: RangePickerState }, { provide: PickerContainerToken, useFactory: () => inject(RangePicker) }, { provide: PickerAppearanceToken, useFactory: () => inject(RangePicker).appearance }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'range-picker' }, templateUrl: './range-picker.html',
})
export class RangePicker extends RangePickerRoot {
  readonly startPlaceholder = input<string>()
  readonly endPlaceholder = input<string>()
  readonly separator = input<string>()
  readonly suffix = input<string | number | TemplateRef<unknown>>()
  readonly size = input<InputSize>()
  readonly variant = input<InputVariant>()
  readonly footer = input<DatePickerFooterContent>()
  
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
