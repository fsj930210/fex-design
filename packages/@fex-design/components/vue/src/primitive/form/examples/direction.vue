<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@tanstack/vue-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormError,
} from '@fex-design/vue/primitive/form'
import { InputRoot, InputControl } from '@fex-design/vue/primitive/input'
import { Button } from '@fex-design/vue/primitive/button'
defineOptions({ name: 'DirectionExample' })
const nameRule = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请输入账号名称'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
const direction = ref<'ltr' | 'rtl'>('ltr')
const result = ref('')
const form = useForm({
  defaultValues: { account: '', email: '' },
  onSubmit: ({ value }) => {
    result.value = '已保存账号：' + value.account
  },
})
</script>
<template>
  <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">LTR 与 RTL 表单方向</h3>
      <p class="text-sm text-muted-foreground">
        切换原生
        dir，观察横向布局的标签列、说明、错误与操作区如何镜像；切换方向保留当前值和校验状态。
      </p>
    </header>
    <div class="flex items-center gap-3">
      <Button type="button" @click="direction = direction === 'ltr' ? 'rtl' : 'ltr'"
        >切换为 {{ direction === 'ltr' ? 'RTL' : 'LTR' }}</Button
      ><span>当前方向：{{ direction.toUpperCase() }}</span>
    </div>
    <FormRoot
      :form="form"
      :dir="direction"
      layout="horizontal"
      label-align="end"
      label-width="8rem"
      label-wrap
    >
      <FormField name="account" :validators="{ onChange: nameRule }" v-slot="{ field }"
        ><FormLabel required>账号名称</FormLabel
        ><FormControl
          ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><InputControl @blur="field.handleBlur()" /></InputRoot></FormControl
        ><FormDescription>说明和错误始终与控件列对齐。</FormDescription><FormError
      /></FormField>
      <FormField name="email" :validators="{ onChange: emailRule }" v-slot="{ field }"
        ><FormLabel required>团队通知联系邮箱</FormLabel
        ><FormControl
          ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><InputControl @blur="field.handleBlur()" /></InputRoot></FormControl
        ><FormDescription>长标签允许换行，方向切换保留输入内容。</FormDescription><FormError
      /></FormField>
      <div data-slot="form-actions" class="flex flex-wrap gap-3">
        <Button type="submit" variant="solid" color="primary">保存账号</Button>
      </div>
    </FormRoot>
    <p role="status" class="text-sm text-muted-foreground">{{ result }}</p>
  </section>
</template>
