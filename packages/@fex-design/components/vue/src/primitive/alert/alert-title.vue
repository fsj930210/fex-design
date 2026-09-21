<script setup lang="ts">
import { alertTitleClassName } from '@fex-design/components-styles/alert'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <div v-bind="$attrs" data-slot="alert-title" :class="cn(alertTitleClassName, props.class)">
    <slot />
  </div>
</template>
