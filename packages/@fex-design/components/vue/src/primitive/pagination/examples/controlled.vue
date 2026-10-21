<script setup lang="ts">
import { ref } from 'vue'
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
  type PaginationValue,
  type PaginationChangeDetails,
} from '@fex-design/vue/primitive/pagination'
import {
  paginationDemoLabels,
  paginationDemoInitialChange,
  formatPaginationDemoChange,
} from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
import { Button } from '@fex-design/vue/ui/button'
const total = ref(200)
const value = ref({ page: 3, pageSize: 10 })
const lastChange = ref(paginationDemoInitialChange)
function change(next: PaginationValue, details: PaginationChangeDetails) {
  value.value = next
  lastChange.value = formatPaginationDemoChange(next, details)
}
function reset() {
  value.value = { page: 3, pageSize: 10 }
  total.value = 200
  lastChange.value = '已从外部重置'
}
</script>
<template>
  <div class="grid w-full gap-space-lg">
    <div class="flex flex-wrap gap-2">
      <Button @click="value = { ...value, page: 5 }">设为第 5 页</Button
      ><Button @click="value = { page: 1, pageSize: 20 }">每页 20 条</Button>
      <Button @click="total = 35">总数改为 35 条</Button><Button @click="reset">重置</Button>
    </div>
    <p class="text-sm text-muted-foreground">
      外部值：第 {{ value.page }} 页，每页 {{ value.pageSize }} 条，总数 {{ total }} 条
    </p>
    <p aria-live="polite" class="text-sm text-muted-foreground">{{ lastChange }}</p>
    <PaginationRoot
      :total="total"
      :labels="paginationDemoLabels"
      :page="value.page"
      :page-size="value.pageSize"
      @change="change"
      v-slot="{ snapshot }"
    >
      <span data-slot="pagination-total" :class="paginationTotalClassName">{{
        snapshot.labels.total(snapshot.total)
      }}</span>
      <PaginationContent>
        <PaginationNavigationButton direction="prev" />
        <template v-for="item in snapshot.pages" :key="item.key">
          <PaginationPageButton v-if="item.type === 'page'" :page="item.page" />
          <PaginationEllipsis v-else />
        </template>
        <PaginationNavigationButton direction="next" />
      </PaginationContent>
      <PaginationPageSizeSelect />
      <div data-slot="pagination-jumper" :class="paginationJumperGroupClassName">
        <span>{{ snapshot.labels.jumpPrefix }}</span
        ><PaginationQuickJumper /><span>{{ snapshot.labels.jumpSuffix }}</span>
      </div>
    </PaginationRoot>
  </div>
</template>
