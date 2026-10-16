<script setup lang="ts">
import { useAttrs } from 'vue'
import { definedPickerOptions } from '@fex-design/core/date-picker/options'
import type { CalendarRange } from '@fex-design/core/calendar'
import { RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/vue/primitive/date-picker'
import type { RangePickerProps } from './range-picker.types'
defineOptions({ name: 'RangePicker', inheritAttrs: false })
const props = withDefaults(defineProps<RangePickerProps>(), { open: undefined, defaultOpen: undefined, needConfirm: undefined, disabled: undefined, clearable: undefined, order: undefined, allowEmpty: undefined, footer: undefined })
const emit = defineEmits<{ 'update:value': [value: CalendarRange]; change: [value: CalendarRange]; 'update:open': [open: boolean]; openChange: [open: boolean] }>()
const attrs = useAttrs()
function rootOptions() { const { size, variant, startPlaceholder, endPlaceholder, separator, footer, onChange, onOpenChange, ...options } = props; return definedPickerOptions(options) }
function change(value: CalendarRange) { emit('update:value', value); emit('change', value) }
function openChange(open: boolean) { emit('update:open', open); emit('openChange', open) }
</script>
<template>
  <RangePickerRoot v-bind="rootOptions()" @change="change" @open-change="openChange">
    <template v-if="$slots.container" #container="binding"><slot name="container" v-bind="binding" /></template>
    <template #default="{ state }">
      <RangePickerTrigger v-bind="attrs" :size="props.size" :variant="props.variant" :start-placeholder="props.startPlaceholder" :end-placeholder="props.endPlaceholder" :separator="props.separator">
        <template v-if="$slots.trigger" #default="binding"><slot name="trigger" v-bind="binding" /></template>
        
        <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
      </RangePickerTrigger>
      <RangePickerContent>
        <slot v-if="$slots.panel" name="panel" :state="state" :panel="RangePickerPanelGroup" />
        <RangePickerPanelGroup v-else />
        <DatePickerFooter :content="props.footer"><template v-if="$slots.footer" #default="actions"><slot name="footer" v-bind="actions" /></template></DatePickerFooter>
      </RangePickerContent>
    </template>
  </RangePickerRoot>
</template>
