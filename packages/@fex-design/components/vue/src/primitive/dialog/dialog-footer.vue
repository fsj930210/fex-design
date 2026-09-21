<script setup lang="ts">
import { dialogFooterClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
const props = defineProps<{ class?: string }>()
</script>
<template>
  <div v-bind="$attrs" data-slot="dialog-footer" :class="cn(dialogFooterClassName, props.class)">
    <slot />
  </div>
</template>
