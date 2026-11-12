import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import {
  TimePickerContent,
  TimePickerPanel,
  TimePickerTrigger,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
  TimePickerRoot,
  TimePickerPortal,
} from '@fex-design/angular/primitive/time-picker'
import type { TimeValue, TimePickerChangeDetails } from '@fex-design/core/time-picker/types'
import { FormControlBase } from '../../forms/form-control-base'

@Component({
  selector: 'div[timePicker]',
  standalone: true,
  imports: [
    TimePickerRoot,
    TimePickerTrigger,
    TimePickerPortal,
    TimePickerContent,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
    TimePickerPeriodColumn,
  ],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: TimePicker, multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './time-picker.html',
})
export class TimePicker extends FormControlBase<TimeValue | null> {
  readonly value = input<TimeValue | null>(null)
  readonly defaultValue = input<TimeValue | null>(null)
  readonly disabled = input(false)
  readonly open = input<boolean>()
  readonly placeholder = input<string>()
  readonly allowClear = input(true)
  readonly change = output<{ value: TimeValue | null; details: TimePickerChangeDetails }>()
  readonly openChange = output<boolean>()
  readonly readOnly = input(false)
  readonly format = input<string>()
  readonly use12Hours = input(false)
  readonly step = input<unknown>()
  readonly disabledTime = input<unknown>()
  readonly classNames = input<unknown>()
  readonly styles = input<unknown>()
  readonly contentProps = input<unknown>()
  readonly hourColumnProps = input<unknown>()
  readonly minuteColumnProps = input<unknown>()
  readonly secondColumnProps = input<unknown>()
  readonly periodColumnProps = input<unknown>()
  protected readonly resolvedValue = this.resolveFormValue(
    () => this.value(),
    () => this.defaultValue(),
  )
  protected handleChange(event: { value: TimeValue | null; details: TimePickerChangeDetails }) {
    this.emitFormValue(event.value)
    this.change.emit(event)
  }
  protected handleOpenChange(value: boolean) {
    this.openChange.emit(value)
  }
}
