<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { InputRoot, InputControl } from '@fex-design/vue/primitive/input'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/vue/primitive/select'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
} from '@fex-design/vue/primitive/checkbox'
import { ref } from 'vue'
import {
  FormRoot,
  FormField,
  FormControl,
  FormLabel,
  FormDescription,
  FormError,
  FormSubscribe,
} from '@fex-design/vue/primitive/form'
import { Button } from '@fex-design/vue/primitive/button'

defineOptions({ name: 'BasicExample' })

const departments = [
  { value: 'product', label: '产品与设计' },
  { value: 'engineering', label: '研发团队' },
  { value: 'operations', label: '客户运营' },
]
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写此项'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
const departmentRule = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请选择所属部门'
const agreementRule = ({ value }: { value: unknown }) =>
  value === true ? undefined : '请确认接收项目进度邮件'
const result = ref<string>('')
const form = useForm({
  defaultValues: { name: '', email: '', department: 'product', notifications: true },

  onSubmit: async ({ value }) => {
    result.value = `已保存 ${value.name} 的资料，通知将发送至 ${value.email}。`
  },
})
</script>
<template>
  <section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">团队成员资料</h3>
      <p class="text-sm text-muted-foreground">
        填写团队成员资料，使用输入框、部门选择和通知偏好完成保存。
      </p>
    </header>
    <FormRoot :form="form">
      <FormField
        name="name"
        :validators="{ onChange: requiredText, onBlur: requiredText, onSubmit: requiredText }"
        v-slot="{ field }"
      >
        <FormLabel required>姓名</FormLabel>
        <FormControl
          ><InputRoot
            ><InputControl
              :value="field.state.value"
              @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
              :placeholder="'请输入联系人姓名'" /></InputRoot
        ></FormControl>
        <FormError />
      </FormField>
      <FormField
        name="email"
        :validators="{ onChange: emailRule, onBlur: emailRule, onSubmit: emailRule }"
        v-slot="{ field }"
      >
        <FormLabel required>工作邮箱</FormLabel>
        <FormControl
          ><InputRoot
            ><InputControl
              :value="field.state.value"
              @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
              :placeholder="'name@company.com'" /></InputRoot
        ></FormControl>
        <FormError />
      </FormField>
      <FormField
        name="department"
        default-value="product"
        required
        :validators="{ onChange: requiredText, onBlur: departmentRule, onSubmit: departmentRule }"
        v-slot="{ field }"
      >
        <FormLabel required>所属部门</FormLabel>
        <FormControl>
          <SelectRoot
            default-value="product"
            :value="field.state.value"
            :options="departments"
            clearable
            @change="(value) => field.handleChange(value)"
          >
            <SelectTrigger />
            <SelectContent />
          </SelectRoot>
        </FormControl>
        <FormDescription>用于分配项目通知和审批权限。</FormDescription>
        <FormError />
      </FormField>
      <FormField
        name="notifications"
        :default-value="true"
        :validators="{ onChange: agreementRule, onBlur: agreementRule, onSubmit: agreementRule }"
        v-slot="{ field }"
      >
        <CheckboxRoot>
          <FormControl
            ><CheckboxControl
              :checked="field.state.value"
              @change="(event) => field.handleChange((event.target as HTMLInputElement).checked)"
          /></FormControl>
          <CheckboxIndicator />
          <FormLabel>接收项目进度邮件</FormLabel>
        </CheckboxRoot>
        <FormError />
      </FormField>
      <FormSubscribe :selector="(state) => state.isSubmitting" v-slot="{ value: busy }">
        <div class="flex flex-wrap gap-3 border-t border-border pt-4">
          <Button type="submit" variant="solid" color="primary" :loading="busy">保存资料</Button>
          <Button type="reset" :disabled="busy">重置</Button>
        </div>
      </FormSubscribe>
    </FormRoot>
    <p v-if="result" role="status" class="rounded-md bg-muted-background p-3 text-sm">
      {{ result }}
    </p>
  </section>
</template>
