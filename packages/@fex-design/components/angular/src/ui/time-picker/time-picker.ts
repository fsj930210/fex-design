import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, input, TemplateRef } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { analyzeTimeFormat } from '@fex-design/core/date/utils'
import type { InputAttributes } from '@fex-design/angular/primitive/input'
import { Popover } from '@fex-design/angular/primitive/popover'
import { TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn, TimePickerPeriodColumn, TimePickerState } from '@fex-design/angular/primitive/time-picker'
@Component({
  selector: 'div[timePicker]', exportAs: 'timePicker', standalone: true,
  hostDirectives: [Popover], providers: [TimePickerState, { provide: TimePickerRoot, useExisting: forwardRef(() => TimePicker) }],
  imports: [NgTemplateOutlet, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn, TimePickerPeriodColumn],
  changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './time-picker.html',
})
export class TimePicker extends TimePickerRoot {
  readonly size = input<InputSize>()
  readonly variant = input<InputVariant>()
  readonly prefix = input<string | number | TemplateRef<unknown>>()
  readonly suffix = input<string | number | TemplateRef<unknown>>()
  readonly inputProps = input<InputAttributes>()
  readonly placeholder = input<string>()
  readonly allowClear = input(true, { transform: booleanAttribute })
  readonly invalid = input(false, { transform: booleanAttribute })
  readonly step = input<{ hour?: number | undefined; minute?: number | undefined; second?: number | undefined }>()
  readonly triggerTemplate = contentChild<TemplateRef<unknown>>('trigger')
  readonly panelTemplate = contentChild<TemplateRef<unknown>>('panel')
  readonly footerTemplate = contentChild<TemplateRef<unknown>>('footer')
  readonly columns = computed(() => analyzeTimeFormat(this.resolvedFormat(), this.use12Hours()).columns)
}
