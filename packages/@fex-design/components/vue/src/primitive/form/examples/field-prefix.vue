<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@tanstack/vue-form'
import { FormRoot, FormSubscribe } from '@fex-design/vue/primitive/form'
import { Button } from '@fex-design/vue/primitive/button'
import AddressFields from './_address-fields.vue'
defineOptions({ name: 'FieldPrefixExample' })
const result = ref('')
const form = useForm({
  defaultValues: { shipping: { city: '上海', street: '' }, billing: { city: '杭州', street: '' } },
  onSubmit: () => {
    result.value = '已保存寄送地址和账单地址'
  },
})
function copyAddress() {
  form.setFieldValue('billing', { ...form.state.values.shipping })
}
function resetAddresses() {
  form.reset()
  result.value = ''
}
</script>
<template>
  <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">复用带路径前缀的地址字段组</h3>
      <p class="text-sm text-muted-foreground">
        同一个地址组件分别接收 shipping 和 billing 前缀，显式组成字段路径。两组共用一个 TanStack
        实例，值和校验分别归属各自路径。
      </p>
    </header>
    <FormRoot :form="form">
      <AddressFields prefix="shipping" legend="寄送地址" />
      <AddressFields prefix="billing" legend="账单地址" />
      <div class="flex flex-wrap gap-3">
        <Button type="button" @click="copyAddress">复制寄送地址到账单</Button
        ><Button type="submit" variant="solid" color="primary">保存两组地址</Button
        ><Button type="button" @click="resetAddresses">重置两组地址</Button>
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
