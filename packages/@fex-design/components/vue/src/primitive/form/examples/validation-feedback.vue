<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@tanstack/vue-form'
import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
} from '@fex-design/vue/primitive/date-picker'
import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
} from '@fex-design/vue/primitive/time-picker'
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from '@fex-design/vue/primitive/slider'
import { RadioGroup, Radio } from '@fex-design/vue/primitive/radio'
import type { DatePickerSelectionValue } from '@fex-design/vue/primitive/date-picker'
import type { TimeValue } from '@fex-design/vue/primitive/time-picker'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormError,
  FormSubscribe,
} from '@fex-design/vue/primitive/form'
import { InputRoot, InputControl } from '@fex-design/vue/primitive/input'
import {
  InputNumberRoot,
  InputNumberControl,
  InputNumberActions,
  InputNumberIncrement,
  InputNumberDecrement,
} from '@fex-design/vue/primitive/input-number'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/vue/primitive/select'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
} from '@fex-design/vue/primitive/checkbox'
import { SwitchRoot, SwitchThumb } from '@fex-design/vue/primitive/switch'
import { Button } from '@fex-design/vue/primitive/button'
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
    <FormRoot :form="form">
      <FormField name="title" :validators="{ onChange: requiredText }" v-slot="{ field }"
        ><FormLabel required>活动名称 · Input</FormLabel
        ><FormControl
          ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><InputControl
              @blur="field.handleBlur()"
              placeholder="输入活动名称" /></InputRoot></FormControl
        ><FormDescription>输入和提交均校验必填；失焦标记字段已交互。</FormDescription><FormError
      /></FormField>
      <FormField name="email" :validators="{ onChange: emailRule }" v-slot="{ field }"
        ><FormLabel required>联系邮箱 · Input</FormLabel
        ><FormControl
          ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><InputControl
              @blur="field.handleBlur()"
              placeholder="organizer@example.com" /></InputRoot></FormControl
        ><FormDescription>格式错误展示在当前字段下方。</FormDescription><FormError
      /></FormField>
      <FormField name="capacity" :validators="{ onChange: capacityRule }" v-slot="{ field }"
        ><FormLabel required>活动人数 · InputNumber</FormLabel
        ><FormControl
          ><InputNumberRoot
            :value="field.state.value"
            @change="(value) => field.handleChange(value)"
            ><InputNumberControl @blur="field.handleBlur()" /><InputNumberActions
              ><InputNumberIncrement /><InputNumberDecrement /></InputNumberActions></InputNumberRoot></FormControl
        ><FormDescription>必须填写 1 到 50 的整数；输入 0 或 51 观察范围错误。</FormDescription
        ><FormError
      /></FormField>
      <FormField name="venue" :validators="{ onChange: requiredText }" v-slot="{ field }"
        ><FormLabel required>活动场地 · Select</FormLabel
        ><FormControl
          ><SelectRoot
            :value="field.state.value || []"
            @change="(value) => field.handleChange(typeof value === 'string' ? value : '')"
            :options="venues"
            clearable
            ><SelectTrigger
              :input-props="{
                'aria-label': '活动场地',
              }" /><SelectContent /></SelectRoot></FormControl
        ><FormDescription>选择后清空，观察选择类控件的错误反馈。</FormDescription><FormError
      /></FormField>
      <FormField name="published" :validators="{ onChange: enabledRule }" v-slot="{ field }"
        ><FormLabel required>开放报名 · Switch</FormLabel
        ><FormControl
          ><SwitchRoot
            :checked="field.state.value"
            @change="(checked) => field.handleChange(checked)"
            @blur="field.handleBlur()"
            aria-label="开放报名"
            ><SwitchThumb /></SwitchRoot></FormControl
        ><FormDescription>布尔值规则要求开启报名。</FormDescription><FormError
      /></FormField>
      <FormField name="agreement" :validators="{ onChange: agreementRule }" v-slot="{ field }"
        ><FormLabel required>活动条款 · Checkbox</FormLabel
        ><FormControl
          ><CheckboxRoot
            ><CheckboxControl
              :checked="field.state.value"
              @change="(event) => field.handleChange((event.target as HTMLInputElement).checked)"
              @blur="field.handleBlur()"
              aria-label="同意活动条款"
            /><CheckboxIndicator /><CheckboxLabel>同意活动条款</CheckboxLabel></CheckboxRoot
          ></FormControl
        ><FormDescription>勾选同意后清除当前错误。</FormDescription><FormError
      /></FormField>
      <FormField name="session" :validators="{ onChange: requiredText }" v-slot="{ field }"
        ><FormLabel required>活动形式 · Radio</FormLabel
        ><FormControl
          ><RadioGroup
            :value="field.state.value"
            @change="(value) => field.handleChange(String(value))"
            orientation="horizontal"
            ><label
              v-for="option in sessionOptions"
              :key="option.value"
              class="inline-flex items-center gap-2"
              ><Radio :value="option.value" />{{ option.label }}</label
            ></RadioGroup
          ></FormControl
        ><FormDescription>请选择一种活动形式，观察单选组的统一错误反馈。</FormDescription
        ><FormError
      /></FormField>
      <FormField name="date" :validators="{ onChange: dateRule }" v-slot="{ field }"
        ><FormLabel required>活动日期 · DatePicker</FormLabel
        ><FormControl
          ><DatePickerRoot
            :value="field.state.value"
            @change="(value) => field.handleChange(value)"
            clearable
            ><DatePickerTrigger
              placeholder="请选择活动日期"
              :input-props="{ onBlur: () => field.handleBlur() }" /><DatePickerContent
              ><DatePickerPanel /><DatePickerFooter /></DatePickerContent></DatePickerRoot></FormControl
        ><FormDescription>空值校验必填；选择日期后清除当前错误。</FormDescription><FormError
      /></FormField>
      <FormField name="time" :validators="{ onChange: timeRule }" v-slot="{ field }"
        ><FormLabel required>开始时间 · TimePicker</FormLabel
        ><FormControl
          ><TimePickerRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><TimePickerTrigger
              allow-clear
              placeholder="请选择开始时间"
              :input-props="{ onBlur: () => field.handleBlur() }" /><TimePickerPortal
              ><TimePickerContent
                ><TimePickerPanel
                  ><TimePickerHourColumn /><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal></TimePickerRoot></FormControl
        ><FormDescription>选择时间后写入字段；清空后再次校验。</FormDescription><FormError
      /></FormField>
      <FormField name="progress" :validators="{ onChange: progressRule }" v-slot="{ field }"
        ><FormLabel required>准备进度 · Slider</FormLabel
        ><FormControl
          ><SliderRoot
            :value="[field.state.value]"
            :min="0"
            :max="100"
            :step="10"
            @change="(value) => field.handleChange(value[0] ?? 0)"
            ><SliderTrack><SliderRange /></SliderTrack
            ><SliderThumb
              @blur="field.handleBlur()"
              aria-label="准备进度" /></SliderRoot></FormControl
        ><FormDescription>初始为 0%，至少达到 30%；支持拖动和方向键。</FormDescription><FormError
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
    </FormRoot>
    <p v-if="result" role="status" class="text-sm text-muted-foreground">{{ result }}</p>
  </section>
</template>
