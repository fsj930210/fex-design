<script setup lang="ts">
import {
  FormField,
  FormGroup,
  FormLegend,
  FormLabel,
  FormControl,
  FormError,
} from '@fex-design/vue/primitive/form'
import { InputRoot, InputControl } from '@fex-design/vue/primitive/input'
defineOptions({ name: 'AddressFields' })
const props = defineProps<{ prefix: 'shipping' | 'billing'; legend: string }>()
const requiredText = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请填写地址信息'
</script>
<template>
  <FormGroup class="rounded-lg bg-muted-background p-4">
    <FormLegend>{{ props.legend }}</FormLegend>
    <p class="text-xs font-mono text-muted-foreground">字段前缀：{{ props.prefix }}</p>
    <FormField
      :name="`${props.prefix}.city`"
      :validators="{ onChange: requiredText }"
      v-slot="{ field }"
      ><FormLabel required>城市</FormLabel
      ><FormControl
        ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
          ><InputControl @blur="field.handleBlur()" /></InputRoot></FormControl
      ><FormError
    /></FormField>
    <FormField
      :name="`${props.prefix}.street`"
      :validators="{ onChange: requiredText }"
      v-slot="{ field }"
      ><FormLabel required>街道地址</FormLabel
      ><FormControl
        ><InputRoot :value="field.state.value" @change="(value) => field.handleChange(value)"
          ><InputControl @blur="field.handleBlur()" /></InputRoot></FormControl
      ><FormError
    /></FormField>
  </FormGroup>
</template>
