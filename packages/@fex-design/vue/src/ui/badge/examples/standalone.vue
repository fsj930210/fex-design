<script setup lang="ts">
import { Badge } from '@fex-design/vue/ui/badge'
</script>
<template>
  <div class="flex items-center gap-2">
    <Badge :count="11" color="warning" /><Badge :count="25" color="danger" /><Badge
      count="◷"
      color="danger"
    /><Badge :count="120" :overflow-count="99" color="success" />
  </div>
</template>
