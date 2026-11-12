<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@tanstack/vue-form'
import { Form, FormField, FormSubscribe } from '@fex-design/vue/ui/form'
import { Input } from '@fex-design/vue/ui/input'
import { Button } from '@fex-design/vue/ui/button'
defineOptions({ name: 'ResetExample' })
const initialProfile = { name: '林晓', email: 'lin@example.com' }
const loadedProfile = { name: '陈晨', email: 'chen@example.com' }
const action = ref('当前为初始化资料')
const form = useForm({ defaultValues: initialProfile })
function fillProfile() {
  form.setFieldValue('name', loadedProfile.name)
  form.setFieldValue('email', loadedProfile.email)
  action.value = '已回填陈晨的资料，初始化值仍为林晓'
}
function resetName() {
  form.resetField('name')
  action.value = '已重置姓名，邮箱保持当前值'
}
function resetAll() {
  form.reset()
  action.value = '已恢复全部初始化资料'
}
</script>
<template>
  <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">资料回填与重置</h3>
      <p class="text-sm text-muted-foreground">
        回填只修改当前值；重置姓名只恢复姓名，重置全部恢复初始化资料和字段状态。
      </p>
    </header>
    <Form :form="form">
      <FormField name="name" label="姓名" v-slot="{ field }"
        ><Input
          :value="field.state.value"
          @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
          @blur="field.handleBlur()"
      /></FormField>
      <FormField name="email" label="邮箱" v-slot="{ field }"
        ><Input
          :value="field.state.value"
          @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
          @blur="field.handleBlur()"
      /></FormField>
      <div class="flex flex-wrap gap-3">
        <Button type="button" @click="fillProfile">回填资料</Button>
        <Button type="button" @click="resetName">仅重置姓名</Button>
        <Button type="button" @click="resetAll">重置全部</Button>
      </div>
      <FormSubscribe :selector="(state) => state.values" v-slot="{ value: values }">
        <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{{
          JSON.stringify(values, null, 2)
        }}</pre>
      </FormSubscribe>
    </Form>
    <p role="status" class="text-sm text-muted-foreground">{{ action }}</p>
  </section>
</template>
