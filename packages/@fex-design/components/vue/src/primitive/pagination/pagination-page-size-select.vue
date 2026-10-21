<script setup lang="ts">
import { filterControlledSelectProps } from '@fex-design/core/select/component-props'
import { computed, type InputHTMLAttributes } from 'vue'
import { getPaginationPageSizes } from '@fex-design/core/pagination/pagination-range'
import {
  paginationPageSizeSelectClassName,
  paginationSelectTriggerClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { SelectRoot, SelectTrigger, SelectContent } from '../select'
import type { SelectionValue } from '@fex-design/core/selection/types'
import { usePaginationContext } from './context'

defineOptions({ name: 'PaginationPageSizeSelect' })
const props = defineProps<{
  selectRootProps?:
    | Omit<
        InstanceType<typeof SelectRoot>['$props'],
        | 'children'
        | 'options'
        | 'value'
        | 'defaultValue'
        | 'multiple'
        | 'disabled'
        | 'clearable'
        | 'onChange'
        | 'onUpdate:value'
      >
    | undefined
  selectTriggerProps?: Omit<InstanceType<typeof SelectTrigger>['$props'], 'inputProps'>
  selectContentProps?: InstanceType<typeof SelectContent>['$props']
  options?: readonly number[]
  disabled?: boolean
  class?: string
  inputProps?: InputHTMLAttributes
}>()
const { controller, snapshot, size } = usePaginationContext()
const items = computed(() =>
  getPaginationPageSizes(snapshot.value.pageSize, props.options).map((value) => ({
    value,
    label: snapshot.value.labels.pageSizeOption(value),
  })),
)
function change(value: SelectionValue | SelectionValue[] | undefined) {
  if (typeof value === 'number') controller.setPageSize(value)
}
</script>
<template>
  <div
    data-slot="pagination-page-size-select"
    :class="cn(paginationPageSizeSelectClassName, props.class)"
  >
    <SelectRoot
      v-bind="filterControlledSelectProps(selectRootProps)"
      :multiple="false"
      :clearable="false"
      :options="items"
      :value="snapshot.pageSize"
      :disabled="disabled || snapshot.disabled"
      @change="change"
    >
      <SelectTrigger
        v-bind="selectTriggerProps"
        :class="
          cn(
            paginationSelectTriggerClassName({ size }),
            selectTriggerProps?.class as string | undefined,
          )
        "
        :input-props="{ 'aria-label': snapshot.labels.pageSize, ...inputProps }"
      /><SelectContent v-bind="selectContentProps" />
    </SelectRoot>
  </div>
</template>
