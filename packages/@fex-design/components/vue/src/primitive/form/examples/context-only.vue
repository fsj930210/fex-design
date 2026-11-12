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
  FormSubscribe,
} from '@fex-design/vue/primitive/form'
import { InputRoot, InputControl } from '@fex-design/vue/primitive/input'
import { Button } from '@fex-design/vue/primitive/button'
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
    <FormRoot :form="form" :component="false">
      <div class="grid gap-4 rounded-md border border-border p-4" aria-label="个人资料编辑区">
        <FormField name="nickname" :validators="{ onChange: nameRule }" v-slot="{ field }"
          ><FormLabel required>昵称</FormLabel
          ><FormControl
            ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
              ><InputControl @blur="field.handleBlur()" /></InputRoot></FormControl
          ><FormDescription>这项资料只在当前面板中编辑。</FormDescription><FormError
        /></FormField>
        <FormField name="signature" :validators="{ onChange: signatureRule }" v-slot="{ field }"
          ><FormLabel required>个人签名</FormLabel
          ><FormControl
            ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
              ><InputControl @blur="field.handleBlur()" /></InputRoot></FormControl
          ><FormDescription>至少 10 个字符，错误消息仍由 FormError 展示。</FormDescription
          ><FormError
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
    </FormRoot>
    <p role="status" class="text-sm text-muted-foreground">{{ result }}</p>
  </section>
</template>
