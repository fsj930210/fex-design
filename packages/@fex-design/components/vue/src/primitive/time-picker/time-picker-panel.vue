<script setup lang="ts">
import { timePickerRootClassName } from '@fex-design/components-styles/time-picker'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <div
    v-bind="attrs"
    data-slot="time-picker-panel"
    :class="cn(timePickerRootClassName, attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>
