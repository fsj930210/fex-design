<script setup lang="ts">
import { RadioButtonGroup } from '@fex-design/vue/ui/radio'
const options = [
  { label: '苹果', value: 'apple' },
  { label: '梨', value: 'pear' },
]
</script>
<template>
  <RadioButtonGroup default-value="apple" orientation="horizontal" :options="options" />
</template>
