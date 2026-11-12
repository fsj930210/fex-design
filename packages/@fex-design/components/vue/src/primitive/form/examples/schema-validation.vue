<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@tanstack/vue-form'
import { z } from 'zod'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormError,
} from '@fex-design/vue/primitive/form'
import { InputRoot, InputControl } from '@fex-design/vue/primitive/input'
import { Button } from '@fex-design/vue/primitive/button'
defineOptions({ name: 'SchemaValidationExample' })
const registrationSchema = z
  .object({
    email: z.email('请输入有效邮箱'),
    password: z.string().min(8, '密码至少需要 8 个字符'),
    confirmation: z.string().min(1, '请再次输入密码'),
  })
  .refine((value) => value.password === value.confirmation, {
    path: ['confirmation'],
    message: '两次输入的密码不一致',
  })
const result = ref('')
const form = useForm({
  defaultValues: { email: '', password: '', confirmation: '' },
  validators: { onChange: registrationSchema, onSubmit: registrationSchema },
  onSubmit: ({ value }) => {
    result.value = '注册校验通过：' + value.email
  },
})
</script>
<template>
  <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">使用 Zod 校验注册信息</h3>
      <p class="text-sm text-muted-foreground">
        对象 Schema 同时校验字段格式和两次密码一致性；确认密码错误归属到对应字段。
      </p>
    </header>
    <FormRoot :form="form">
      <FormField name="email" v-slot="{ field }"
        ><FormLabel required>邮箱</FormLabel
        ><FormControl
          ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><InputControl type="email" @blur="field.handleBlur()" /></InputRoot></FormControl
        ><FormError
      /></FormField>
      <FormField name="password" v-slot="{ field }"
        ><FormLabel required>密码</FormLabel
        ><FormControl
          ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><InputControl type="password" @blur="field.handleBlur()" /></InputRoot></FormControl
        ><FormError
      /></FormField>
      <FormField name="confirmation" v-slot="{ field }"
        ><FormLabel required>确认密码</FormLabel
        ><FormControl
          ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><InputControl type="password" @blur="field.handleBlur()" /></InputRoot></FormControl
        ><FormError
      /></FormField>
      <Button type="submit" variant="solid" color="primary">注册</Button>
    </FormRoot>
    <p v-if="result" role="status" class="rounded-md bg-muted-background p-3 text-sm">
      {{ result }}
    </p>
  </section>
</template>
