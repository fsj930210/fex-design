<script setup lang="ts" generic="TValue extends CalendarValue = CalendarValue">
import { callCalendarHandler } from './events'
import { cn } from '@fex-design/utils'
import { provide, normalizeClass, useAttrs, useTemplateRef } from 'vue'
import type { CalendarOptions, CalendarCell, CalendarDate, CalendarPanel, CalendarSelectInfo, CalendarValue } from '@fex-design/core/calendar'
import { calendarRootClassName } from '@fex-design/components-styles/calendar'
import { calendarContextKey } from './context'
import { useCalendar } from './use-calendar'
const attrs = useAttrs()
function nativeAttrs() {
  const { onMouseleave, ...remaining } = attrs
  return remaining
}
defineOptions({ name: 'CalendarRoot', inheritAttrs: false })
const props = defineProps<Omit<CalendarOptions<TValue>, 'onChange' | 'onSelect' | 'onCellSelect' | 'onCellHover' | 'onViewDateChange' | 'onPanelChange'>>()
const emit = defineEmits<{ change: [value: TValue]; select: [value: TValue, info: CalendarSelectInfo]; cellSelect: [cell: CalendarCell]; cellHover: [cell: CalendarCell]; viewDateChange: [date: CalendarDate]; panelChange: [panel: CalendarPanel] }>()
const calendar = useCalendar(() => ({ ...props, onChange: value => emit('change', value), onSelect: (value, info) => emit('select', value, info), onCellSelect: cell => emit('cellSelect', cell), onCellHover: cell => emit('cellHover', cell), onViewDateChange: date => emit('viewDateChange', date), onPanelChange: panel => emit('panelChange', panel) }))
provide(calendarContextKey, calendar)
function leave(event: MouseEvent) {
  callCalendarHandler(attrs.onMouseleave, event)
  if (!event.defaultPrevented) calendar.controller.clearHoveredRow()
}
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element, ...calendar })
</script>
<template><div v-bind="nativeAttrs()" ref="element" data-slot="calendar-root" :data-panel="calendar.state.value.panel" :data-granularity="calendar.state.value.granularity" :class="cn(calendarRootClassName, normalizeClass(attrs.class))" @mouseleave="leave"><slot /></div></template>
