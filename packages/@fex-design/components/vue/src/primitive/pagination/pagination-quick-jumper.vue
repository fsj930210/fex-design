<script setup lang="ts">
import { filterPaginationInputNumberProps } from '@fex-design/core/pagination/create-pagination-controller'
import type { InputHTMLAttributes } from 'vue'
import {
  paginationQuickJumperClassName,
  paginationInputControlClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import {
  InputNumberRoot,
  InputNumberControl,
  InputNumberActions,
  InputNumberIncrement,
  InputNumberDecrement,
} from '../input-number'
import { callPaginationHandler, usePaginationContext } from './context'

defineOptions({ name: 'PaginationQuickJumper' })
const props = defineProps<{
  inputActionsProps?: InstanceType<typeof InputNumberActions>['$props']
  incrementProps?: InstanceType<typeof InputNumberIncrement>['$props']
  decrementProps?: InstanceType<typeof InputNumberDecrement>['$props']
  inputNumberProps?: Omit<
    InstanceType<typeof InputNumberRoot>['$props'],
    | 'value'
    | 'defaultValue'
    | 'controlled'
    | 'onChange'
    | 'min'
    | 'max'
    | 'step'
    | 'precision'
    | 'parser'
    | 'formatter'
    | 'disabled'
    | 'readOnly'
    | 'size'
  >
  disabled?: boolean
  class?: string
  inputProps?: InputHTMLAttributes
}>()
const { controller, snapshot, size } = usePaginationContext()
function keydown(event: KeyboardEvent) {
  callPaginationHandler(props.inputProps?.onKeydown, event)
  if (
    props.disabled ||
    snapshot.value.disabled ||
    snapshot.value.pageCount === 0 ||
    event.defaultPrevented ||
    event.isComposing ||
    event.key !== 'Enter'
  )
    return
  event.preventDefault()
  const value = (event.target as HTMLInputElement).value
  if (value.trim()) controller.setPage(Number(value), 'jump')
}
function controlProps() {
  const { onKeydown: _onKeydown, ...rest } = props.inputProps ?? {}
  return rest
}
</script>
<template>
  <div data-slot="pagination-quick-jumper" :class="cn(paginationQuickJumperClassName, props.class)">
    <InputNumberRoot
      v-bind="filterPaginationInputNumberProps(inputNumberProps)"
      :step="1"
      :class="
        cn(paginationInputControlClassName({ size }), inputNumberProps?.class as string | undefined)
      "
      :size="size"
      :min="1"
      :max="Math.max(1, snapshot.pageCount)"
      :precision="0"
      :disabled="disabled || snapshot.disabled || snapshot.pageCount === 0"
    >
      <InputNumberControl
        v-bind="controlProps()"
        inputmode="numeric"
        :aria-label="inputProps?.['aria-label'] ?? snapshot.labels.quickJumper"
        @keydown="keydown"
      />
      <InputNumberActions v-bind="inputActionsProps">
        <InputNumberIncrement v-bind="incrementProps" />
        <InputNumberDecrement v-bind="decrementProps" />
      </InputNumberActions>
    </InputNumberRoot>
  </div>
</template>
