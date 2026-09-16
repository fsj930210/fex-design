<script setup lang="ts">
import { InputNumber } from '@fex-design/vue/ui/input-number'
</script>
<template>
  <InputNumber
    :default-value="12"
    clearable
    :class-names="{
      root: 'w-full border-violet-500 bg-violet-50 shadow-sm',
      prefix: 'bg-violet-200 px-2 font-bold text-violet-900',
      control: 'font-bold text-violet-950',
      clear: 'text-rose-600 hover:bg-rose-100',
      suffix: 'bg-amber-200 px-2 font-bold text-amber-950',
      actions: 'bg-cyan-100',
      increment: 'text-emerald-700 hover:bg-emerald-200',
      decrement: 'text-rose-700 hover:bg-rose-200',
    }"
  >
    <template #prefix>$</template>
    <template #suffix>USD</template>
  </InputNumber>
</template>
