<script setup lang="ts">
import DatePickerTimePanel from './date-picker-time-panel.vue'
import { datePickerDateTimeLayoutClassName } from '@fex-design/components-styles/date-picker'
import { usePickerAppearance } from './appearance-context'
import type { DatePickerCalendarProps } from './appearance.types'
import { getPickerCalendarProps } from '@fex-design/core/date-picker/safe-props'
import DatePickerPanelContent from './date-picker-panel-content.vue'


import { type CalendarCell, type CalendarDate } from '@fex-design/core/calendar'
import { getGranularityByPicker } from '@fex-design/core/date-picker/panel'
import { datePickerPanelClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { computed, useAttrs } from 'vue'
import { CalendarRoot } from '../calendar'
import { useDatePickerContext, useRangePickerContext } from './context'





defineOptions({ name: 'DatePickerPanel', inheritAttrs: false })
const attrs = useAttrs()
function nativeAttrs() { const { onMouseleave, ...rest } = attrs; return rest }
function leave(event: MouseEvent) {
  const handlers = attrs.onMouseleave
  for (const handler of Array.isArray(handlers) ? handlers : [handlers]) if (typeof handler === 'function') handler(event)
  if (!event.defaultPrevented) owner.value.setHoverValue(null)
}
const props = defineProps<{
  calendarProps?: DatePickerCalendarProps | undefined
  class?: string | undefined
  panelViewDate?: CalendarDate | undefined
  range?: boolean | undefined
}>()
const datePicker = props.range ? null : useDatePickerContext('DatePickerPanel')
const rangePicker = props.range ? useRangePickerContext('RangePickerPanel') : null
const appearance = usePickerAppearance()
const calendar = computed(() => getPickerCalendarProps(props.calendarProps ?? appearance().calendarProps))
const owner = computed(() => rangePicker ?? datePicker!)
const currentRange = computed(() => {
  if (!rangePicker) return undefined
  return rangePicker.displayRange.value
})





function disabledDate(date: CalendarDate) {
  return rangePicker
    ? (rangePicker.disabledDate?.(date, rangePicker.activePart.value) ?? false)
    : (datePicker?.disabledDate?.(date) ?? false)
}

function hoverCell(cell: CalendarCell) {
  owner.value.setHoverValue(cell.value)
}
</script>

<template>
  <div :class="owner.showTime && !props.range ? datePickerDateTimeLayoutClassName : 'contents'">
  <CalendarRoot
    v-bind="nativeAttrs()"
    month-selection="drilldown"
    :locale="calendar.locale"
    :style="[calendar.style, attrs.style]"
    :class="cn(datePickerPanelClassName, calendar.class, props.class)"
    :value="datePicker?.calendarValue.value ?? null"
    :values="datePicker?.calendarValues.value"
    :range="currentRange"
    :view-date="props.panelViewDate ?? owner.viewDate.value"
    :panel="owner.panel.value"
    :granularity="getGranularityByPicker(owner.picker)"
    :week-starts-on="owner.weekStartsOn"
    :min="owner.minDate"
    :max="owner.maxDate"
    :disabled-date="disabledDate"
    @select="owner.select"
    @cell-select="owner.previewCell"
    @cell-hover="hoverCell"
    @panel-change="owner.setPanel"
    @view-date-change="owner.setViewDate"
    @mouseleave="leave"
  >
    <slot v-if="$slots.default" />
    <DatePickerPanelContent v-else :calendar-props="calendar" />
  </CalendarRoot>
  <DatePickerTimePanel v-if="owner.showTime && !props.range" />
  </div>
</template>
