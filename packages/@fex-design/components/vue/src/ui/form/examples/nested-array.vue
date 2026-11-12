<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@tanstack/vue-form'
import { Form, FormField, FormSubscribe } from '@fex-design/vue/ui/form'
import { Input } from '@fex-design/vue/ui/input'
import { Button } from '@fex-design/vue/ui/button'
defineOptions({ name: 'NestedArrayExample' })
const initialValues = {
  team: { name: '产品组' },
  members: [{ id: 'member-1', name: '林晓', email: 'lin@example.com' }],
}
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写姓名或团队名称'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
const nameValidators = { onChange: requiredText }
const emailValidators = { onChange: emailRule }
const result = ref('')
const form = useForm({
  defaultValues: initialValues,
  onSubmit: ({ value }) => {
    result.value = '已保存 ' + value.team.name + '，成员 ' + value.members.length + ' 人'
  },
})
function addMember() {
  form.pushFieldValue('members', { id: crypto.randomUUID(), name: '', email: '' })
}
</script>
<template>
  <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">团队与动态成员</h3>
      <p class="text-sm text-muted-foreground">
        team.name 使用嵌套对象路径；成员使用数组路径。新增和删除直接调用 TanStack
        API，每个成员用自己的 id 保持身份。
      </p>
    </header>
    <Form :form="form">
      <FormField
        name="team.name"
        :validators="nameValidators"
        v-slot="{ field }"
        label="团队名称"
        required
        ><Input
          :value="field.state.value"
          @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
          @blur="field.handleBlur()"
      /></FormField>
      <FormSubscribe :selector="(state) => state.values.members" v-slot="{ value: members }">
        <div class="grid gap-4">
          <section
            v-for="(member, index) in members"
            :key="member.id"
            class="grid gap-3 rounded-md border border-border p-4"
            :aria-label="`成员 ${index + 1}`"
          >
            <div class="flex items-center justify-between gap-3">
              <h4 class="font-medium">成员 {{ index + 1 }}</h4>
              <Button
                type="button"
                @click="form.removeFieldValue('members', index)"
                :aria-label="`删除成员 ${index + 1}`"
                >删除</Button
              >
            </div>
            <FormField
              :name="`members[${index}].name`"
              :validators="nameValidators"
              v-slot="{ field }"
              label="成员姓名"
              required
              ><Input
                :value="field.state.value"
                @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
                @blur="field.handleBlur()"
            /></FormField>
            <FormField
              :name="`members[${index}].email`"
              :validators="emailValidators"
              v-slot="{ field }"
              label="成员邮箱"
              required
              ><Input
                :value="field.state.value"
                @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
                @blur="field.handleBlur()"
            /></FormField>
          </section>
          <Button type="button" @click="addMember">新增成员</Button>
        </div>
      </FormSubscribe>
      <Button type="submit" variant="solid" color="primary">保存团队</Button>
      <FormSubscribe :selector="(state) => state.values" v-slot="{ value: values }">
        <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{{
          JSON.stringify(values, null, 2)
        }}</pre>
      </FormSubscribe>
    </Form>
    <p role="status" class="text-sm text-muted-foreground">{{ result }}</p>
  </section>
</template>
