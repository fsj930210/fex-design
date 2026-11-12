import { ChangeDetectionStrategy, Component, input, output, TemplateRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import {
  DatePickerContent,
  DatePickerFooter,
  DatePickerPanel,
  DatePickerTrigger,
  DatePickerRoot,
} from '@fex-design/angular/primitive/date-picker'
import type { DatePickerSelectionValue } from '@fex-design/angular/primitive/date-picker'
import { FormControlBase } from '../../forms/form-control-base'

@Component({
  selector: 'div[datePicker]',
  standalone: true,
  imports: [
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    DatePickerFooter,
  ],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: DatePicker, multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-picker.html',
})
export class DatePicker extends FormControlBase<DatePickerSelectionValue> {
  readonly value = input<DatePickerSelectionValue>(null)
  readonly defaultValue = input<DatePickerSelectionValue>(null)
  readonly change = output<DatePickerSelectionValue>()
  readonly clearable = input(false)
  readonly placeholder = input<string>()
  readonly triggerTemplate = input<TemplateRef<unknown>>()
  readonly panelTemplate = input<TemplateRef<unknown>>()
  readonly inputProps = input<unknown>()
  readonly calendarProps = input<unknown>()
  readonly minDate = input<unknown>()
  readonly maxDate = input<unknown>()
  readonly multiple = input(false)
  readonly defaultOpen = input(false)
  readonly popoverProps = input<unknown>()
  readonly showTime = input<unknown>()
  readonly open = input(false)
  readonly disabledTime = input<unknown>()
  readonly disabled = input(false)
  readonly disabledDate = input<unknown>()
  readonly footer = input<unknown>()
  readonly format = input<string>()
  readonly picker = input<unknown>()
  readonly weekStartsOn = input<number>()
  readonly maxCount = input<number>()
  readonly locale = input<unknown>()
  readonly classNames = input<unknown>()
  protected readonly resolvedValue = this.resolveFormValue(
    () => this.value(),
    () => this.defaultValue(),
  )
  protected handleChange(value: DatePickerSelectionValue) {
    this.emitFormValue(value)
    this.change.emit(value)
  }
}
