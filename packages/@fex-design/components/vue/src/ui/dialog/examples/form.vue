<script setup lang="ts">
import { Dialog } from '@fex-design/vue/ui/dialog'
import { useForm } from '@tanstack/vue-form'
import { Input } from '@fex-design/vue/ui/input'
import { Select } from '@fex-design/vue/ui/select'
import { Checkbox } from '@fex-design/vue/ui/checkbox'
import { ref } from 'vue'
import { Form, FormField } from '@fex-design/vue/ui/form'
import { Button } from '@fex-design/vue/ui/button'

defineOptions({ name: 'DialogFormExample' })

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
const open = ref(false)
const result = ref<string>('')
const form = useForm({
  defaultValues: { name: '', email: '', department: 'product', notifications: true },

  onSubmit: async ({ value }) => {
    result.value = `已保存 ${value.name} 的资料，通知将发送至 ${value.email}。`

    open.value = false
  },
})
</script>
<template>
  <Button @click="open = true">打开表单弹窗</Button>
  <p role="status">{{ result || '尚未提交' }}</p>
  <Dialog v-model:open="open" title="编辑团队成员"
    ><Form :form="form">
      <FormField
        name="name"
        label="姓名"
        required
        :validators="{ onChange: requiredText, onBlur: requiredText, onSubmit: requiredText }"
        v-slot="{ field }"
      >
        <Input
          :value="field.state.value"
          @change="(event) => field.handleChange((event.target as HTMLInputElement).value)"
          placeholder="请输入联系人姓名"
        />
      </FormField>
      <FormField
        name="email"
        label="工作邮箱"
        required
        :validators="{ onChange: emailRule, onBlur: emailRule, onSubmit: emailRule }"
        v-slot="{ field }"
      >
        <Input
          :value="field.state.value"
          @change="(event) => field.handleChange((event.target as HTMLInputElement).value)"
          placeholder="name@company.com"
        />
      </FormField>
      <FormField
        name="department"
        default-value="product"
        label="所属部门"
        required
        :validators="{ onChange: requiredText, onBlur: departmentRule, onSubmit: departmentRule }"
        description="用于分配项目通知和审批权限。"
        class="gap-1"
        v-slot="{ field }"
      >
        <Select
          default-value="product"
          :value="field.state.value"
          :options="departments"
          clearable
          @change="(value) => field.handleChange(value)"
        />
      </FormField>
      <FormField
        name="notifications"
        :default-value="true"
        :validators="{ onChange: agreementRule, onSubmit: agreementRule }"
        v-slot="{ field }"
      >
        <Checkbox
          :checked="field.state.value"
          @change="(event) => field.handleChange((event.target as HTMLInputElement).checked)"
          >接收项目进度邮件</Checkbox
        >
      </FormField> </Form
    ><template #footer
      ><Button @click="open = false">取消</Button
      ><Button variant="solid" color="primary" @click="form.handleSubmit()"
        >保存资料</Button
      ></template
    ></Dialog
  >
</template>
