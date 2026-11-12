import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
} from '@fex-design/solid/primitive/date-picker'
import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
} from '@fex-design/solid/primitive/time-picker'
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from '@fex-design/solid/primitive/slider'
import { RadioGroup, Radio } from '@fex-design/solid/primitive/radio'
import type { DatePickerSelectionValue } from '@fex-design/solid/primitive/date-picker'
import type { TimeValue } from '@fex-design/solid/primitive/time-picker'
import { createSignal, Show, For } from 'solid-js'
import { createForm } from '@tanstack/solid-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormError,
  FormSubscribe,
} from '@fex-design/solid/primitive/form'
import { InputRoot, InputControl } from '@fex-design/solid/primitive/input'
import {
  InputNumberRoot,
  InputNumberControl,
  InputNumberActions,
  InputNumberIncrement,
  InputNumberDecrement,
} from '@fex-design/solid/primitive/input-number'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/solid/primitive/select'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
} from '@fex-design/solid/primitive/checkbox'
import { SwitchRoot, SwitchThumb } from '@fex-design/solid/primitive/switch'
import { Button } from '@fex-design/solid/primitive/button'

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

export function ValidationFeedbackExample() {
  const [result, setResult] = createSignal('')
  const form = createForm(() => ({
    defaultValues: {
      title: '',
      email: '',
      capacity: 0,
      venue: '',
      published: false,
      agreement: false,
      date: null as DatePickerSelectionValue,
      time: null as TimeValue | null,
      progress: 0,
      session: '',
    },
    onSubmit: ({ value }) => setResult('校验通过：' + value.title + '，人数 ' + value.capacity),
  }))
  return (
    <section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">不同控件的校验反馈</h3>
        <p class="text-sm text-muted-foreground">
          直接提交查看各字段错误，再逐项修正。控件通过显式绑定读写字段值，Form 负责反馈和字段关联。
        </p>
      </header>
      <FormRoot form={form}>
        <FormField name="title" validators={{ onChange: requiredText }}>
          {(field) => (
            <>
              <FormLabel required>活动名称 · Input</FormLabel>
              <FormControl>
                <InputRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <InputControl onBlur={() => field().handleBlur()} placeholder="输入活动名称" />
                </InputRoot>
              </FormControl>
              <FormDescription>输入和提交均校验必填；失焦标记字段已交互。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="email" validators={{ onChange: emailRule }}>
          {(field) => (
            <>
              <FormLabel required>联系邮箱 · Input</FormLabel>
              <FormControl>
                <InputRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <InputControl
                    onBlur={() => field().handleBlur()}
                    placeholder="organizer@example.com"
                  />
                </InputRoot>
              </FormControl>
              <FormDescription>格式错误展示在当前字段下方。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="capacity" validators={{ onChange: capacityRule }}>
          {(field) => (
            <>
              <FormLabel required>活动人数 · InputNumber</FormLabel>
              <FormControl>
                <InputNumberRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <InputNumberControl onBlur={() => field().handleBlur()} />
                  <InputNumberActions>
                    <InputNumberIncrement />
                    <InputNumberDecrement />
                  </InputNumberActions>
                </InputNumberRoot>
              </FormControl>
              <FormDescription>
                必须填写 1 到 50 的整数；输入 0 或 51 观察范围错误。
              </FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="venue" validators={{ onChange: requiredText }}>
          {(field) => (
            <>
              <FormLabel required>活动场地 · Select</FormLabel>
              <FormControl>
                <SelectRoot
                  value={field().state.value || []}
                  onChange={(value) => field().handleChange(typeof value === 'string' ? value : '')}
                  options={venues}
                  clearable
                >
                  <SelectTrigger inputProps={{ 'aria-label': '活动场地' }} />
                  <SelectContent />
                </SelectRoot>
              </FormControl>
              <FormDescription>选择后清空，观察选择类控件的错误反馈。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="published" validators={{ onChange: enabledRule }}>
          {(field) => (
            <>
              <FormLabel required>开放报名 · Switch</FormLabel>
              <FormControl>
                <SwitchRoot
                  checked={field().state.value}
                  onChange={(checked) => field().handleChange(checked)}
                  onBlur={() => field().handleBlur()}
                  aria-label="开放报名"
                >
                  <SwitchThumb />
                </SwitchRoot>
              </FormControl>
              <FormDescription>布尔值规则要求开启报名。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="agreement" validators={{ onChange: agreementRule }}>
          {(field) => (
            <>
              <FormLabel required>活动条款 · Checkbox</FormLabel>
              <FormControl>
                <CheckboxRoot>
                  <CheckboxControl
                    checked={field().state.value}
                    onChange={(event) => field().handleChange(event.currentTarget.checked)}
                    onBlur={() => field().handleBlur()}
                    aria-label="同意活动条款"
                  />
                  <CheckboxIndicator />
                  <CheckboxLabel>同意活动条款</CheckboxLabel>
                </CheckboxRoot>
              </FormControl>
              <FormDescription>勾选同意后清除当前错误。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="session" validators={{ onChange: requiredText }}>
          {(field) => (
            <>
              <FormLabel required>活动形式 · Radio</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field().state.value}
                  onChange={(value) => field().handleChange(String(value))}
                  orientation="horizontal"
                >
                  <For each={sessionOptions}>
                    {(option) => (
                      <label class="inline-flex items-center gap-2">
                        <Radio value={option.value} />
                        {option.label}
                      </label>
                    )}
                  </For>
                </RadioGroup>
              </FormControl>
              <FormDescription>请选择一种活动形式，观察单选组的统一错误反馈。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="date" validators={{ onChange: dateRule }}>
          {(field) => (
            <>
              <FormLabel required>活动日期 · DatePicker</FormLabel>
              <FormControl>
                <DatePickerRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                  clearable
                >
                  <DatePickerTrigger
                    placeholder="请选择活动日期"
                    inputProps={{ onBlur: () => field().handleBlur() }}
                  />
                  <DatePickerContent>
                    <DatePickerPanel />
                    <DatePickerFooter />
                  </DatePickerContent>
                </DatePickerRoot>
              </FormControl>
              <FormDescription>空值校验必填；选择日期后清除当前错误。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="time" validators={{ onChange: timeRule }}>
          {(field) => (
            <>
              <FormLabel required>开始时间 · TimePicker</FormLabel>
              <FormControl>
                <TimePickerRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <TimePickerTrigger
                    allowClear
                    placeholder="请选择开始时间"
                    inputProps={{ onBlur: () => field().handleBlur() }}
                  />
                  <TimePickerPortal>
                    <TimePickerContent>
                      <TimePickerPanel>
                        <TimePickerHourColumn />
                        <TimePickerMinuteColumn />
                        <TimePickerSecondColumn />
                      </TimePickerPanel>
                    </TimePickerContent>
                  </TimePickerPortal>
                </TimePickerRoot>
              </FormControl>
              <FormDescription>选择时间后写入字段；清空后再次校验。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="progress" validators={{ onChange: progressRule }}>
          {(field) => (
            <>
              <FormLabel required>准备进度 · Slider</FormLabel>
              <FormControl>
                <SliderRoot
                  value={[field().state.value]}
                  min={0}
                  max={100}
                  step={10}
                  onChange={(value) => field().handleChange(value[0] ?? 0)}
                >
                  <SliderTrack>
                    <SliderRange />
                  </SliderTrack>
                  <SliderThumb onBlur={() => field().handleBlur()} aria-label="准备进度" />
                </SliderRoot>
              </FormControl>
              <FormDescription>初始为 0%，至少达到 30%；支持拖动和方向键。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <div class="flex flex-wrap gap-3 border-t border-border pt-4">
          <Button type="submit" variant="solid" color="primary">
            校验全部字段
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.setFieldMeta('email', (meta) => ({
                ...meta,
                isTouched: true,
                errorMap: { ...meta.errorMap, onChange: '该邮箱已被占用，请更换' },
              }))
              setResult('已向邮箱字段写入业务错误，修改邮箱后重新校验')
            }}
          >
            设置邮箱错误
          </Button>
          <Button type="reset" onClick={() => setResult('')}>
            清空重试
          </Button>
        </div>
        <FormSubscribe selector={(state) => state.values}>
          {(values) => (
            <pre class="overflow-auto rounded-md bg-muted-background p-3 text-xs">
              {JSON.stringify(values(), null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </FormRoot>
      <Show when={result()}>
        <p role="status" class="text-sm text-muted-foreground">
          {result()}
        </p>
      </Show>
    </section>
  )
}
