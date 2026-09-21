<script setup lang="ts">
import { Badge } from '@fex-design/vue/ui/badge'
</script>
<template>
  <div class="flex items-center gap-6">
    <Badge :count="120" :overflow-count="99"
      ><span class="block size-10 rounded bg-muted-background" /></Badge
    ><Badge :count="0" show-zero><span class="block size-10 rounded bg-muted-background" /></Badge>
  </div>
</template>
