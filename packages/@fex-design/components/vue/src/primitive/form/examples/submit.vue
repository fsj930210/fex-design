<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@tanstack/vue-form'
import {
  FormRoot,
  FormField,
  FormControl,
  FormLabel,
  FormError,
  FormSubscribe,
} from '@fex-design/vue/primitive/form'
import { InputRoot, InputControl } from '@fex-design/vue/primitive/input'
import { Button } from '@fex-design/vue/primitive/button'
defineOptions({ name: 'SubmitExample' })
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
const validators = { onChange: emailRule, onSubmit: emailRule }
const receipt = ref('尚未提交申请')
const form = useForm({
  defaultValues: { email: '' },
  onSubmit: async ({ value, formApi }) => {
    receipt.value = '正在发送申请，请等待…'
    await new Promise<void>((resolve) => setTimeout(resolve, 900))
    if (value.email === 'used@example.com') {
      formApi.setFieldMeta('email', (meta) => ({
        ...meta,
        errorMap: { ...meta.errorMap, onSubmit: '该邮箱已有申请，请更换邮箱' },
      }))
      receipt.value = '申请未发送，请处理邮箱错误后重试'
      return
    }
    receipt.value = '申请已发送至 ' + value.email
  },
})
</script>
<template>
  <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">申请产品试用</h3>
      <p class="text-sm text-muted-foreground">
        模拟请求等待 900ms。使用占用邮箱查看业务错误，修改邮箱后重试；提交期间禁止修改和重复发送。
      </p>
    </header>
    <FormRoot :form="form">
      <FormSubscribe
        :selector="(state) => ({ busy: state.isSubmitting, attempts: state.submissionAttempts })"
        v-slot="{ value: state }"
      >
        <FormField name="email" :validators="validators" v-slot="{ field }"
          ><FormLabel required>申请邮箱</FormLabel
          ><FormControl
            ><InputRoot
              :disabled="state.busy"
              :value="field.state.value"
              @change="(value) => field.handleChange(value)"
              ><InputControl
                @blur="field.handleBlur()"
                placeholder="name@company.com" /></InputRoot></FormControl
          ><FormError
        /></FormField>
        <div class="flex flex-wrap items-center gap-3">
          <Button type="submit" color="primary" variant="solid" :disabled="state.busy">{{
            state.busy ? '正在发送…' : '发送申请'
          }}</Button>
          <Button
            type="button"
            :disabled="state.busy"
            @click="form.setFieldValue('email', 'used@example.com')"
            >使用占用邮箱</Button
          >
        </div>
        <p role="status" class="text-sm text-muted-foreground">
          {{ state.busy ? '请求处理中，不能重复提交' : '可以提交' }}；提交尝试：{{ state.attempts }}
          次（含校验未通过）
        </p>
      </FormSubscribe>
    </FormRoot>
    <p role="status" class="rounded-md bg-muted-background p-3 text-sm">{{ receipt }}</p>
  </section>
</template>
