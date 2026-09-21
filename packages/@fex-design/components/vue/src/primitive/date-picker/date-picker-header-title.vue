<script setup lang="ts">
import { datePickerHeaderTitleClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="date-picker-header-title"
    :class="cn(datePickerHeaderTitleClassName, props.class)"
  >
    <slot />
  </div>
</template>
