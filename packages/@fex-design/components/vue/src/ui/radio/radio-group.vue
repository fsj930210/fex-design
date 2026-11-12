<script setup lang="ts">
import { RadioGroup as PrimitiveRadioGroup, type RadioValue } from '@fex-design/vue/primitive/radio'
import Radio from './radio.vue'
defineOptions({ name: 'RadioGroup' })
defineProps<{
  value?: RadioValue
  defaultValue?: RadioValue
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  options?: readonly { label: string; value: RadioValue; disabled?: boolean }[]
}>()
const emit = defineEmits<{ change: [value: RadioValue, meta: unknown] }>()
</script>
<template>
  <PrimitiveRadioGroup
    :value="value"
    :default-value="defaultValue"
    :disabled="disabled"
    :orientation="orientation"
    @change="(value, meta) => emit('change', value, meta)"
    ><template v-if="options"
      ><Radio
        v-for="option in options"
        :key="String(option.value)"
        :value="option.value"
        :disabled="option.disabled"
        >{{ option.label }}</Radio
      ></template
    ><slot v-else
  /></PrimitiveRadioGroup>
</template>
