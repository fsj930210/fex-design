<script setup lang="ts">
import { Badge } from '@fex-design/vue/primitive/badge'
</script>
<template>
  <div class="flex items-center justify-center gap-12">
    <div
      v-for="dir in ['ltr', 'rtl'] as const"
      :key="dir"
      :dir="dir"
      class="grid justify-items-center gap-2"
    >
      <span>{{ dir.toUpperCase() }}</span
      ><span class="relative inline-flex"
        ><span class="block size-10 rounded bg-muted-background" /><Badge
          :count="5"
          class="absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2"
      /></span>
    </div>
  </div>
</template>
