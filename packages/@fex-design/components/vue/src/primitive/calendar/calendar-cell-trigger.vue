<script setup lang="ts" generic="TValue extends CalendarValue = CalendarValue">
import { callCalendarHandler } from './events'
import { cn } from '@fex-design/utils'
import { computed, normalizeClass, useAttrs, useTemplateRef } from 'vue'
import { focusCalendarCell, type CalendarCell, type CalendarValue } from '@fex-design/core/calendar'
import { calendarCellTriggerClassName } from '@fex-design/components-styles/calendar'
import { useCalendarContext } from './context'
defineOptions({ name: 'CalendarCellTrigger', inheritAttrs: false })
const props = defineProps<{ cell: CalendarCell<TValue>; disabled?: boolean }>()
defineSlots<{ default?: (props: { cell: CalendarCell<TValue> }) => unknown }>()
const attrs = useAttrs()
function nativeAttrs() {
  const { onClick, onFocus, onKeydown, ...remaining } = attrs
  return remaining
}
const context = useCalendarContext('CalendarCellTrigger')
const tabIndex = computed(() => { context.state.value; return context.controller.getCellTabIndex(props.cell) })
function click(event: MouseEvent) {
  callCalendarHandler(attrs.onClick, event)
  if (!event.defaultPrevented) context.controller.selectCell(props.cell)
}
function focus(event: FocusEvent) {
  callCalendarHandler(attrs.onFocus, event)
  if (!event.defaultPrevented) context.controller.focusCell(props.cell)
}
function keydown(event: KeyboardEvent) {
  callCalendarHandler(attrs.onKeydown, event)
  if (event.defaultPrevented) return
  const target = context.controller.moveFocus(props.cell, event.key)
  if (target) { event.preventDefault(); focusCalendarCell(event.currentTarget as HTMLElement, target.key) }
}
const element = useTemplateRef<HTMLButtonElement>('element')
defineExpose({ element })
</script>
<template><button v-bind="nativeAttrs()" ref="element" type="button" data-slot="calendar-cell-trigger" :data-key="cell.key" :tabindex="tabIndex" @focus="focus" @keydown="keydown" :aria-label="attrs['aria-label'] ?? cell.date.toString()" :aria-pressed="cell.state.selected" :disabled="cell.state.disabled || props.disabled" :class="cn(calendarCellTriggerClassName, cell.state.today && 'focus-visible:ring-0', normalizeClass(attrs.class))" @click="click"><slot :cell="cell">{{ cell.label }}</slot></button></template>
