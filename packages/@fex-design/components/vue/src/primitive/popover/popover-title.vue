<script setup lang="ts">
import { popoverTitleClassName } from '@fex-design/components-styles/popover'
import { cn } from '@fex-design/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div data-slot="popover-title" :class="cn(popoverTitleClassName, props.class)">
    <slot />
  </div>
</template>
