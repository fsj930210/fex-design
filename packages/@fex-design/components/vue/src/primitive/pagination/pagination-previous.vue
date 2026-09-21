<script setup lang="ts">
import { paginationTextClassName } from '@fex-design/components-styles/pagination'
import { ChevronLeftIcon } from '@fex-design/vue/icons/chevron'
import PaginationLink from './pagination-link.vue'

withDefaults(defineProps<{ text?: string }>(), { text: 'Previous' })
</script>

<template>
  <PaginationLink v-bind="$attrs" aria-label="Go to previous page" size="md">
    <ChevronLeftIcon />
    <span :class="paginationTextClassName">{{ text }}</span>
  </PaginationLink>
</template>
