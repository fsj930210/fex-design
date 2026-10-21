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
      disabled
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
