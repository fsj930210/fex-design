<script setup lang="ts">
import {
  RadioButton,
  RadioGroup as PrimitiveRadioGroup,
  type RadioValue,
} from '@fex-design/vue/primitive/radio/radio'
defineOptions({ name: 'RadioButtonGroup' })
withDefaults(
  defineProps<{
    value?: RadioValue
    defaultValue?: RadioValue
    disabled?: boolean
    orientation?: 'horizontal' | 'vertical'
    options?: readonly { label: string; value: RadioValue; disabled?: boolean }[]
  }>(),
  { orientation: 'horizontal' },
)
defineEmits<{ valueChange: [value: RadioValue, meta: unknown] }>()
</script>
<template>
  <PrimitiveRadioGroup
    class="gap-0"
    :value="value"
    :default-value="defaultValue"
    :disabled="disabled"
    :orientation="orientation"
    @value-change="(value, meta) => $emit('valueChange', value, meta)"
    ><template v-if="options"
      ><RadioButton
        v-for="option in options"
        :key="String(option.value)"
        :value="option.value"
        :disabled="option.disabled"
        >{{ option.label }}</RadioButton
      ></template
    ><slot v-else
  /></PrimitiveRadioGroup>
</template>
