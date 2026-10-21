<script setup lang="ts">
import { paginationButtonClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { computed, useAttrs } from 'vue'
import { callPaginationHandler, usePaginationContext } from './context'

defineOptions({ name: 'PaginationPageButton', inheritAttrs: false })
const props = defineProps<{ page: number; disabled?: boolean; class?: string }>()
const { controller, snapshot, size } = usePaginationContext()
const attrs = useAttrs()
function nativeAttrs() {
  const { onClick: _onClick, ...rest } = attrs
  return rest
}
const blocked = computed(
  () =>
    props.disabled ||
    snapshot.value.disabled ||
    !Number.isInteger(props.page) ||
    props.page < 1 ||
    props.page > snapshot.value.pageCount,
)
function click(event: MouseEvent) {
  callPaginationHandler(attrs.onClick, event)
  if (!event.defaultPrevented && !blocked.value) controller.setPage(props.page)
}
</script>
<template>
  <button
    :type="(attrs.type as 'button' | 'submit' | 'reset') ?? 'button'"
    :aria-label="snapshot.labels.page(page)"
    v-bind="nativeAttrs()"
    :disabled="blocked"
    :aria-current="page === snapshot.page ? 'page' : undefined"
    data-slot="pagination-page-button"
    :data-active="page === snapshot.page || undefined"
    :class="cn(paginationButtonClassName({ size }), props.class)"
    @click="click"
  >
    <slot>{{ page }}</slot>
  </button>
</template>
