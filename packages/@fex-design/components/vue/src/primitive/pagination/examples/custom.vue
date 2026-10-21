<script setup lang="ts">
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
} from '@fex-design/vue/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
</script>
<template>
  <div class="grid w-full gap-space-lg">
    <PaginationRoot
      :total="200"
      :labels="paginationDemoLabels"
      :default-page="8"
      v-slot="{ snapshot }"
    >
      <span data-slot="pagination-total" :class="paginationTotalClassName"
        >{{ snapshot.range[0] }}–{{ snapshot.range[1] }} / {{ snapshot.total }}</span
      >
      <PaginationContent>
        <PaginationNavigationButton direction="prev">上一页</PaginationNavigationButton>
        <template v-for="item in snapshot.pages" :key="item.key">
          <PaginationPageButton v-if="item.type === 'page'" :page="item.page">{{
            item.page === snapshot.page ? '[' + item.page + ']' : item.page
          }}</PaginationPageButton>
          <PaginationEllipsis v-else>…</PaginationEllipsis>
        </template>
        <PaginationNavigationButton direction="next">下一页</PaginationNavigationButton>
      </PaginationContent>
      <PaginationPageSizeSelect />
      <div data-slot="pagination-jumper" :class="paginationJumperGroupClassName">
        <span>{{ snapshot.labels.jumpPrefix }}</span
        ><PaginationQuickJumper /><span>{{ snapshot.labels.jumpSuffix }}</span>
      </div>
    </PaginationRoot>
  </div>
</template>
