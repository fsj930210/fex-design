<script setup lang="ts">
import { Pagination } from '@fex-design/vue/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
</script>
<template>
  <div class="grid w-full gap-space-lg">
    <Pagination
      :total="200"
      :labels="paginationDemoLabels"
      :default-page="8"
      :sibling-count="0"
      :boundary-count="0"
      show-total
      show-size-changer
      show-quick-jumper
    />
    <Pagination
      :total="200"
      :labels="paginationDemoLabels"
      :default-page="8"
      :sibling-count="2"
      :boundary-count="2"
      show-total
      show-size-changer
      show-quick-jumper
    />
  </div>
</template>
