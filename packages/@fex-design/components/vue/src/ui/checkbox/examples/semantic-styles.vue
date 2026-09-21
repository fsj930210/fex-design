<script setup lang="ts">
import { Checkbox, CheckboxGroup } from '@fex-design/vue/ui/checkbox'
</script>
<template>
  <Checkbox
    default-checked
    :class-names="{
      root: 'gap-3',
      control: 'ring-2 ring-orange-300',
      indicator: 'drop-shadow-sm',
      label: 'font-bold',
    }"
    :styles="{
      control: { backgroundColor: '#ea580c', borderColor: '#c2410c' },
      indicator: { color: '#ffffff' },
      label: { color: '#6d28d9' },
    }"
    >结构化样式</Checkbox
  >
</template>
