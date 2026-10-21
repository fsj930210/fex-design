<script setup lang="ts" generic="TValue extends CalendarValue = CalendarValue">
import type { HTMLAttributes } from 'vue'
const props = defineProps<{ rowProps?: HTMLAttributes }>()
import { callCalendarHandler } from './events'
import { cn } from '@fex-design/utils'
import { computed, normalizeClass, useAttrs, useTemplateRef } from 'vue'
import { calendarGridClassName } from '@fex-design/components-styles/calendar'
import { useCalendarContext } from './context'
import CalendarRow from './calendar-row.vue'
import CalendarCell from './calendar-cell.vue'
import type {
  CalendarCell as Cell,
  CalendarGrid as Grid,
  CalendarValue,
} from '@fex-design/core/calendar'
defineSlots<{ default?: (props: { cell: Cell<TValue> }) => unknown }>()
const attrs = useAttrs()
function nativeAttrs() {
  const { onMouseleave, ...remaining } = attrs
  return remaining
}
defineOptions({ name: 'CalendarGrid', inheritAttrs: false })
const context = useCalendarContext('CalendarGrid')
const grid = computed(() => context.grid.value as Grid<TValue>)
function leave(event: MouseEvent) {
  callCalendarHandler(attrs.onMouseleave, event)
  if (!event.defaultPrevented) context.controller.clearHoveredRow()
}
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
</script>
<template>
  <div
    v-bind="nativeAttrs()"
    ref="element"
    role="grid"
    data-slot="calendar-grid"
    :data-panel="context.state.value.panel"
    :class="cn(calendarGridClassName, normalizeClass(attrs.class))"
    @mouseleave="leave"
  >
    <CalendarRow
      v-bind="props.rowProps"
      v-for="row in grid.rows"
      :key="row.map((cell) => cell.key).join('|')"
      ><template v-for="cell in row" :key="cell.key"
        ><slot :cell="cell"><CalendarCell :cell="cell" /></slot></template
    ></CalendarRow>
  </div>
</template>
