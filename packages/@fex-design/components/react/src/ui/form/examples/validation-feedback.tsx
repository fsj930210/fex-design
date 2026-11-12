import { DatePicker } from '@fex-design/react/ui/date-picker'
import { TimePicker } from '@fex-design/react/ui/time-picker'
import { Slider } from '@fex-design/react/ui/slider'
import { RadioGroup } from '@fex-design/react/ui/radio'
import type { DatePickerSelectionValue } from '@fex-design/react/primitive/date-picker'
import type { TimeValue } from '@fex-design/react/primitive/time-picker'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Form, FormField, FormSubscribe } from '@fex-design/react/ui/form'
import { Input } from '@fex-design/react/ui/input'
import { InputNumber } from '@fex-design/react/ui/input-number'
import { Select } from '@fex-design/react/ui/select'
import { Checkbox } from '@fex-design/react/ui/checkbox'
import { Switch } from '@fex-design/react/ui/switch'
import { Button } from '@fex-design/react/ui/button'

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
  const [result, setResult] = useState('')
  const form = useForm({
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
  })
  return (
    <section className="mx-auto grid w-full max-w-2xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">不同控件的校验反馈</h3>
        <p className="text-sm text-muted-foreground">
          直接提交查看各字段错误，再逐项修正。控件通过显式绑定读写字段值，Form 负责反馈和字段关联。
        </p>
      </header>
      <Form form={form}>
        <FormField
          name="title"
          label="活动名称 · Input"
          description="输入和提交均校验必填；失焦标记字段已交互。"
          required
          validators={{ onChange: requiredText }}
        >
          {(field) => (
            <Input
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
              placeholder="输入活动名称"
            />
          )}
        </FormField>
        <FormField
          name="email"
          label="联系邮箱 · Input"
          description="格式错误展示在当前字段下方。"
          required
          validators={{ onChange: emailRule }}
        >
          {(field) => (
            <Input
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
              placeholder="organizer@example.com"
            />
          )}
        </FormField>
        <FormField
          name="capacity"
          label="活动人数 · InputNumber"
          description="必须填写 1 到 50 的整数；输入 0 或 51 观察范围错误。"
          required
          validators={{ onChange: capacityRule }}
        >
          {(field) => (
            <InputNumber
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
              onBlur={() => field.handleBlur()}
            />
          )}
        </FormField>
        <FormField
          name="venue"
          label="活动场地 · Select"
          description="选择后清空，观察选择类控件的错误反馈。"
          required
          validators={{ onChange: requiredText }}
        >
          {(field) => (
            <Select
              value={field.state.value || []}
              onChange={(value) => field.handleChange(typeof value === 'string' ? value : '')}
              options={venues}
              clearable
            />
          )}
        </FormField>
        <FormField
          name="published"
          label="开放报名 · Switch"
          description="布尔值规则要求开启报名。"
          required
          validators={{ onChange: enabledRule }}
        >
          {(field) => (
            <Switch
              checked={field.state.value}
              onChange={(checked) => field.handleChange(checked)}
              onBlur={() => field.handleBlur()}
              aria-label="开放报名"
            />
          )}
        </FormField>
        <FormField
          name="agreement"
          label="活动条款 · Checkbox"
          description="勾选同意后清除当前错误。"
          required
          validators={{ onChange: agreementRule }}
        >
          {(field) => (
            <Checkbox
              checked={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.checked)}
              onBlur={() => field.handleBlur()}
            >
              同意活动条款
            </Checkbox>
          )}
        </FormField>
        <FormField
          name="session"
          label="活动形式 · Radio"
          description="请选择一种活动形式，观察单选组的统一错误反馈。"
          required
          validators={{ onChange: requiredText }}
        >
          {(field) => (
            <RadioGroup
              value={field.state.value}
              onChange={(value) => field.handleChange(String(value))}
              options={sessionOptions}
              orientation="horizontal"
            />
          )}
        </FormField>
        <FormField
          name="date"
          label="活动日期 · DatePicker"
          description="空值校验必填；选择日期后清除当前错误。"
          required
          validators={{ onChange: dateRule }}
        >
          {(field) => (
            <DatePicker
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
              clearable
              placeholder="请选择活动日期"
              inputProps={{ onBlur: () => field.handleBlur() }}
            />
          )}
        </FormField>
        <FormField
          name="time"
          label="开始时间 · TimePicker"
          description="选择时间后写入字段；清空后再次校验。"
          required
          validators={{ onChange: timeRule }}
        >
          {(field) => (
            <TimePicker
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
              allowClear
              placeholder="请选择开始时间"
              inputProps={{ onBlur: () => field.handleBlur() }}
            />
          )}
        </FormField>
        <FormField
          name="progress"
          label="准备进度 · Slider"
          description="初始为 0%，至少达到 30%；支持拖动和方向键。"
          required
          validators={{ onChange: progressRule }}
        >
          {(field) => (
            <Slider
              value={field.state.value}
              min={0}
              max={100}
              step={10}
              onChange={(value) =>
                field.handleChange(typeof value === 'number' ? value : (value[0] ?? 0))
              }
              onBlur={() => field.handleBlur()}
              aria-label="准备进度"
            />
          )}
        </FormField>
        <div className="flex flex-wrap gap-3 border-t border-border pt-4">
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
            <pre className="overflow-auto rounded-md bg-muted-background p-3 text-xs">
              {JSON.stringify(values, null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </Form>
      {result && (
        <p role="status" className="text-sm text-muted-foreground">
          {result}
        </p>
      )}
    </section>
  )
}
