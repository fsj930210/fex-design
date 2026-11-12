import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { injectForm, TanStackField, type AnyFormState } from '@tanstack/angular-form'
import type { DatePickerSelectionValue } from '@fex-design/angular/primitive/date-picker'
import type { TimeValue } from '@fex-design/angular/primitive/time-picker'
import {
  FormRoot,
  FormField,
  FormControl,
  FormLabel,
  FormDescription,
  FormError,
  FormSubscribe,
} from '@fex-design/angular/primitive/form'
import { InputRoot, InputControl } from '@fex-design/angular/primitive/input'
import {
  InputNumberRoot,
  InputNumberControl,
  InputNumberActions,
  InputNumberIncrement,
  InputNumberDecrement,
} from '@fex-design/angular/primitive/input-number'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/angular/primitive/select'
import { SwitchRoot, SwitchThumb } from '@fex-design/angular/primitive/switch'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
} from '@fex-design/angular/primitive/checkbox'
import { RadioGroup, Radio } from '@fex-design/angular/primitive/radio'
import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
} from '@fex-design/angular/primitive/date-picker'
import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
} from '@fex-design/angular/primitive/time-picker'
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from '@fex-design/angular/primitive/slider'
import { Button } from '@fex-design/angular/primitive/button'
const sessionOptions = [
  { value: 'online', label: '线上活动' },
  { value: 'offline', label: '线下活动' },
]
const dateRule = ({ value }: { value: unknown }) => (value ? undefined : '请选择活动日期')
const timeRule = ({ value }: { value: unknown }) => (value ? undefined : '请选择开始时间')
const progressRule = ({ value }: { value: unknown }) =>
  typeof value === 'number' && value >= 30 ? undefined : '准备进度至少达到 30%'
const venues = [
  { value: 'online', label: '线上会议' },
  { value: 'office', label: '公司会议室' },
]
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写或选择此项'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
const capacityRule = ({ value }: { value: unknown }) =>
  typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 50
    ? undefined
    : '人数必须为 1 到 50 的整数'
const enabledRule = ({ value }: { value: unknown }) => (value === true ? undefined : '请开启报名')
const agreementRule = ({ value }: { value: unknown }) =>
  value === true ? undefined : '请同意活动条款'

@Component({
  selector: 'section[formValidationFeedbackExample]',
  standalone: true,
  host: { class: 'contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormRoot,
    FormField,
    FormControl,
    FormLabel,
    FormDescription,
    FormError,
    FormSubscribe,
    InputRoot,
    InputControl,
    InputNumberRoot,
    InputNumberControl,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
    SelectRoot,
    SelectTrigger,
    SelectContent,
    SwitchRoot,
    SwitchThumb,
    CheckboxRoot,
    CheckboxControl,
    CheckboxIndicator,
    CheckboxLabel,
    RadioGroup,
    Radio,
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    DatePickerFooter,
    TimePickerRoot,
    TimePickerTrigger,
    TimePickerPortal,
    TimePickerContent,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
    SliderRoot,
    SliderTrack,
    SliderRange,
    SliderThumb,
    Button,
    TanStackField,
  ],
  templateUrl: './validation-feedback.html',
})
export class ValidationFeedbackExample {
  readonly result = signal('')
  readonly venues = venues
  readonly sessionOptions = sessionOptions
  readonly stringify = (value: unknown) => JSON.stringify(value, null, 2)
  readonly values = (state: AnyFormState) => state.values
  readonly selectionValue = (value: unknown) => (typeof value === 'string' ? value : '')
  readonly sliderValue = (value: number | number[]) =>
    typeof value === 'number' ? value : (value[0] ?? 0)
  readonly rules = {
    title: { onChange: requiredText },
    email: { onChange: emailRule },
    capacity: { onChange: capacityRule },
    venue: { onChange: requiredText },
    published: { onChange: enabledRule },
    agreement: { onChange: agreementRule },
    session: { onChange: requiredText },
    date: { onChange: dateRule },
    time: { onChange: timeRule },
    progress: { onChange: progressRule },
  }
  readonly form = injectForm({
    defaultValues: {
      title: '',
      email: '',
      capacity: 0 as number | undefined,
      venue: '',
      published: false,
      agreement: false,
      date: null as DatePickerSelectionValue,
      time: null as TimeValue | null,
      progress: 0,
      session: '',
    },
    onSubmit: ({ value }) => {
      this.result.set('校验通过：' + value.title + '，人数 ' + value.capacity)
    },
  })
  setEmailError() {
    this.form.setFieldMeta('email', (meta) => ({
      ...meta,
      isTouched: true,
      errorMap: { ...meta.errorMap, onChange: '该邮箱已被占用，请更换' },
    }))
    this.result.set('已向邮箱字段写入业务错误，修改邮箱后重新校验')
  }
}
