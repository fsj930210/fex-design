<script setup lang="ts">
import { useAttrs } from 'vue'
import { definedPickerOptions } from '@fex-design/core/date-picker/options'

import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
  type DatePickerSelectionValue,
} from '@fex-design/vue/primitive/date-picker'
import type { DatePickerProps } from './date-picker.types'
defineOptions({ name: 'DatePicker', inheritAttrs: false })
const props = withDefaults(defineProps<DatePickerProps>(), {
  open: undefined,
  defaultOpen: undefined,
  needConfirm: undefined,
  disabled: undefined,
  clearable: undefined,
  multiple: undefined,
  footer: undefined,
})
const emit = defineEmits<{
  'update:value': [value: DatePickerSelectionValue]
  change: [value: DatePickerSelectionValue]
  'update:open': [open: boolean]
  openChange: [open: boolean]
}>()
const attrs = useAttrs()
function rootOptions() {
  const { size, variant, placeholder, footer, onChange, onOpenChange, ...options } = props
  return definedPickerOptions(options)
}
function change(value: DatePickerSelectionValue) {
  emit('update:value', value)
  emit('change', value)
}
function openChange(open: boolean) {
  emit('update:open', open)
  emit('openChange', open)
}
</script>
<template>
  <DatePickerRoot v-bind="rootOptions()" @change="change" @open-change="openChange">
    <template v-if="$slots.container" #container="binding"
      ><slot name="container" v-bind="binding"
    /></template>
    <template #default="{ state }">
      <DatePickerTrigger
        v-bind="attrs"
        :size="props.size"
        :variant="props.variant"
        :placeholder="props.placeholder"
      >
        <template v-if="$slots.trigger" #default="binding"
          ><slot name="trigger" v-bind="binding"
        /></template>
        <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
        <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
      </DatePickerTrigger>
      <DatePickerContent>
        <slot v-if="$slots.panel" name="panel" :state="state" :panel="DatePickerPanel" />
        <DatePickerPanel v-else />
        <DatePickerFooter :content="props.footer"
          ><template v-if="$slots.footer" #default="actions"
            ><slot name="footer" v-bind="actions" /></template
        ></DatePickerFooter>
      </DatePickerContent>
    </template>
  </DatePickerRoot>
</template>
