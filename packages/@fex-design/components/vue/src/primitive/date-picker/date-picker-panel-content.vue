<script setup lang="ts">
import { getDatePickerCellLabel } from '@fex-design/core/date-picker/panel'
import { calendarDefaultWeekLabels } from '@fex-design/core/calendar'
import { computed } from 'vue'
import { cn } from '@fex-design/utils'
import { getDatePickerPanelView } from '@fex-design/core/date-picker/view'
import { getDatePickerHeaderActions } from '@fex-design/core/date-picker/panel'
import {
  getDatePickerRowClassName,
  getDatePickerCellClassName,
  datePickerCellClassName,
  datePickerGridClassName,
  datePickerHeaderSideClassName,
  datePickerWeekHeaderClassName,
} from '@fex-design/components-styles/date-picker'
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarWeekHeader } from '../calendar'
import { useCalendarContext } from '../calendar/context'
import DatePickerHeader from './date-picker-header.vue'
import DatePickerHeaderButton from './date-picker-header-button.vue'
import DatePickerHeaderLabel from './date-picker-header-label.vue'
import DatePickerHeaderTitle from './date-picker-header-title.vue'
import { RenderContent } from './render-content'
import type { DatePickerCalendarProps } from './appearance.types'
import { useHeaderOwner } from './date-picker-header-owner'
defineOptions({ name: 'DatePickerPanelContent' })
const props = defineProps<{ calendarProps?: DatePickerCalendarProps }>()
const calendar = useCalendarContext('DatePickerPanelContent')
const owner = useHeaderOwner('DatePickerPanelContent')
const clearHover = () => owner.setHoverValue(null)
const view = computed(() => getDatePickerPanelView(calendar.state.value.panel))
</script>
<template>
  <DatePickerHeader
    :class="props.calendarProps?.classNames?.header"
    :style="props.calendarProps?.styles?.header"
  >
    <div :class="datePickerHeaderSideClassName">
      <DatePickerHeaderButton
        :action="getDatePickerHeaderActions(calendar.state.value.panel).previous"
      /><DatePickerHeaderButton v-if="view.showMonthNavigation" action="previous-month" />
    </div>
    <DatePickerHeaderTitle
      ><DatePickerHeaderLabel part="year" /><DatePickerHeaderLabel part="month"
    /></DatePickerHeaderTitle>
    <div :class="datePickerHeaderSideClassName">
      <DatePickerHeaderButton
        v-if="view.showMonthNavigation"
        action="next-month"
      /><DatePickerHeaderButton
        :action="getDatePickerHeaderActions(calendar.state.value.panel).next"
      />
    </div>
  </DatePickerHeader>
  <CalendarWeekHeader
    v-if="view.showWeekHeader"
    :labels="props.calendarProps?.locale?.weekdays ?? calendarDefaultWeekLabels"
    :class="cn(datePickerWeekHeaderClassName, props.calendarProps?.classNames?.weekHeader)"
    :style="props.calendarProps?.styles?.weekHeader"
  />
  <CalendarGrid
    @mouseleave="clearHover"
    :class="cn(datePickerGridClassName, props.calendarProps?.classNames?.grid)"
    :style="props.calendarProps?.styles?.grid"
    :row-props="{
      class: cn(
        getDatePickerRowClassName(calendar.state.value.panel),
        props.calendarProps?.classNames?.row,
      ),
      style: props.calendarProps?.styles?.row,
    }"
  >
    <template #default="{ cell }">
      <CalendarCell
        :cell="cell"
        :onMouseenter="cell.state.disabled ? clearHover : undefined"
        :class="
          cn(
            datePickerCellClassName,
            getDatePickerCellClassName(cell.panel),
            props.calendarProps?.classNames?.cell,
          )
        "
        :style="props.calendarProps?.styles?.cell"
      >
        <CalendarCellTrigger
          :cell="cell"
          :class="props.calendarProps?.classNames?.cellTrigger"
          :style="props.calendarProps?.styles?.cellTrigger"
          >{{ getDatePickerCellLabel(cell, props.calendarProps?.locale) }}</CalendarCellTrigger
        >
        <div
          v-if="props.calendarProps?.cellRender"
          data-slot="calendar-cell-content"
          :class="props.calendarProps.classNames?.cellContent"
          :style="props.calendarProps.styles?.cellContent"
        >
          <RenderContent
            :value="
              props.calendarProps.cellRender({
                state: calendar.state.value,
                controller: calendar.controller,
                cell,
              })
            "
          />
        </div>
      </CalendarCell>
    </template>
  </CalendarGrid>
</template>
