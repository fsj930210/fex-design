<script setup lang="ts">
import { inject } from 'vue'
import { InputClear } from '@fex-design/vue/primitive/input/input'
import { inputContextKey } from '../../primitive/input/input-context'

defineOptions({ name: 'InputClearWhenAvailable', inheritAttrs: false })
const input = inject(inputContextKey)
if (!input) throw new Error('InputClearWhenAvailable must be used inside InputRoot.')
</script>

<template>
  <InputClear
    v-if="input.value.value !== '' && !input.disabled.value && !input.readOnly.value"
    v-bind="$attrs"
  ><slot /></InputClear>
</template>
