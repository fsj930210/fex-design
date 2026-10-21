<script setup lang="ts">
import { Select } from '@fex-design/vue/ui/select'
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
    <Select
      class="w-72 max-w-full"
      :options="options"
      default-value="react"
      placeholder="请选择框架"
      :input-props="inputProps"
      :trigger-props="triggerProps"
      :content-props="contentProps"
    /><Select
      class="w-72 max-w-full"
      :options="options"
      multiple
      :default-value="['react', 'vue']"
      :max-tag-count="1"
      :input-props="inputProps"
      :trigger-props="{ ...triggerProps, valueProps }"
      :content-props="contentProps"
    />
  </div>
</template>
