import type { NativeAttributes } from '@fex-design/angular/directives/native-attributes'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  TemplateRef,
} from '@angular/core'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import { analyzeTimeFormat } from '@fex-design/core/date/utils'
import { Popover } from '@fex-design/angular/primitive/popover'
import {
  TimeRangePickerRoot,
  TimeRangePickerTrigger,
  TimeRangePickerFooter,
  TimeRangePickerState,
  TimePickerRoot,
  TimePickerState,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
  type TimePickerInputProps,
  type TimePickerColumnCustomization,
  type TimeRangePickerButtonCustomization,
} from '@fex-design/angular/primitive/time-picker'
@Component({
  selector: 'div[timeRangePicker]',
  exportAs: 'timeRangePicker',
  standalone: true,
  hostDirectives: [Popover],
  providers: [
    TimeRangePickerState,
    TimePickerState,
    { provide: TimeRangePickerRoot, useExisting: forwardRef(() => TimeRangePicker) },
    { provide: TimePickerRoot, useExisting: forwardRef(() => TimeRangePicker) },
  ],
  imports: [
    TimeRangePickerTrigger,
    TimeRangePickerFooter,
    TimePickerPortal,
    TimePickerContent,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
    TimePickerPeriodColumn,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './time-range-picker.html',
})
export class TimeRangePicker extends TimeRangePickerRoot {
  readonly contentProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly panelProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly footerProps = input<{
    cancelButtonProps?: TimeRangePickerButtonCustomization | undefined
    confirmButtonProps?: TimeRangePickerButtonCustomization | undefined
  }>()
  readonly hourColumnProps = input<TimePickerColumnCustomization>()
  readonly minuteColumnProps = input<TimePickerColumnCustomization>()
  readonly secondColumnProps = input<TimePickerColumnCustomization>()
  readonly periodColumnProps = input<TimePickerColumnCustomization>()
  readonly prefix = input<string | number | TemplateRef<unknown>>()
  readonly suffix = input<string | number | TemplateRef<unknown>>()
  readonly size = input<InputSize>()
  readonly variant = input<InputVariant>()
  readonly startInputProps = input<TimePickerInputProps>()
  readonly endInputProps = input<TimePickerInputProps>()
  readonly placeholder = input<readonly [string, string]>()
  readonly allowClear = input(true, { transform: booleanAttribute })
  readonly step = input<{ hour?: number; minute?: number; second?: number }>()
  readonly columns = computed(
    () => analyzeTimeFormat(this.resolvedFormat(), this.use12Hours()).columns,
  )
}
