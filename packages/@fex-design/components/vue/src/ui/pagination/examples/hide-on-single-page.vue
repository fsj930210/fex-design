<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '@fex-design/vue/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import { Button } from '@fex-design/vue/ui/button'
const total = ref(5)
</script>
<template>
  <div class="grid w-full gap-space-lg">
    <div class="flex flex-wrap items-center gap-2">
      <Button @click="total = total === 5 ? 200 : 5">切换总数 5 / 200</Button
      ><span>总条数：{{ total }}</span>
    </div>
    <Pagination
      :total="total"
      :labels="paginationDemoLabels"
      :default-page="8"
      show-total
      show-size-changer
      show-quick-jumper
      hide-on-single-page
    />
  </div>
</template>
