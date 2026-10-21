<script setup lang="ts">
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/vue/primitive/select'
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]
const inputProps = {}
const valueProps = {
  tagProps: { class: '[--tag-color:#7c3aed] [--tag-color-foreground:#ffffff]' },
  overflowTagProps: { class: '[--tag-color:#0891b2] [--tag-color-foreground:#ffffff]' },
  tagActionProps: { class: 'text-[var(--tag-color)]' },
}
const triggerProps = {
  class:
    '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
}
const contentProps = {
  class:
    '[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]',
}
</script>
<template>
  <div class="grid w-full gap-4">
    <SelectRoot :options="options"
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
