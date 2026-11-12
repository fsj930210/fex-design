<script lang="ts">
export interface PhoneValue {
  countryCode: '+86' | '+852'
  number: string
}
</script>
<script setup lang="ts">
import { Input } from '@fex-design/vue/ui/input'
import { Button } from '@fex-design/vue/ui/button'
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
    <Input
      :value="props.value.number"
      @input="
        (event) =>
          emit('change', { ...props.value, number: (event.target as HTMLInputElement).value })
      "
      @blur="emit('blur')"
      placeholder="请输入号码"
    />
  </div>
</template>
