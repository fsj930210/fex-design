<script setup lang="ts" generic="TValue extends CalendarValue = CalendarValue">
import { callCalendarHandler } from './events'
import { cn } from '@fex-design/utils'
import { computed, normalizeClass, useAttrs, useTemplateRef } from 'vue'
import {
  getCalendarCellAttributes,
  type CalendarCell,
  type CalendarValue,
} from '@fex-design/core/calendar'
import {
  calendarCellContainerClassName,
  calendarCellClassName,
  calendarWeekRangeCellClassName,
} from '@fex-design/components-styles/calendar'
import { useCalendarContext } from './context'
import CalendarCellTrigger from './calendar-cell-trigger.vue'
defineOptions({ name: 'CalendarCell', inheritAttrs: false })
const props = defineProps<{ cell: CalendarCell<TValue> }>()
defineSlots<{ default?: (props: { cell: CalendarCell<TValue> }) => unknown }>()
const attrs = useAttrs()
function nativeAttrs() {
  const { onMouseenter, ...remaining } = attrs
  return remaining
}
const context = useCalendarContext('CalendarCell')
const stateAttrs = computed(() =>
  getCalendarCellAttributes(
    props.cell,
    context.state.value.hoveredRowIndex,
    context.state.value.hasRange,
  ),
)
function hover(event: MouseEvent) {
  callCalendarHandler(attrs.onMouseenter, event)
  if (!event.defaultPrevented) context.controller.hoverCell(props.cell)
}
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
</script>
<template>
  <div
    v-bind="{ ...nativeAttrs(), ...stateAttrs }"
    ref="element"
    role="gridcell"
    data-slot="calendar-cell"
    :aria-selected="cell.state.selected"
    :aria-disabled="cell.state.disabled"
    :class="
      cn(
        calendarCellContainerClassName,
        calendarCellClassName,
        cell.granularity === 'week' && calendarWeekRangeCellClassName,
        normalizeClass(attrs.class),
      )
    "
    @mouseenter="hover"
  >
    <slot :cell="cell"><CalendarCellTrigger :cell="cell" /></slot>
  </div>
</template>
