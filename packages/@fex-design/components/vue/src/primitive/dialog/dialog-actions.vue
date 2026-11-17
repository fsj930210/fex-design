<script setup lang="ts">
import { dialogActionsClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
const props = defineProps<{ class?: string }>()
</script>
<template>
  <div v-bind="$attrs" data-slot="dialog-actions" :class="cn(dialogActionsClassName, props.class)">
    <slot />
  </div>
</template>
