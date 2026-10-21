import type { NativeAttributes } from '@fex-design/angular/directives/native-attributes'
import { mergeStyle } from '@fex-design/angular/signals/merge-style'
import type { TimePickerClassNames, TimePickerStyles } from '@fex-design/core/time-picker/types'
import { cn } from '@fex-design/utils'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  forwardRef,
  input,
  TemplateRef,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { analyzeTimeFormat } from '@fex-design/core/date/utils'
import type {
  TimePickerInputProps,
  TimePickerColumnCustomization,
} from '@fex-design/angular/primitive/time-picker'
import { Popover } from '@fex-design/angular/primitive/popover'
import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
  TimePickerState,
} from '@fex-design/angular/primitive/time-picker'
@Component({
  selector: 'div[timePicker]',
  exportAs: 'timePicker',
  standalone: true,
  hostDirectives: [Popover],
  providers: [
    TimePickerState,
    { provide: TimePickerRoot, useExisting: forwardRef(() => TimePicker) },
  ],
  imports: [
    NgTemplateOutlet,
    TimePickerTrigger,
    TimePickerPortal,
    TimePickerContent,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
    TimePickerPeriodColumn,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './time-picker.html',
})
export class TimePicker extends TimePickerRoot {
  readonly hourColumnProps = input<TimePickerColumnCustomization>()
  readonly minuteColumnProps = input<TimePickerColumnCustomization>()
  readonly secondColumnProps = input<TimePickerColumnCustomization>()
  readonly periodColumnProps = input<TimePickerColumnCustomization>()
  protected readonly cn = cn
  protected readonly mergeStyle = mergeStyle
  readonly panelProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly contentProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly contentClass = computed(() => cn(this.classNames()?.popup, this.contentProps()?.class))
  readonly contentStyle = computed(() =>
    mergeStyle(this.styles()?.popup, this.contentProps()?.style),
  )
  readonly classNames = input<TimePickerClassNames>()
  readonly styles = input<TimePickerStyles<Record<string, string | number | null | undefined>>>()
  readonly styledInputProps = computed(() => ({
    ...this.inputProps(),
    class: cn(this.classNames()?.input, this.inputProps()?.class),
    style: mergeStyle(this.styles()?.input, this.inputProps()?.style),
  }))
  readonly size = input<InputSize>()
  readonly variant = input<InputVariant>()
  readonly prefix = input<string | number | TemplateRef<unknown>>()
  readonly suffix = input<string | number | TemplateRef<unknown>>()
  readonly inputProps = input<TimePickerInputProps>()
  readonly placeholder = input<string>()
  readonly allowClear = input(true, { transform: booleanAttribute })
  readonly invalid = input(false, { transform: booleanAttribute })
  readonly step = input<{
    hour?: number | undefined
    minute?: number | undefined
    second?: number | undefined
  }>()
  readonly triggerTemplate = contentChild<TemplateRef<unknown>>('trigger')
  readonly panelTemplate = contentChild<TemplateRef<unknown>>('panel')
  readonly footerTemplate = contentChild<TemplateRef<unknown>>('footer')
  readonly columns = computed(
    () => analyzeTimeFormat(this.resolvedFormat(), this.use12Hours()).columns,
  )
}
