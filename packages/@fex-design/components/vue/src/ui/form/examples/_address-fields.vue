<script setup lang="ts">
import { FormField, FormGroup } from '@fex-design/vue/ui/form'
import { Input } from '@fex-design/vue/ui/input'
defineOptions({ name: 'AddressFields' })
const props = defineProps<{ prefix: 'shipping' | 'billing'; legend: string }>()
const requiredText = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请填写地址信息'
</script>
<template>
  <FormGroup class="rounded-lg bg-muted-background p-4" :legend="props.legend">
    <p class="text-xs font-mono text-muted-foreground">字段前缀：{{ props.prefix }}</p>
    <FormField
      :name="`${props.prefix}.city`"
      label="城市"
      required
      :validators="{ onChange: requiredText }"
      v-slot="{ field }"
      ><Input
        :value="field.state.value"
        @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
        @blur="field.handleBlur()"
    /></FormField>
    <FormField
      :name="`${props.prefix}.street`"
      label="街道地址"
      required
      :validators="{ onChange: requiredText }"
      v-slot="{ field }"
      ><Input
        :value="field.state.value"
        @input="(event) => field.handleChange((event.target as HTMLInputElement).value)"
        @blur="field.handleBlur()"
    /></FormField>
  </FormGroup>
</template>
