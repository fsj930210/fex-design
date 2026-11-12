<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@tanstack/vue-form'
import { Form, FormField, FormSubscribe } from '@fex-design/vue/ui/form'
import { Input } from '@fex-design/vue/ui/input'
import { Button } from '@fex-design/vue/ui/button'
defineOptions({ name: 'ContextOnlyExample' })
const nameRule = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请输入昵称'
const signatureRule = ({ value }: { value: unknown }) =>
  String(value).trim().length >= 10 ? undefined : '签名至少需要 10 个字符'
const result = ref('')
const form = useForm({
  defaultValues: { nickname: '小林', signature: '' },
  onSubmit: ({ value }) => {
    result.value = '已保存 ' + value.nickname + ' 的个人签名'
  },
})
function resetProfile() {
  form.reset()
  result.value = ''
}
</script>
<template>
  <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">个人资料面板：只提供上下文</h3>
      <p class="text-sm text-muted-foreground">
        业务面板组织内容和操作按钮，Form 只提供字段上下文，不输出原生 form。保存按钮直接调用
        TanStack handleSubmit，恢复按钮调用 reset。
      </p>
    </header>
    <Form :form="form" :component="false">
      <div class="grid gap-4 rounded-md border border-border p-4" aria-label="个人资料编辑区">
        <FormField
          name="nickname"
          label="昵称"
          description="这项资料只在当前面板中编辑。"
          required
          :validators="{ onChange: nameRule }"
          v-slot="{ field }"
          ><Input
            :value="field.state.value"
            @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
            @blur="field.handleBlur()"
        /></FormField>
        <FormField
          name="signature"
          label="个人签名"
          description="至少 10 个字符，错误消息仍由 FormError 展示。"
          required
          :validators="{ onChange: signatureRule }"
          v-slot="{ field }"
          ><Input
            :value="field.state.value"
            @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
            @blur="field.handleBlur()"
        /></FormField>
      </div>
      <div class="flex flex-wrap gap-3">
        <Button type="button" variant="solid" color="primary" @click="form.handleSubmit()"
          >保存签名</Button
        >
        <Button type="button" @click="resetProfile">恢复初始资料</Button>
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
