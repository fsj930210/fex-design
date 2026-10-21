<script setup lang="ts">
import type { PaginationDirection } from '@fex-design/core/pagination/types'
import { ChevronLeftIcon, ChevronRightIcon } from '@fex-design/vue/icons/chevron'
import { paginationButtonClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { computed, useAttrs } from 'vue'
import { callPaginationHandler, usePaginationContext } from './context'

defineOptions({ name: 'PaginationNavigationButton', inheritAttrs: false })
const props = defineProps<{ direction: PaginationDirection; disabled?: boolean; class?: string }>()
const { controller, snapshot, size } = usePaginationContext()
const attrs = useAttrs()
function nativeAttrs() {
  const { onClick: _onClick, ...rest } = attrs
  return rest
}
const blocked = computed(
  () =>
    props.disabled ||
    !(props.direction === 'prev' ? snapshot.value.canPrevious : snapshot.value.canNext),
)
function click(event: MouseEvent) {
  callPaginationHandler(attrs.onClick, event)
  if (event.defaultPrevented || blocked.value) return
  if (props.direction === 'prev') controller.previousPage()
  else controller.nextPage()
}
</script>
<template>
  <button
    :type="(attrs.type as 'button' | 'submit' | 'reset') ?? 'button'"
    :aria-label="direction === 'prev' ? snapshot.labels.previous : snapshot.labels.next"
    v-bind="nativeAttrs()"
    :disabled="blocked"
    data-slot="pagination-navigation-button"
    :data-direction="direction"
    :class="cn(paginationButtonClassName({ size }), props.class)"
    @click="click"
  >
    <slot
      ><ChevronLeftIcon v-if="direction === 'prev'" class="rtl:rotate-180" /><ChevronRightIcon
        v-else
        class="rtl:rotate-180"
    /></slot>
  </button>
</template>
