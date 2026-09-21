<script setup lang="ts">
import { inject, useAttrs } from 'vue'
import { InputControl } from '../input/input'
import { inputNumberContextKey } from './context'
defineOptions({ name: 'InputNumberControl', inheritAttrs: false })
const inputNumber = inject(inputNumberContextKey)
if (!inputNumber) throw new Error('InputNumberControl must be used inside InputNumberRoot.')
const attrs = useAttrs()
</script>
<template>
  <InputControl
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
