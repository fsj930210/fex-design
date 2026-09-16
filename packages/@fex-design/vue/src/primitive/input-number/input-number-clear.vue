<script setup lang="ts">
import { inject } from 'vue'
import { InputClear } from '../input/input'
import { inputNumberContextKey } from './context'
defineOptions({ name: 'InputNumberClear' })
const inputNumber = inject(inputNumberContextKey)
if (!inputNumber) throw new Error('InputNumberClear must be used inside InputNumberRoot.')
</script>
<template>
  <InputClear data-slot="input-number-clear" @click="inputNumber.clear"><slot /></InputClear>
</template>
