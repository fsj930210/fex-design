<script setup lang="ts">
import { paginationTextClassName } from '@fex-design/components-styles/pagination'
import { ChevronRightIcon } from '@fex-design/vue/icons/chevron'
import PaginationLink from './pagination-link.vue'

withDefaults(defineProps<{ text?: string }>(), { text: 'Next' })
</script>

<template>
  <PaginationLink v-bind="$attrs" aria-label="Go to next page" size="md">
    <span :class="paginationTextClassName">{{ text }}</span>
    <ChevronRightIcon />
  </PaginationLink>
</template>
