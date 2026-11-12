<script setup lang="ts">
const props = defineProps<{ invalid?: boolean }>()
import { SelectContent, SelectRoot, SelectTrigger } from '@fex-design/vue/primitive/select'
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]
</script>
<template>
  <SelectRoot :aria-invalid="props.invalid || undefined" :options="options" default-value="react"
    ><SelectTrigger class="w-72" placeholder="请选择框架" /><SelectContent
  /></SelectRoot>
</template>
