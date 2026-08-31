<script setup lang="ts">
import { Badge } from '@fex-design/vue/primitive/badge'
</script>
<template>
  <div class="flex items-center gap-6">
    <span class="relative inline-flex"
      ><span class="block size-10 rounded bg-muted-background" /><Badge
        :count="120"
        :overflow-count="99"
        class="absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2" /></span
    ><span class="relative inline-flex"
      ><span class="block size-10 rounded bg-muted-background" /><Badge
        :count="0"
        show-zero
        class="absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2"
    /></span>
  </div>
</template>
