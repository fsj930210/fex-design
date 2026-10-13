<script setup lang="ts" generic="TItem extends Record<string, unknown>">
import { computed } from 'vue'
import { normalizeSelectOptions, type SelectFieldNames, type SelectItem } from '@fex-design/core/select/normalize-options'
import type { SelectFilterOption, SelectVirtualOptions } from '@fex-design/core/select/types'
import type { SelectionValue } from '@fex-design/core/selection/types'
import type { PopoverOptions } from '@fex-design/core/popover/types'
import { SelectContent, SelectRoot, SelectTrigger } from '@fex-design/vue/primitive/select'

defineOptions({ name: 'Select', inheritAttrs: false })
const props = defineProps<{
  options: readonly SelectItem<TItem>[]
  fieldNames?: SelectFieldNames<TItem>
  modelValue?: SelectionValue | SelectionValue[]
  defaultValue?: SelectionValue | SelectionValue[]
  multiple?: boolean
  searchable?: boolean
  filterOption?: SelectFilterOption
  clearable?: boolean
  disabled?: boolean
  loading?: boolean
  placeholder?: string
  maxCount?: number
  maxTagCount?: number
  virtual?: SelectVirtualOptions
  status?: 'error' | 'warning'
  inputProps?: Record<string, unknown>
  getPopupContainer?: PopoverOptions['getPopupContainer']
  popoverProps?: {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    [key: string]: unknown
  }
}>()
const emit = defineEmits<{
  'update:modelValue': [value: SelectionValue | SelectionValue[] | undefined]
  change: [value: SelectionValue | SelectionValue[] | undefined, meta: unknown]
  search: [keyword: string]
  openChange: [open: boolean]
}>()
const fieldNames = computed(() =>
  props.fieldNames ?? ({ value: 'value', label: 'label' } as SelectFieldNames<TItem>),
)
const normalizedOptions = computed(() => normalizeSelectOptions(props.options, fieldNames.value))
const resolvedPopoverProps = computed(() => ({ ...props.popoverProps, getPopupContainer: props.getPopupContainer }))
</script>

<template>
  <SelectRoot
    :popover-props="resolvedPopoverProps"
    :open="popoverProps?.open"
    :default-open="popoverProps?.defaultOpen"
    :options="normalizedOptions"
    :value="modelValue"
    :default-value="defaultValue"
    :multiple="multiple"
    :show-search="searchable"
    :filter-option="filterOption"
    :clearable="clearable"
    :disabled="disabled"
    :loading="loading"
    :max-count="maxCount"
    :virtual="virtual"
    :status="status"
    @change="(value, meta) => { emit('update:modelValue', value); emit('change', value, meta) }"
    @search="emit('search', $event)"
    @open-change="(open) => { popoverProps?.onOpenChange?.(open); emit('openChange', open) }"
  >
    <SelectTrigger v-bind="$attrs" :input-props="inputProps" :placeholder="placeholder" :max-tag-count="maxTagCount">
      <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
      <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
      <template v-if="$slots.clear" #clear><slot name="clear" /></template>
      <template v-if="$slots.tag" #tag="slotProps"><slot name="tag" v-bind="slotProps" /></template>
    </SelectTrigger>
    <SelectContent>
      <template v-if="$slots.option" #option="slotProps"><slot name="option" v-bind="slotProps" /></template>
      <template v-if="$slots.loading" #loading><slot name="loading" /></template>
      <template v-if="$slots.empty" #empty><slot name="empty" /></template>
      <template v-if="$slots.popup" #popup="slotProps"><slot name="popup" v-bind="slotProps" /></template>
      <template v-if="$slots.footer" #footer><slot name="footer" /></template>
    </SelectContent>
  </SelectRoot>
</template>
