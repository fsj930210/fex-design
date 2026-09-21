<script setup lang="ts">
import { Badge } from '@fex-design/vue/ui/badge'
</script>
<template>
  <div class="flex items-center justify-center gap-12">
    <div
      v-for="dir in ['ltr', 'rtl'] as const"
      :key="dir"
      :dir="dir"
      class="grid justify-items-center gap-2"
    >
      <span>{{ dir === 'ltr' ? 'LTR · 中文示例' : 'RTL · مثال عربي' }}</span
      ><Badge :count="5"><span class="block size-10 rounded bg-muted-background" /></Badge>
    </div>
  </div>
</template>
