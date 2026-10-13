<script setup lang="ts">
import { computed } from 'vue'
import { getCalendarUIView, resolveCalendarSemanticValue, type CalendarUIOptions, type CalendarSemanticPart, type CalendarRenderContext, type CalendarCellRenderContext } from '@fex-design/core/calendar'
import { calendarUIClasses, calendarUIFullCellClassName, calendarUIMiniCellClassName, calendarUIFullTriggerClassName, calendarUIMiniTriggerClassName, calendarUIWeekRowClassName, calendarUIDateRowClassName, calendarUIMonthRowClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { CalendarHeader, CalendarWeekHeader, CalendarRow, CalendarCell, CalendarCellTrigger, CalendarFooter } from '../../primitive/calendar'
import { useCalendarContext } from '../../primitive/calendar/context'
import type { CalendarAppearance } from './types'
defineOptions({ name: 'CalendarContent' })
const props = withDefaults(defineProps<CalendarAppearance & { options: CalendarUIOptions; headerRender?: false | undefined }>(), { headerRender: undefined })
defineSlots<{ header?: (context: CalendarRenderContext) => unknown; cell?: (context: CalendarCellRenderContext) => unknown; fullCell?: (context: CalendarCellRenderContext) => unknown; footer?: (context: CalendarRenderContext) => unknown }>()
const calendar = useCalendarContext('Calendar')
const context = computed(() => ({ state: calendar.state.value, controller: calendar.controller }))
const view = computed(() => getCalendarUIView(context.value, props.options))
const columns = computed(() => view.value.showWeek ? calendarUIWeekRowClassName : context.value.state.panel === 'date' ? calendarUIDateRowClassName : calendarUIMonthRowClassName)
const appearance = computed(() => ({ classNames: resolveCalendarSemanticValue(props.classNames, context.value), styles: resolveCalendarSemanticValue(props.styles, context.value) }))
const cls = (part: CalendarSemanticPart) => cn(calendarUIClasses[part], appearance.value.classNames?.[part])
</script>
<template>
  <CalendarHeader v-if="headerRender !== false" :class="cls('header')" :style="appearance.styles?.header">
    <template v-if="$slots.header" #default><slot name="header" v-bind="context" /></template>
  </CalendarHeader>
  <div v-if="context.state.panel === 'date'" :class="cn(calendarUIClasses.weekHeader, columns, appearance.classNames?.weekHeader)" :style="appearance.styles?.weekHeader" data-slot="calendar-week-header">
    <div v-if="view.showWeek" :class="cls('weekNumber')" :style="appearance.styles?.weekNumber">{{ view.locale.week }}</div>
    <CalendarWeekHeader :labels="view.locale.weekdays" class="contents py-0" />
  </div>
  <div role="grid" data-slot="calendar-grid" :data-panel="context.state.panel" :class="cls('grid')" :style="appearance.styles?.grid" @mouseleave="calendar.controller.clearHoveredRow()">
    <CalendarRow v-for="row in view.rows" :key="row.key" :class="cn(calendarUIClasses.row, columns, appearance.classNames?.row)" :style="appearance.styles?.row">
      <div v-if="view.showWeek" role="rowheader" data-slot="calendar-week-number" :class="cls('weekNumber')" :style="appearance.styles?.weekNumber">{{ row.week.week }}</div>
      <CalendarCell v-for="cell in row.cells" :key="cell.key" :cell="cell" :class="cn(view.fullscreen ? calendarUIFullCellClassName : calendarUIMiniCellClassName, cls('cell'))" :style="appearance.styles?.cell">
        <slot name="fullCell" v-bind="{ ...context, cell }">
          <CalendarCellTrigger :cell="cell" :class="cn(view.fullscreen ? calendarUIFullTriggerClassName : calendarUIMiniTriggerClassName, cls('cellTrigger'))" :style="appearance.styles?.cellTrigger">{{ view.label(cell) }}</CalendarCellTrigger>
          <div v-if="$slots.cell" data-slot="calendar-cell-content" :class="cls('cellContent')" :style="appearance.styles?.cellContent"><slot name="cell" v-bind="{ ...context, cell }" /></div>
        </slot>
      </CalendarCell>
    </CalendarRow>
  </div>
  <CalendarFooter v-if="$slots.footer" :class="cls('footer')" :style="appearance.styles?.footer"><slot name="footer" v-bind="context" /></CalendarFooter>
</template>
