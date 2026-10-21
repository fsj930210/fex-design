<script setup lang="ts">
import { inject, useAttrs, useTemplateRef } from 'vue'
import { InputControl } from '../input'
import { inputNumberContextKey } from './context'
defineOptions({ name: 'InputNumberControl', inheritAttrs: false })
const inputNumber = inject(inputNumberContextKey)
if (!inputNumber) throw new Error('InputNumberControl must be used inside InputNumberRoot.')
const attrs = useAttrs()
const control = useTemplateRef<InstanceType<typeof InputControl>>('control')
defineExpose({
  get element() {
    return control.value?.element ?? null
  },
  focus: (options?: FocusOptions) => control.value?.focus(options),
  blur: () => control.value?.blur(),
  select: () => control.value?.select(),
})
</script>
<template>
  <InputControl
    ref="control"
    v-bind="attrs"
    type="text"
    :inputmode="(attrs.inputmode as string | undefined) ?? 'decimal'"
    role="spinbutton"
    :aria-valuemin="inputNumber.min.value"
    :aria-valuemax="inputNumber.max.value"
    :aria-valuenow="inputNumber.value.value"
    :aria-valuetext="
      (attrs['aria-valuetext'] as string | undefined) ?? inputNumber.formattedValue.value
    "
    @blur="inputNumber.blur"
    @keydown="inputNumber.keydown"
  />
</template>
