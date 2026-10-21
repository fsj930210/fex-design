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
} from '@fex-design/vue/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationJumperGroupClassName,
  paginationHideOnSinglePageClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { Button } from '@fex-design/vue/ui/button'
const total = ref(5)
</script>
<template>
  <div class="grid w-full gap-space-lg">
    <div class="flex flex-wrap items-center gap-2">
      <Button @click="total = total === 5 ? 200 : 5">切换总数 5 / 200</Button
      ><span>总条数：{{ total }}</span>
    </div>
    <PaginationRoot
      :total="total"
      :labels="paginationDemoLabels"
      :default-page="8"
      :class="cn(paginationHideOnSinglePageClassName)"
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
