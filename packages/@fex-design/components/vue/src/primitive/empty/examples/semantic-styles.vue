<script setup lang="ts">
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@fex-design/vue/primitive/empty'
defineOptions({ name: 'EmptySemanticStylesExample' })
</script>
<template>
  <Empty class="min-h-72 bg-secondary-background"
    ><EmptyHeader
      ><EmptyMedia class="text-primary"
        ><svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="currentColor" opacity="0.1" />
          <path
            d="M14 19.5h8l2.5 3H34v10.5a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V19.5Z"
            stroke="currentColor"
            stroke-width="2"
          /></svg></EmptyMedia
      ><EmptyTitle class="text-base">暂无通知</EmptyTitle
      ><EmptyDescription :style="{ maxWidth: '24rem' }"
        >新的通知会显示在这里。</EmptyDescription
      ></EmptyHeader
    ><EmptyContent class="mt-2"
      ><button class="rounded-md border border-border px-3 py-2">刷新</button></EmptyContent
    ></Empty
  >
</template>
