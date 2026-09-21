<script setup lang="ts">
import { popoverDescriptionClassName } from '@fex-design/components-styles/popover'
import { cn } from '@fex-design/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div data-slot="popover-description" :class="cn(popoverDescriptionClassName, props.class)">
    <slot />
  </div>
</template>
