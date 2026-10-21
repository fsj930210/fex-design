<script setup lang="ts">
import { paginationRootClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { computed, provide } from 'vue'
import type {
  PaginationSize,
  PaginationOptions,
  PaginationSnapshot,
  PaginationChangeDetails,
  PaginationValue,
} from '@fex-design/core/pagination/types'
import { usePagination } from './use-pagination'
import { paginationContextKey } from './context'

defineOptions({ name: 'PaginationRoot', inheritAttrs: false })
const props = defineProps<
  Omit<PaginationOptions, 'onChange'> & { class?: string; size?: PaginationSize }
>()
const emit = defineEmits<{
  'update:page': [page: number]
  'update:pageSize': [pageSize: number]
  change: [value: PaginationValue, details: PaginationChangeDetails]
}>()
defineSlots<{ default?: (props: { snapshot: PaginationSnapshot }) => unknown }>()
const pagination = usePagination(() => ({
  ...props,
  onChange: (value, details) => {
    if (value.pageSize !== details.previousValue.pageSize) emit('update:pageSize', value.pageSize)
    if (value.page !== details.previousValue.page) emit('update:page', value.page)
    emit('change', value, details)
  },
}))
const { snapshot, controller } = pagination
provide(paginationContextKey, { ...pagination, size: computed(() => props.size ?? 'md') })
defineExpose({ snapshot, controller })
</script>

<template>
  <nav
    :aria-label="snapshot.labels.navigation"
    v-bind="$attrs"
    data-slot="pagination-root"
    :data-size="size ?? 'md'"
    :data-page-count="snapshot.pageCount"
    :data-disabled="snapshot.disabled || undefined"
    :class="cn(paginationRootClassName({ size }), props.class)"
  >
    <slot :snapshot="snapshot" />
  </nav>
</template>
