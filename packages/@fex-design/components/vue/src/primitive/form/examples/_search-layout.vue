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
const props = defineProps<{
  layout: 'vertical' | 'horizontal' | 'inline'
  options: { labelAlign: 'start' | 'end'; labelWidth: string; labelGap: string; labelWrap: boolean }
}>()
const titles = { vertical: '纵向布局', horizontal: '横向布局', inline: '行内布局' }
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写此项'
const result = ref('')
const form = useForm({
  defaultValues: { name: '', project: '', approval: '' },
  onSubmit: ({ value }) => {
    result.value = JSON.stringify(value)
  },
})
</script>
<template>
  <section class="grid min-w-0 gap-3 rounded-lg border border-border p-4">
    <h4 class="text-sm font-semibold">{{ titles[props.layout] }}</h4>
    <FormRoot :form="form" :layout="props.layout" v-bind="props.options">
      <FormField
        name="name"
        :validators="{ onBlur: requiredText, onSubmit: requiredText }"
        v-slot="{ field }"
        ><FormLabel required>姓名</FormLabel
        ><FormControl
          ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><InputControl
              @blur="field.handleBlur()"
              placeholder="请输入姓名" /></InputRoot></FormControl
        ><FormError
      /></FormField>
      <FormField
        name="project"
        :validators="{ onBlur: requiredText, onSubmit: requiredText }"
        v-slot="{ field }"
        ><FormLabel required>项目名称</FormLabel
        ><FormControl
          ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><InputControl
              @blur="field.handleBlur()"
              placeholder="请输入项目名称" /></InputRoot></FormControl
        ><FormError
      /></FormField>
      <FormField
        name="approval"
        :validators="{ onBlur: requiredText, onSubmit: requiredText }"
        v-slot="{ field }"
        ><FormLabel required>项目审批负责人联系方式</FormLabel
        ><FormControl
          ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
            ><InputControl
              @blur="field.handleBlur()"
              placeholder="请输入项目审批负责人联系方式" /></InputRoot></FormControl
        ><FormDescription>用于观察长标签换行后，说明和错误是否仍与控件对齐。</FormDescription
        ><FormError
      /></FormField>
      <div data-slot="form-actions" class="flex gap-2">
        <Button type="submit" variant="solid" color="primary">查询</Button
        ><Button type="reset" @click="result = ''">重置</Button>
      </div>
    </FormRoot>
    <p v-if="result" role="status" class="break-all text-sm text-muted-foreground">
      查询条件：{{ result }}
    </p>
  </section>
</template>
