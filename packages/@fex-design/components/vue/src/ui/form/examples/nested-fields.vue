<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@tanstack/vue-form'
import { Form, FormField, FormSubscribe } from '@fex-design/vue/ui/form'
import { Input } from '@fex-design/vue/ui/input'
import { Button } from '@fex-design/vue/ui/button'
defineOptions({ name: 'NestedFieldsExample' })
const initialValues = {
  groups: [
    {
      id: 'group-1',
      name: '产品组',
      members: [{ id: 'member-1', name: '林晓', email: 'lin@example.com' }],
    },
  ],
}
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写名称'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
const nameValidators = { onChange: requiredText }
const emailValidators = { onChange: emailRule }
const result = ref('')
const form = useForm({
  defaultValues: initialValues,
  onSubmit: ({ value }) => {
    result.value =
      '已保存 ' +
      value.groups.length +
      ' 个分组，' +
      value.groups.reduce((sum, group) => sum + group.members.length, 0) +
      ' 位成员'
  },
})
function addGroup() {
  form.pushFieldValue('groups', { id: crypto.randomUUID(), name: '', members: [] })
}
function addMember(groupIndex: number) {
  form.pushFieldValue(`groups[${groupIndex}].members`, {
    id: crypto.randomUUID(),
    name: '',
    email: '',
  })
}
function removeGroup(groupIndex: number) {
  void form.removeFieldValue('groups', groupIndex)
}
function removeMember(groupIndex: number, memberIndex: number) {
  void form.removeFieldValue(`groups[${groupIndex}].members`, memberIndex)
}
function resetGroups() {
  form.reset()
  result.value = ''
}
</script>
<template>
  <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">动态分组与嵌套成员</h3>
      <p class="text-sm text-muted-foreground">
        外层分组和内层成员均可增删。每一层以数据 id
        保持身份，字段路径使用当前数组位置；删除前一项后继续编辑和校验。
      </p>
    </header>
    <Form :form="form">
      <FormSubscribe :selector="(state) => state.values.groups" v-slot="{ value: groups }">
        <div class="grid gap-4">
          <section
            v-for="(group, groupIndex) in groups"
            :key="group.id"
            class="grid gap-4 rounded-lg bg-muted-background p-4"
            :aria-label="`分组 ${groupIndex + 1}`"
          >
            <div class="flex items-center justify-between gap-3">
              <h4 class="font-semibold">分组 {{ groupIndex + 1 }}</h4>
              <Button
                type="button"
                @click="removeGroup(groupIndex)"
                :aria-label="`删除分组 ${groupIndex + 1}`"
                >删除分组</Button
              >
            </div>
            <FormField
              :name="`groups[${groupIndex}].name`"
              label="分组名称"
              required
              :validators="nameValidators"
              v-slot="{ field }"
              ><Input
                :value="field.state.value"
                @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
                @blur="field.handleBlur()"
            /></FormField>
            <section
              v-for="(member, memberIndex) in group.members"
              :key="member.id"
              class="grid gap-3 rounded-md border border-border p-3"
              :aria-label="`成员 ${memberIndex + 1}`"
            >
              <div class="flex items-center justify-between gap-3">
                <h5 class="font-medium">成员 {{ memberIndex + 1 }}</h5>
                <Button
                  type="button"
                  @click="removeMember(groupIndex, memberIndex)"
                  :aria-label="`删除成员 ${memberIndex + 1}`"
                  >删除成员</Button
                >
              </div>
              <FormField
                :name="`groups[${groupIndex}].members[${memberIndex}].name`"
                label="成员姓名"
                required
                :validators="nameValidators"
                v-slot="{ field }"
                ><Input
                  :value="field.state.value"
                  @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
                  @blur="field.handleBlur()"
              /></FormField>
              <FormField
                :name="`groups[${groupIndex}].members[${memberIndex}].email`"
                label="成员邮箱"
                required
                :validators="emailValidators"
                v-slot="{ field }"
                ><Input
                  :value="field.state.value"
                  @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
                  @blur="field.handleBlur()"
              /></FormField>
            </section>
            <Button
              type="button"
              @click="addMember(groupIndex)"
              :aria-label="`为分组 ${groupIndex + 1} 新增成员`"
              >新增成员</Button
            >
          </section>
        </div>
      </FormSubscribe>
      <div class="flex flex-wrap gap-3">
        <Button type="button" @click="addGroup">新增分组</Button
        ><Button type="submit" variant="solid" color="primary">保存所有分组</Button
        ><Button type="button" @click="resetGroups">重置所有分组</Button>
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
