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
    >
      <template #total="{ snapshot }"
        >{{ snapshot.range[0] }}–{{ snapshot.range[1] }} / {{ snapshot.total }}</template
      >
      <template #page="{ page, current }">{{ current ? '[' + page + ']' : page }}</template>
      <template #previous>上一页</template><template #next>下一页</template
      ><template #ellipsis>…</template>
    </Pagination>
  </div>
</template>
