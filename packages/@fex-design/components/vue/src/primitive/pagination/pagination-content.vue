<script setup lang="ts">
import { paginationContentClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'

defineOptions({ name: 'PaginationContent', inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <div
    v-bind="$attrs"
    data-slot="pagination-content"
    :class="cn(paginationContentClassName, props.class)"
  >
    <slot />
  </div>
</template>
