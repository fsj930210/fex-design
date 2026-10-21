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
import {
  paginationDemoLabels,
  paginationDemoClassNames,
} from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationSimpleClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
const classNames = paginationDemoClassNames
const styles = {
  root: { backgroundColor: '#faf5ff' },
  total: { color: '#6d28d9' },
  content: { columnGap: '6px' },
  pageButton: { borderColor: '#c4b5fd' },
  navigationButton: { color: '#6d28d9' },
  ellipsis: { color: '#8b5cf6' },
  simple: { color: '#6d28d9' },
  pageSizeSelect: { minWidth: '128px' },
  jumper: { color: '#6d28d9' },
  quickJumper: { width: '96px' },
}
const pageSizeProps = {
  selectTriggerProps: {
    style: {
      borderColor: '#c4b5fd',
      color: '#6d28d9',
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      '--focus-border': '#8b5cf6',
      '--input-ring-width': '1px',
      '--input-ring-color': '#ddd6fe',
    },
  },
  selectContentProps: {
    style: {
      borderColor: '#c4b5fd',
      color: '#6d28d9',
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      '--focus-border': '#8b5cf6',
      '--input-ring-width': '1px',
      '--input-ring-color': '#ddd6fe',
      '--primary': '#6d28d9',
      '--muted-background': '#f5f3ff',
    },
  },
}
const jumperProps = {
  inputNumberProps: {
    style: {
      borderColor: '#c4b5fd',
      color: '#6d28d9',
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      '--focus-border': '#8b5cf6',
      '--input-ring-width': '1px',
      '--input-ring-color': '#ddd6fe',
    },
  },
  inputProps: { style: { color: '#6d28d9' } },
  incrementProps: { style: { color: '#6d28d9' } },
  decrementProps: { style: { color: '#6d28d9' } },
}
</script>
<template>
  <div class="grid w-full gap-space-lg">
    <PaginationRoot
      v-for="simple in [false, true]"
      :key="String(simple)"
      :total="200"
      :default-page="8"
      :labels="paginationDemoLabels"
      :class="classNames.root"
      :style="styles.root"
      v-slot="{ snapshot }"
      ><span
        data-slot="pagination-total"
        :class="cn(paginationTotalClassName, classNames.total)"
        :style="styles.total"
        >{{ snapshot.labels.total(snapshot.total) }}</span
      ><PaginationContent :class="classNames.content" :style="styles.content"
        ><PaginationNavigationButton
          direction="prev"
          :class="classNames.navigationButton"
          :style="styles.navigationButton" /><span
          v-if="simple"
          data-slot="pagination-simple"
          :class="cn(paginationSimpleClassName, classNames.simple)"
          :style="styles.simple"
          >{{ snapshot.page }} / {{ snapshot.pageCount }}</span
        ><template v-else v-for="item in snapshot.pages" :key="item.key"
          ><PaginationPageButton
            v-if="item.type === 'page'"
            :page="item.page"
            :class="classNames.pageButton"
            :style="styles.pageButton" /><PaginationEllipsis
            v-else
            :class="classNames.ellipsis"
            :style="styles.ellipsis" /></template
        ><PaginationNavigationButton
          direction="next"
          :class="classNames.navigationButton"
          :style="styles.navigationButton" /></PaginationContent
      ><PaginationPageSizeSelect
        v-bind="pageSizeProps"
        :class="classNames.pageSizeSelect"
        :style="styles.pageSizeSelect"
      />
      <div
        data-slot="pagination-jumper"
        :class="cn(paginationJumperGroupClassName, classNames.jumper)"
        :style="styles.jumper"
      >
        <span>{{ snapshot.labels.jumpPrefix }}</span
        ><PaginationQuickJumper
          v-bind="jumperProps"
          :class="classNames.quickJumper"
          :style="styles.quickJumper"
        /><span>{{ snapshot.labels.jumpSuffix }}</span>
      </div></PaginationRoot
    >
  </div>
</template>
