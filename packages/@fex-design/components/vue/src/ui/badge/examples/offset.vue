<script setup lang="ts">
import { Badge } from '@fex-design/vue/ui/badge'
</script>
<template>
  <div class="flex items-center gap-8">
    <Badge :count="5"><span class="block size-10 rounded bg-muted-background" /></Badge
    ><Badge :count="5" :offset="[10, 10]"
      ><span class="block size-10 rounded bg-muted-background"
    /></Badge>
  </div>
</template>
