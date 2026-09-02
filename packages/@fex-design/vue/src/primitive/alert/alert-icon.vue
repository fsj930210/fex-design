<script setup lang="ts">
import { alertIconClassName } from '@fex-design/styles/alert'
import { cn } from '@fex/utils'

defineOptions({ name: 'AlertIcon', inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <span v-bind="$attrs" data-slot="alert-icon" :class="cn(alertIconClassName, props.class)">
    <slot />
  </span>
</template>
