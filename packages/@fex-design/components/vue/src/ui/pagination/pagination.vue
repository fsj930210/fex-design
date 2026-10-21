<script setup lang="ts">
import { cn } from '@fex-design/utils'
import type {
  PaginationClassNames,
  PaginationStyles,
  PaginationOptions,
  PaginationSize,
  PaginationSnapshot,
  PaginationValue,
  PaginationChangeDetails,
} from '@fex-design/core/pagination/types'
import {
  paginationTotalClassName,
  paginationSimpleClassName,
  paginationJumperGroupClassName,
  paginationHideOnSinglePageClassName,
} from '@fex-design/components-styles/pagination'
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
} from '@fex-design/vue/primitive/pagination'
import type { HTMLAttributes, InputHTMLAttributes, StyleValue } from 'vue'

defineOptions({ name: 'Pagination', inheritAttrs: false })
const props = defineProps<
  Omit<PaginationOptions, 'onChange'> & {
    classNames?: PaginationClassNames
    styles?: PaginationStyles<StyleValue>
    size?: PaginationSize
    class?: string
    showTotal?: boolean
    showSizeChanger?: boolean
    pageSizeOptions?: readonly number[]
    showQuickJumper?: boolean
    simple?: boolean
    hideOnSinglePage?: boolean
    pageSizeSelectProps?: Pick<
      InstanceType<typeof PaginationPageSizeSelect>['$props'],
      | 'class'
      | 'style'
      | 'disabled'
      | 'inputProps'
      | 'selectRootProps'
      | 'selectTriggerProps'
      | 'selectContentProps'
    >
    quickJumperProps?: Pick<
      InstanceType<typeof PaginationQuickJumper>['$props'],
      | 'class'
      | 'style'
      | 'disabled'
      | 'inputProps'
      | 'inputNumberProps'
      | 'inputActionsProps'
      | 'incrementProps'
      | 'decrementProps'
    >
  }
>()
const emit = defineEmits<{
  'update:page': [page: number]
  'update:pageSize': [pageSize: number]
  change: [value: PaginationValue, details: PaginationChangeDetails]
}>()
defineSlots<{
  total?: (props: { snapshot: PaginationSnapshot }) => unknown
  page?: (props: { page: number; current: boolean }) => unknown
  previous?: () => unknown
  next?: () => unknown
  ellipsis?: () => unknown
}>()
</script>
<template>
  <PaginationRoot
    v-bind="$attrs"
    :total="total"
    :page="page"
    :default-page="defaultPage"
    :page-size="pageSize"
    :default-page-size="defaultPageSize"
    :sibling-count="siblingCount"
    :boundary-count="boundaryCount"
    :disabled="disabled"
    :labels="labels"
    :size="size"
    :class="
      cn(hideOnSinglePage && paginationHideOnSinglePageClassName, classNames?.root, props.class)
    "
    :style="[styles?.root, $attrs.style as StyleValue]"
    @update:page="emit('update:page', $event)"
    @update:page-size="emit('update:pageSize', $event)"
    @change="(value, details) => emit('change', value, details)"
    v-slot="{ snapshot }"
  >
    <span
      v-if="showTotal"
      data-slot="pagination-total"
      :class="cn(paginationTotalClassName, classNames?.total)"
      :style="styles?.total"
      ><slot name="total" :snapshot="snapshot">{{
        snapshot.labels.total(snapshot.total)
      }}</slot></span
    >
    <PaginationContent :class="classNames?.content" :style="styles?.content">
      <PaginationNavigationButton
        :class="classNames?.navigationButton"
        :style="styles?.navigationButton"
        direction="prev"
        ><template v-if="$slots.previous" #default><slot name="previous" /></template
      ></PaginationNavigationButton>
      <span
        v-if="simple"
        data-slot="pagination-simple"
        :class="cn(paginationSimpleClassName, classNames?.simple)"
        :style="styles?.simple"
        >{{ snapshot.pageCount === 0 ? 0 : snapshot.page }} / {{ snapshot.pageCount }}</span
      >
      <template v-else
        ><template v-for="item in snapshot.pages" :key="item.key">
          <PaginationPageButton
            :class="classNames?.pageButton"
            :style="styles?.pageButton"
            v-if="item.type === 'page'"
            :page="item.page"
          >
            <template v-if="$slots.page" #default
              ><slot name="page" :page="item.page" :current="item.page === snapshot.page"
            /></template>
          </PaginationPageButton>
          <PaginationEllipsis :class="classNames?.ellipsis" :style="styles?.ellipsis" v-else
            ><template v-if="$slots.ellipsis" #default><slot name="ellipsis" /></template
          ></PaginationEllipsis> </template
      ></template>
      <PaginationNavigationButton
        :class="classNames?.navigationButton"
        :style="styles?.navigationButton"
        direction="next"
        ><template v-if="$slots.next" #default><slot name="next" /></template
      ></PaginationNavigationButton>
    </PaginationContent>
    <PaginationPageSizeSelect
      v-if="showSizeChanger"
      v-bind="pageSizeSelectProps"
      :class="cn(classNames?.pageSizeSelect, pageSizeSelectProps?.class)"
      :style="[styles?.pageSizeSelect, pageSizeSelectProps?.style]"
      :options="pageSizeOptions"
    />
    <div
      v-if="showQuickJumper"
      data-slot="pagination-jumper"
      :class="cn(paginationJumperGroupClassName, classNames?.jumper)"
      :style="styles?.jumper"
    >
      <span>{{ snapshot.labels.jumpPrefix }}</span
      ><PaginationQuickJumper
        v-bind="quickJumperProps"
        :class="cn(classNames?.quickJumper, quickJumperProps?.class)"
        :style="[styles?.quickJumper, quickJumperProps?.style]"
      /><span>{{ snapshot.labels.jumpSuffix }}</span>
    </div>
  </PaginationRoot>
</template>
