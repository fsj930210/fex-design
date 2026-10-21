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
      show-total
      show-size-changer
      show-quick-jumper
      class="w-full"
    />
    <Pagination
      :total="200"
      :labels="paginationDemoLabels"
      :default-page="8"
      show-total
      show-size-changer
      show-quick-jumper
      class="w-full [&>[data-slot=pagination-total]]:me-auto"
    />
  </div>
</template>
