<script setup lang="ts">
import {
  getCalendarValueDate,
  type CalendarCell,
  type CalendarDate,
} from '@fex-design/core/calendar'
import { getGranularityByPicker } from '@fex-design/core/date-picker/panel'
import { createRangePreviewValue } from '@fex-design/core/date-picker/range'
import { normalizeDatePickerValue } from '@fex-design/core/date-picker/value'
import {
  datePickerCellClassName,
  datePickerGridClassName,
  datePickerHeaderSideClassName,
  datePickerPanelClassName,
  datePickerWeekHeaderClassName,
} from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { computed } from 'vue'
import {
  CalendarCell as CalendarCellView,
  CalendarGrid,
  CalendarRoot,
  CalendarWeekHeader,
} from '../calendar'
import { useDatePickerContext, useRangePickerContext } from './context'
import DatePickerHeader from './date-picker-header.vue'
import DatePickerHeaderButton from './date-picker-header-button.vue'
import DatePickerHeaderLabel from './date-picker-header-label.vue'
import DatePickerHeaderTitle from './date-picker-header-title.vue'

const props = defineProps<{
  class?: string | undefined
  panelViewDate?: CalendarDate | undefined
  range?: boolean | undefined
}>()
const datePicker = props.range ? null : useDatePickerContext('DatePickerPanel')
const rangePicker = props.range ? useRangePickerContext('RangePickerPanel') : null
const owner = computed(() => rangePicker ?? datePicker!)
const currentRange = computed(() => {
  if (!rangePicker) return undefined
  const hoverValue = rangePicker.hoverValue.value
  const rangeValue = rangePicker.rangeValue.value
  return createRangePreviewValue(rangeValue, hoverValue, rangePicker.activePart.value)
})



function selectValue(value: import('@fex-design/core/calendar').CalendarValue) {
  const context = owner.value
  context.select(normalizeDatePickerValue(getCalendarValueDate(value), context.picker, context.weekStartsOn) as never)
}

function disabledDate(date: CalendarDate) {
  return rangePicker
    ? (rangePicker.disabledDate?.(date, rangePicker.activePart.value) ?? false)
    : (datePicker?.disabledDate?.(date) ?? false)
}

function hoverCell(cell: CalendarCell) {
  rangePicker?.setHoverValue(cell.value)
}
</script>

<template>
  <CalendarRoot
    :class="cn(datePickerPanelClassName, props.class)"
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
    @select="selectValue"
    @cell-hover="hoverCell"
    @panel-change="owner.setPanel"
    @view-date-change="owner.setViewDate"
    @mouseleave="rangePicker?.setHoverValue(null)"
  >
    <slot>
      <DatePickerHeader>
        <div :class="datePickerHeaderSideClassName">
          <DatePickerHeaderButton
            :action="owner.panel.value === 'date' ? 'previous-year' : 'previous-panel'"
          />
          <DatePickerHeaderButton v-if="owner.panel.value === 'date'" action="previous-month" />
        </div>
        <DatePickerHeaderTitle>
          <DatePickerHeaderLabel part="year" />
          <DatePickerHeaderLabel part="month" />
        </DatePickerHeaderTitle>
        <div :class="datePickerHeaderSideClassName">
          <DatePickerHeaderButton v-if="owner.panel.value === 'date'" action="next-month" />
          <DatePickerHeaderButton
            :action="owner.panel.value === 'date' ? 'next-year' : 'next-panel'"
          />
        </div>
      </DatePickerHeader>
      <CalendarWeekHeader
        v-if="owner.panel.value === 'date'"
        :class="datePickerWeekHeaderClassName"
      />
      <CalendarGrid :class="datePickerGridClassName">
        <template #default="{ cell }">
          <CalendarCellView :cell="cell" :class="datePickerCellClassName" />
        </template>
      </CalendarGrid>
    </slot>
  </CalendarRoot>
</template>
