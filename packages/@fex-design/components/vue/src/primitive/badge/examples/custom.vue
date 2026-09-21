<script setup lang="ts">
import { Badge } from '@fex-design/vue/primitive/badge'
</script>
<template>
  <div class="flex gap-3">
    <Badge count="NEW" /><Badge count="hot" color="danger" /><Badge count="3 items" color="info" />
  </div>
</template>
