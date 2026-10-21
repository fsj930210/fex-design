<script setup lang="ts">
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/vue/primitive/select'
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]
const inputProps = {
  classNames: { root: 'rounded-xl', control: 'font-semibold', suffix: 'text-violet-600' },
  styles: { root: { borderColor: '#8b5cf6' }, control: { letterSpacing: '0.04em' } },
}
const valueProps = {
  tagProps: { color: '#7c3aed', class: 'rounded-md font-semibold' },
  overflowTagProps: { color: '#0891b2', class: 'rounded-md font-semibold' },
  tagActionProps: { class: 'rounded-sm text-violet-700 hover:bg-violet-200' },
}
const triggerProps = { class: 'border-violet-300 bg-white text-violet-800 rounded-md' }
const contentProps = {
  class:
    'border-violet-300 bg-white text-violet-800 [--primary:#6d28d9] [--muted-background:#f5f3ff]',
}
</script>
<template>
  <div class="grid w-full gap-4">
    <SelectRoot :options="options" default-value="react"
      ><SelectTrigger
        v-bind="triggerProps"
        class="w-72 max-w-full"
        :input-props="inputProps"
        placeholder="请选择框架" /><SelectContent v-bind="contentProps" /></SelectRoot
    ><SelectRoot :options="options" multiple :default-value="['react', 'vue']"
      ><SelectTrigger
        v-bind="triggerProps"
        class="w-72 max-w-full"
        :input-props="inputProps"
        :value-props="valueProps"
        :max-tag-count="1" /><SelectContent v-bind="contentProps"
    /></SelectRoot>
  </div>
</template>
