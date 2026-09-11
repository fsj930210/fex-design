<script setup lang="ts">
import { paginationLinkClassName, paginationTextLinkClassName } from '@fex-design/styles/pagination'
import { cn } from '@fex/utils'

defineOptions({ inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    class?: string | undefined
    isActive?: boolean
    size?: 'md' | 'icon'
  }>(),
  { size: 'icon' },
)
</script>

<template>
  <a
    v-bind="$attrs"
    :aria-current="props.isActive ? 'page' : undefined"
    data-slot="pagination-link"
    :data-active="props.isActive ? 'true' : undefined"
    :class="
      cn(
        paginationLinkClassName,
        props.size === 'md' ? paginationTextLinkClassName : '',
        props.class,
      )
    "
  >
    <slot />
  </a>
</template>
