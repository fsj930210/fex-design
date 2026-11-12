<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@tanstack/vue-form'
import { DatePicker } from '@fex-design/vue/ui/date-picker'
import { TimePicker } from '@fex-design/vue/ui/time-picker'
import { Slider } from '@fex-design/vue/ui/slider'
import { RadioGroup } from '@fex-design/vue/ui/radio'
import type { DatePickerSelectionValue } from '@fex-design/vue/primitive/date-picker'
import type { TimeValue } from '@fex-design/vue/primitive/time-picker'
import { Form, FormField, FormSubscribe } from '@fex-design/vue/ui/form'
import { Input } from '@fex-design/vue/ui/input'
import { InputNumber } from '@fex-design/vue/ui/input-number'
import { Select } from '@fex-design/vue/ui/select'
import { Checkbox } from '@fex-design/vue/ui/checkbox'
import { Switch } from '@fex-design/vue/ui/switch'
import { Button } from '@fex-design/vue/ui/button'
defineOptions({ name: 'ValidationFeedbackExample' })
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

const result = ref('')
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
  onSubmit: ({ value }) => {
    result.value = '校验通过：' + value.title + '，人数 ' + value.capacity
  },
})
function setEmailError() {
  form.setFieldMeta('email', (meta) => ({
    ...meta,
    isTouched: true,
    errorMap: { ...meta.errorMap, onChange: '该邮箱已被占用，请更换' },
  }))
  result.value = '已向邮箱字段写入业务错误，修改邮箱后重新校验'
}
</script>
<template>
  <section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">不同控件的校验反馈</h3>
      <p class="text-sm text-muted-foreground">
        直接提交查看各字段错误，再逐项修正。控件通过显式绑定读写字段值，Form 负责反馈和字段关联。
      </p>
    </header>
    <Form :form="form">
      <FormField
        name="title"
        label="活动名称 · Input"
        description="输入和提交均校验必填；失焦标记字段已交互。"
        required
        :validators="{ onChange: requiredText }"
        v-slot="{ field }"
        ><Input
          :value="field.state.value"
          @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
          @blur="field.handleBlur()"
          placeholder="输入活动名称"
      /></FormField>
      <FormField
        name="email"
        label="联系邮箱 · Input"
        description="格式错误展示在当前字段下方。"
        required
        :validators="{ onChange: emailRule }"
        v-slot="{ field }"
        ><Input
          :value="field.state.value"
          @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
          @blur="field.handleBlur()"
          placeholder="organizer@example.com"
      /></FormField>
      <FormField
        name="capacity"
        label="活动人数 · InputNumber"
        description="必须填写 1 到 50 的整数；输入 0 或 51 观察范围错误。"
        required
        :validators="{ onChange: capacityRule }"
        v-slot="{ field }"
        ><InputNumber
          :value="field.state.value"
          @change="(value) => field.handleChange(value)"
          @blur="field.handleBlur()"
      /></FormField>
      <FormField
        name="venue"
        label="活动场地 · Select"
        description="选择后清空，观察选择类控件的错误反馈。"
        required
        :validators="{ onChange: requiredText }"
        v-slot="{ field }"
        ><Select
          :value="field.state.value || []"
          @change="(value) => field.handleChange(typeof value === 'string' ? value : '')"
          :options="venues"
          clearable
      /></FormField>
      <FormField
        name="published"
        label="开放报名 · Switch"
        description="布尔值规则要求开启报名。"
        required
        :validators="{ onChange: enabledRule }"
        v-slot="{ field }"
        ><Switch
          :checked="field.state.value"
          @change="(checked) => field.handleChange(checked)"
          @blur="field.handleBlur()"
          aria-label="开放报名"
      /></FormField>
      <FormField
        name="agreement"
        label="活动条款 · Checkbox"
        description="勾选同意后清除当前错误。"
        required
        :validators="{ onChange: agreementRule }"
        v-slot="{ field }"
        ><Checkbox
          :checked="field.state.value"
          @change="(event) => field.handleChange((event.target as HTMLInputElement).checked)"
          @blur="field.handleBlur()"
          >同意活动条款</Checkbox
        ></FormField
      >
      <FormField
        name="session"
        label="活动形式 · Radio"
        description="请选择一种活动形式，观察单选组的统一错误反馈。"
        required
        :validators="{ onChange: requiredText }"
        v-slot="{ field }"
        ><RadioGroup
          :value="field.state.value"
          @change="(value) => field.handleChange(String(value))"
          :options="sessionOptions"
          orientation="horizontal"
      /></FormField>
      <FormField
        name="date"
        label="活动日期 · DatePicker"
        description="空值校验必填；选择日期后清除当前错误。"
        required
        :validators="{ onChange: dateRule }"
        v-slot="{ field }"
        ><DatePicker
          :value="field.state.value"
          @change="(value) => field.handleChange(value)"
          clearable
          placeholder="请选择活动日期"
          :input-props="{ onBlur: () => field.handleBlur() }"
      /></FormField>
      <FormField
        name="time"
        label="开始时间 · TimePicker"
        description="选择时间后写入字段；清空后再次校验。"
        required
        :validators="{ onChange: timeRule }"
        v-slot="{ field }"
        ><TimePicker
          :value="field.state.value"
          @change="(value) => field.handleChange(value)"
          allow-clear
          placeholder="请选择开始时间"
          :input-props="{ onBlur: () => field.handleBlur() }"
      /></FormField>
      <FormField
        name="progress"
        label="准备进度 · Slider"
        description="初始为 0%，至少达到 30%；支持拖动和方向键。"
        required
        :validators="{ onChange: progressRule }"
        v-slot="{ field }"
        ><Slider
          :value="field.state.value"
          :min="0"
          :max="100"
          :step="10"
          @change="
            (value) => field.handleChange(typeof value === 'number' ? value : (value[0] ?? 0))
          "
          @blur="field.handleBlur()"
          aria-label="准备进度"
      /></FormField>
      <div class="flex flex-wrap gap-3 border-t border-border pt-4">
        <Button type="submit" variant="solid" color="primary">校验全部字段</Button
        ><Button type="button" @click="setEmailError">设置邮箱错误</Button
        ><Button type="reset" @click="result = ''">清空重试</Button>
      </div>
      <FormSubscribe :selector="(state) => state.values" v-slot="{ value: values }">
        <pre class="overflow-auto rounded-md bg-muted-background p-3 text-xs">{{
          JSON.stringify(values, null, 2)
        }}</pre>
      </FormSubscribe>
    </Form>
    <p v-if="result" role="status" class="text-sm text-muted-foreground">{{ result }}</p>
  </section>
</template>
