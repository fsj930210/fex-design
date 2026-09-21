<script setup lang="ts">
import { popoverHeaderClassName } from '@fex-design/components-styles/popover'
import { cn } from '@fex-design/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div data-slot="popover-header" :class="cn(popoverHeaderClassName, props.class)">
    <slot />
  </div>
</template>
