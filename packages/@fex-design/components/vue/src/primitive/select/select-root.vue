<script setup lang="ts">
import { createSelectController } from '@fex-design/core/select/create-select-controller'
import { filterSelectOptions } from '@fex-design/core/select/filter-options'
import type {
  SelectFilterOption,
  SelectOption,
  SelectVirtualOptions,
} from '@fex-design/core/select/types'
import { createSelectionController } from '@fex-design/core/selection/create-selection-controller'
import type { SelectionValue } from '@fex-design/core/selection/types'
import { computed, provide, useId } from 'vue'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import PopoverRoot from '../popover/popover-root.vue'
import { selectKey } from './context'

interface SelectChangeMeta {
  selectedItem?: SelectOption | undefined
  selectedItems: SelectOption[]
  previousSelectedValues: SelectionValue[]
  changedValues: SelectionValue[]
}

const props = withDefaults(
  defineProps<{
    items?: readonly SelectOption[]
    value?: SelectionValue | SelectionValue[]
    defaultValue?: SelectionValue | SelectionValue[]
    multiple?: boolean
    maxCount?: number
    disabled?: boolean
    clearable?: boolean
    loading?: boolean
    showSearch?: boolean
    filterOption?: SelectFilterOption
    open?: boolean | undefined
    defaultOpen?: boolean
    status?: 'error' | 'warning' | undefined
    virtual?: SelectVirtualOptions
    popoverProps?: Record<string, unknown>
  }>(),
  {
    items: () => [],
    disabled: false,
    clearable: false,
    loading: false,
    showSearch: false,
    open: undefined,
  },
)
const emit = defineEmits<{
  change: [value: SelectionValue | SelectionValue[] | undefined, meta: SelectChangeMeta]
  openChange: [open: boolean]
  search: [keyword: string]
}>()
const isMultiple = computed(() => props.multiple === true)
const selection = createSelectionController({
  get value() {
    return props.value
  },
  get defaultValue() {
    return props.defaultValue
  },
  get multiple() {
    return isMultiple.value
  },
  get disabledValues() {
    return props.items.filter((option) => option.disabled).map((option) => option.value)
  },
  onChange(values, meta) {
    const selectedItems = values.map(
      (value) =>
        props.items.find((option) => option.value === value) ?? { value, label: String(value) },
    )
    const selectedItem =
      meta.changedValues
        .map(
          (value) =>
            props.items.find((option) => option.value === value) ?? {
              value,
              label: String(value),
            },
        )
        .find((item) => values.includes(item.value)) ?? selectedItems[0]
    emit('change', isMultiple.value ? values : values[0], {
      selectedItem,
      selectedItems,
      previousSelectedValues: [...meta.previousValues],
      changedValues: [...meta.changedValues],
    })
  },
})
let controller!: ReturnType<typeof createSelectController>
controller = createSelectController({
  selection,
  get options() {
    return filterSelectOptions(
      props.items,
      controller.getSnapshot().searchValue,
      props.filterOption,
    )
  },
  get multiple() {
    return isMultiple.value
  },
  get maxCount() {
    return props.maxCount
  },
  get open() {
    return props.open
  },
  get defaultOpen() {
    return props.defaultOpen
  },
  onOpenChange: (open) => emit('openChange', open),
  onSearch: (keyword) => emit('search', keyword),
})
const snapshot = useCoreStore(controller)
const options = computed(() => props.items)
const visibleOptions = computed(() =>
  props.filterOption
    ? filterSelectOptions(props.items, snapshot.value.searchValue, props.filterOption)
    : props.items,
)
const selectedOptions = computed(() => {
  void snapshot.value.selectedValues
  return selection
    .getSnapshot()
    .values.map(
      (value) =>
        props.items.find((option) => option.value === value) ?? { value, label: String(value) },
    )
})
provide(selectKey, {
  controller,
  snapshot,
  options,
  visibleOptions,
  selectedOptions,
  multiple: isMultiple,
  showSearch: computed(() => props.showSearch),
  disabled: computed(() => props.disabled),
  clearable: computed(() => props.clearable),
  loading: computed(() => props.loading),
  status: computed(() => props.status),
  virtual: computed(() => props.virtual),
  listId: `select-${useId()}`,
  removeValue(value) {
    selection.unselect(value)
  },
})
function syncOpen(open: boolean) {
  if (open) controller.open()
  else controller.close()
}
</script>
<template>
  <PopoverRoot v-bind="popoverProps" :open="snapshot.open" @open-change="syncOpen"><slot /></PopoverRoot>
</template>
