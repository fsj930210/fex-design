<script setup lang="ts">
import { emptyMediaClassName } from '@fex-design/components-styles/empty'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <div v-bind="$attrs" data-slot="empty-media" :class="cn(emptyMediaClassName, props.class)">
    <slot />
  </div>
</template>
