<script setup lang="ts">
import { alertDescriptionClassName } from '@fex-design/components-styles/alert'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <div
    v-bind="$attrs"
    data-slot="alert-description"
    :class="cn(alertDescriptionClassName, props.class)"
  >
    <slot />
  </div>
</template>
