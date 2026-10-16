<script setup lang="ts">
import { timePickerRootClassName } from '@fex-design/components-styles/time-picker'
import { cn } from '@fex-design/utils'
import { useAttrs, normalizeClass } from 'vue'
defineOptions({ name: 'TimePickerPanel', inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <div
    v-bind="attrs"
    data-slot="time-picker-panel"
    :class="cn(timePickerRootClassName, normalizeClass(attrs.class))"
  >
    <slot />
  </div>
</template>
