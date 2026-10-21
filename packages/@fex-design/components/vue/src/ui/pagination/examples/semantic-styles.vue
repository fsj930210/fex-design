<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { Pagination, type PaginationStyles } from '@fex-design/vue/ui/pagination'
import {
  paginationDemoLabels,
  paginationDemoClassNames,
} from '@fex-design/docs-shared/pagination-demo'
const styles: PaginationStyles<CSSProperties> = {
  root: {
    backgroundColor: '#faf5ff',
  },
  total: {
    color: '#6d28d9',
  },
  content: {
    columnGap: '6px',
  },
  pageButton: {
    borderColor: '#c4b5fd',
  },
  navigationButton: {
    color: '#6d28d9',
  },
  ellipsis: {
    color: '#8b5cf6',
  },
  simple: {
    color: '#6d28d9',
  },
  pageSizeSelect: {
    minWidth: '128px',
  },
  jumper: {
    color: '#6d28d9',
  },
  quickJumper: {
    width: '96px',
  },
}
</script>
<template>
  <div class="grid w-full gap-space-lg">
    <Pagination
      :page-size-select-props="{
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
            '--primary': '#6d28d9',
            '--muted-background': '#f5f3ff',
            borderRadius: '6px',
            '--focus-border': '#8b5cf6',
            '--input-ring-width': '1px',
            '--input-ring-color': '#ddd6fe',
          },
        },
      }"
      :quick-jumper-props="{
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
      }"
      :total="200"
      :default-page="8"
      :labels="paginationDemoLabels"
      show-total
      show-size-changer
      show-quick-jumper
      :class-names="paginationDemoClassNames"
      :styles="styles"
    />
    <Pagination
      :page-size-select-props="{
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
            '--primary': '#6d28d9',
            '--muted-background': '#f5f3ff',
            borderRadius: '6px',
            '--focus-border': '#8b5cf6',
            '--input-ring-width': '1px',
            '--input-ring-color': '#ddd6fe',
          },
        },
      }"
      :quick-jumper-props="{
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
      }"
      :total="200"
      :default-page="8"
      :labels="paginationDemoLabels"
      show-total
      show-size-changer
      show-quick-jumper
      simple
      :class-names="paginationDemoClassNames"
      :styles="styles"
    />
  </div>
</template>
