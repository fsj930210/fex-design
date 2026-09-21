<script setup lang="ts">
import { emptyContentClassName } from '@fex-design/components-styles/empty'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <div v-bind="$attrs" data-slot="empty-content" :class="cn(emptyContentClassName, props.class)">
    <slot />
  </div>
</template>
