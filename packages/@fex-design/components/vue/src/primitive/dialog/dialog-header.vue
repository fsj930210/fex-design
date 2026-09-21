<script setup lang="ts">
import { dialogHeaderClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
const props = defineProps<{ class?: string }>()
</script>
<template>
  <div v-bind="$attrs" data-slot="dialog-header" :class="cn(dialogHeaderClassName, props.class)">
    <slot />
  </div>
</template>
