<script setup lang="ts">
import type { CheckboxValue } from '@fex-design/core/checkbox/types'
import Checkbox from './checkbox.vue'
import { CheckboxGroup as PrimitiveCheckboxGroup } from '../../primitive/checkbox/checkbox'
defineOptions({ name: 'CheckboxGroup' })
defineProps<{
  value?: CheckboxValue[]
  defaultValue?: CheckboxValue[]
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  options?: { label: string; value: CheckboxValue; disabled?: boolean }[]
}>()
defineEmits<{ change: [value: CheckboxValue[], meta: unknown] }>()
</script>
<template>
  <PrimitiveCheckboxGroup
    :value="value"
    :default-value="defaultValue"
    :disabled="disabled"
    :name="name"
    :orientation="orientation"
    @change="(value, meta) => $emit('change', value, meta)"
    ><template v-if="options"
      ><Checkbox
        v-for="option in options"
        :key="String(option.value)"
        :value="option.value"
        :disabled="option.disabled"
        >{{ option.label }}</Checkbox
      ></template
    ><slot v-else
  /></PrimitiveCheckboxGroup>
</template>
