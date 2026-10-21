<script setup lang="ts">
import { paginationEllipsisClassName } from '@fex-design/components-styles/pagination'
import { usePaginationContext } from './context'
import { cn } from '@fex-design/utils'
import { MoreIcon } from '@fex-design/vue/icons/more'

defineOptions({ name: 'PaginationEllipsis', inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
const { size } = usePaginationContext()
</script>

<template>
  <span
    v-bind="$attrs"
    aria-hidden="true"
    data-slot="pagination-ellipsis"
    :class="cn(paginationEllipsisClassName({ size }), props.class)"
  >
    <slot><MoreIcon /></slot>
  </span>
</template>
