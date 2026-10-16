import { getDatePickerCellLabel } from '@fex-design/core/date-picker/panel'
import { calendarDefaultWeekLabels } from '@fex-design/core/calendar'
import type { DatePickerCalendarProps } from './appearance.types'
import { cn } from '@fex-design/utils'
import { getDatePickerPanelView } from '@fex-design/core/date-picker/view'
import { getDatePickerHeaderActions } from '@fex-design/core/date-picker/panel'

import { getDatePickerRowClassName, getDatePickerCellClassName, datePickerCellClassName, datePickerGridClassName, datePickerHeaderSideClassName, datePickerWeekHeaderClassName } from '@fex-design/components-styles/date-picker'

import { Show } from 'solid-js'
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarWeekHeader } from '../calendar'
import { useCalendarContext } from '../calendar/calendar-context'

import { DatePickerHeader } from './date-picker-header'
import { DatePickerHeaderButton } from './date-picker-header-button'
import { DatePickerHeaderLabel } from './date-picker-header-label'
import { DatePickerHeaderTitle } from './date-picker-header-title'
import { useHeaderOwner } from './date-picker-header-owner'

export function DefaultDatePickerPanelContent(props: { calendarProps?: DatePickerCalendarProps }) {
  const calendar = useCalendarContext('DefaultDatePickerPanelContent')
  const owner = useHeaderOwner()
  const appearance = () => props.calendarProps
  const panelView = () => getDatePickerPanelView(calendar.state().panel)
  return (
    <>
      <DatePickerHeader class={appearance()?.classNames?.header} style={appearance()?.styles?.header}>
        <div class={datePickerHeaderSideClassName}>
          <DatePickerHeaderButton action={getDatePickerHeaderActions(calendar.state().panel).previous} />
          <Show when={panelView().showMonthNavigation}>
            <DatePickerHeaderButton action="previous-month" />
          </Show>
        </div>
        <DatePickerHeaderTitle>
          <DatePickerHeaderLabel part="year" />
          <DatePickerHeaderLabel part="month" />
        </DatePickerHeaderTitle>
        <div class={datePickerHeaderSideClassName}>
          <Show when={panelView().showMonthNavigation}>
            <DatePickerHeaderButton action="next-month" />
          </Show>
          <DatePickerHeaderButton action={getDatePickerHeaderActions(calendar.state().panel).next} />
        </div>
      </DatePickerHeader>
      <Show when={panelView().showWeekHeader}>
        <CalendarWeekHeader class={cn(datePickerWeekHeaderClassName, appearance()?.classNames?.weekHeader)} style={appearance()?.styles?.weekHeader} labels={appearance()?.locale?.weekdays ?? calendarDefaultWeekLabels} />
      </Show>
      <CalendarGrid onMouseLeave={() => owner.setHoverValue(null)} class={cn(datePickerGridClassName, appearance()?.classNames?.grid)} style={appearance()?.styles?.grid} rowProps={{ class: cn(getDatePickerRowClassName(calendar.state().panel), appearance()?.classNames?.row), style: appearance()?.styles?.row }}>
        {cell => <CalendarCell cell={cell} onMouseEnter={cell.state.disabled ? () => owner.setHoverValue(null) : undefined} class={cn(datePickerCellClassName, getDatePickerCellClassName(cell.panel), appearance()?.classNames?.cell)} style={appearance()?.styles?.cell}>
          <CalendarCellTrigger cell={cell} class={appearance()?.classNames?.cellTrigger} style={appearance()?.styles?.cellTrigger}>{getDatePickerCellLabel(cell, appearance()?.locale)}</CalendarCellTrigger>
          <Show when={appearance()?.cellRender}>{render => <div data-slot="calendar-cell-content" class={appearance()?.classNames?.cellContent} style={appearance()?.styles?.cellContent}>{render()({ state: calendar.state(), controller: calendar.controller, cell })}</div>}</Show>
        </CalendarCell>}
      </CalendarGrid>
    </>
  )
}
