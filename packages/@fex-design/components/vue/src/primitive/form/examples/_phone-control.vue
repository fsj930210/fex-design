<script lang="ts">
export interface PhoneValue {
  countryCode: '+86' | '+852'
  number: string
}
</script>
<script setup lang="ts">
import { InputRoot, InputControl } from '@fex-design/vue/primitive/input'
import { Button } from '@fex-design/vue/primitive/button'
defineOptions({ name: 'PhoneControl' })
const props = defineProps<{ value: PhoneValue }>()
const emit = defineEmits<{ change: [value: PhoneValue]; blur: [] }>()
</script>
<template>
  <div class="grid grid-cols-[auto_1fr] items-center gap-2">
    <Button
      type="button"
      aria-label="切换区号"
      @click="
        emit('change', {
          countryCode: props.value.countryCode === '+86' ? '+852' : '+86',
          number: '',
        })
      "
      >{{ props.value.countryCode }}</Button
    >
    <InputRoot
      :value="props.value.number"
      @change="(number) => emit('change', { ...props.value, number })"
      ><InputControl @blur="emit('blur')" placeholder="请输入号码"
    /></InputRoot>
  </div>
</template>
