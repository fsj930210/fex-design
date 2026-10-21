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
import { cn } from '@fex-design/utils'
</script>
<template>
  <div class="grid w-full gap-space-lg">
    <PaginationRoot
      :total="200"
      :labels="paginationDemoLabels"
      :default-page="8"
      :class="
        cn(
          '[--pagination-control-height:38px] [--pagination-font-size:14px] [--pagination-gap:12px] [--pagination-item-gap:6px] [--pagination-radius:12px] [--pagination-color:#5b21b6] [--pagination-active-background:#ede9fe] [--pagination-active-color:#6d28d9] [--pagination-active-border-color:#8b5cf6] [--pagination-hover-background:#f5f3ff]',
        )
      "
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
      <PaginationPageSizeSelect
        :select-trigger-props="{
          class:
            '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
        }"
        :select-content-props="{
          class:
            '[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]',
        }"
      />
      <div data-slot="pagination-jumper" :class="paginationJumperGroupClassName">
        <span>{{ snapshot.labels.jumpPrefix }}</span
        ><PaginationQuickJumper
          :input-number-props="{
            class:
              '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
          }"
          :increment-props="{ class: 'text-purple-700' }"
          :decrement-props="{ class: 'text-purple-700' }"
        /><span>{{ snapshot.labels.jumpSuffix }}</span>
      </div>
    </PaginationRoot>
  </div>
</template>
