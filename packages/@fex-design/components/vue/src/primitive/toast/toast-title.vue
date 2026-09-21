<script setup lang="ts">
import { toastTitleClassName } from '@fex-design/components-styles/toast'
import { cn } from '@fex-design/utils'
const props = defineProps<{ class?: string }>()
</script>
<template>
  <div v-bind="$attrs" data-slot="toast-title" :class="cn(toastTitleClassName, props.class)">
    <slot />
  </div>
</template>
