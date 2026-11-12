<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@tanstack/vue-form'
import { Form, FormField, FormSubscribe } from '@fex-design/vue/ui/form'
import { Button } from '@fex-design/vue/ui/button'
import PhoneControl, { type PhoneValue } from './_phone-control.vue'
defineOptions({ name: 'CustomControlExample' })
const phoneRule = ({ value }: { value: PhoneValue }) =>
  (value.countryCode === '+86' ? /^\d{11}$/ : /^\d{8}$/).test(value.number)
    ? undefined
    : '请输入有效手机号：+86 为 11 位，+852 为 8 位'
const result = ref('')
const form = useForm({
  defaultValues: { phone: { countryCode: '+86', number: '' } as PhoneValue },
  onSubmit: ({ value }) => {
    result.value = '已保存手机号：' + value.phone.countryCode + ' ' + value.phone.number
  },
})
function resetPhone() {
  form.reset()
  result.value = ''
}
</script>
<template>
  <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">自定义手机号控件</h3>
      <p class="text-sm text-muted-foreground">
        控件返回包含区号和号码的对象，调用方显式连接
        value、变更和失焦。点击区号切换规则并清空号码，无需 getValueProps 或事件转换配置。
      </p>
    </header>
    <Form :form="form">
      <FormField
        name="phone"
        label="手机号"
        description="点击区号按钮切换；切换后重新填写号码。"
        required
        :validators="{ onChange: phoneRule }"
        v-slot="{ field }"
        ><PhoneControl
          :value="field.state.value"
          @change="(value) => field.handleChange(value)"
          @blur="field.handleBlur()"
      /></FormField>
      <div class="flex flex-wrap gap-3">
        <Button type="submit" variant="solid" color="primary">保存手机号</Button
        ><Button type="button" @click="resetPhone">重置控件</Button>
      </div>
      <FormSubscribe :selector="(state) => state.values" v-slot="{ value: values }">
        <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{{
          JSON.stringify(values, null, 2)
        }}</pre>
      </FormSubscribe>
    </Form>
    <p role="status" class="text-sm text-muted-foreground">{{ result }}</p>
  </section>
</template>
