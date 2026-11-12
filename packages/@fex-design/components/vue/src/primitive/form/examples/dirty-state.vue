<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@tanstack/vue-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormSubscribe,
} from '@fex-design/vue/primitive/form'
import { InputRoot, InputControl } from '@fex-design/vue/primitive/input'
import { Button } from '@fex-design/vue/primitive/button'
defineOptions({ name: 'DirtyStateExample' })
const initialProfile = { name: '林晓', email: 'lin@example.com' }
const loadedProfile = { name: '陈晨', email: 'chen@example.com' }
const action = ref('当前为初始化资料')
const form = useForm({ defaultValues: initialProfile })
function fillProfile() {
  form.setFieldValue('name', loadedProfile.name)
  form.setFieldValue('email', loadedProfile.email)
  action.value = '已填入修改值，观察 isDirty 与 isDefaultValue'
}
function resetName() {
  form.setFieldValue('name', initialProfile.name)
  form.setFieldValue('email', initialProfile.email)
  action.value = '已改回初始值，编辑记录仍保留'
}
function resetAll() {
  form.reset()
  action.value = '已重置值与编辑状态'
}
</script>
<template>
  <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">编辑状态与初始值比较</h3>
      <p class="text-sm text-muted-foreground">
        isDirty 记录是否编辑过；isDefaultValue
        比较当前值与初始值。改回初始值不会清除编辑记录，重置状态会清除。
      </p>
    </header>
    <FormRoot :form="form">
      <FormField name="name" v-slot="{ field }"
        ><FormLabel>姓名</FormLabel
        ><FormControl
          ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><InputControl @blur="field.handleBlur()" /></InputRoot></FormControl
      ></FormField>
      <FormField name="email" v-slot="{ field }"
        ><FormLabel>邮箱</FormLabel
        ><FormControl
          ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><InputControl @blur="field.handleBlur()" /></InputRoot></FormControl
      ></FormField>
      <div class="flex flex-wrap gap-3">
        <Button type="button" @click="fillProfile">填入修改值</Button>
        <Button type="button" @click="resetName">改回初始值</Button>
        <Button type="button" @click="resetAll">重置状态</Button>
      </div>
      <FormSubscribe
        :selector="
          (state) => ({
            values: state.values,
            isDirty: state.isDirty,
            isDefaultValue: state.isDefaultValue,
            isTouched: state.isTouched,
          })
        "
        v-slot="{ value: values }"
      >
        <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{{
          JSON.stringify(values, null, 2)
        }}</pre>
      </FormSubscribe>
    </FormRoot>
    <p role="status" class="text-sm text-muted-foreground">{{ action }}</p>
  </section>
</template>
