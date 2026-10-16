import { usePickerAppearance } from './appearance-context'
import type { DatePickerCalendarProps } from './appearance.types'
import { getPickerCalendarProps } from '@fex-design/core/date-picker/safe-props'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { type CalendarDate, type CalendarValue } from '@fex-design/core/calendar'
import { getGranularityByPicker } from '@fex-design/core/date-picker/panel'

import { datePickerPanelClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { splitProps, type ParentProps } from 'solid-js'
import { CalendarRoot, type CalendarRootProps } from '../calendar'

import { useRangePickerContext } from './context'

import { DefaultDatePickerPanelContent } from './date-picker-panel-content'

export interface RangePickerPanelProps<
  TValue extends CalendarValue = CalendarValue,
> extends ParentProps<
  Omit<CalendarRootProps<TValue>, 'value' | 'values' | 'range' | 'defaultValue' | 'onChange' | 'onSelect' | 'panel' | 'viewDate' | 'granularity' | 'weekStartsOn' | 'min' | 'max' | 'disabledDate' | 'monthSelection'>
> {
  calendarProps?: DatePickerCalendarProps | undefined
  panelViewDate?: CalendarDate
}

export function RangePickerPanel<TValue extends CalendarValue = CalendarValue>(
  props: RangePickerPanelProps<TValue>,
) {
  const [local, rest] = splitProps(props, ['class', 'style', 'calendarProps', 'children', 'panelViewDate', 'onMouseLeave'])
  const context = useRangePickerContext('RangePickerPanel')
  const appearance = usePickerAppearance()
  const calendar = () => getPickerCalendarProps(local.calendarProps ?? appearance().calendarProps)
  const displayRange = context.displayRange

  return (
    <CalendarRoot
      {...rest}
      monthSelection="drilldown"
      locale={calendar().locale}
      style={mergeStyle(calendar().style, local.style)}
      value={null}
      values={undefined}
      range={displayRange() as never}
      viewDate={local.panelViewDate ?? context.viewDate()}
      panel={context.panel()}
      granularity={getGranularityByPicker(context.picker)}
      weekStartsOn={context.weekStartsOn}
      min={context.minDate}
      max={context.maxDate}
      disabledDate={(date) => context.disabledDate?.(date, context.activePart()) ?? false}
      onSelect={context.select}
      onCellSelect={cell => { rest.onCellSelect?.(cell); context.previewCell(cell) }}
      onCellHover={cell => { rest.onCellHover?.(cell); context.setHoverValue(cell.value) }}
      onPanelChange={context.setPanel}
      onViewDateChange={context.setViewDate}
      onMouseLeave={event => { callEventHandler(local.onMouseLeave, event); if (!event.defaultPrevented) context.setHoverValue(null) }}
      class={cn(datePickerPanelClassName, calendar().class, local.class)}
    >
      {local.children === undefined ? <DefaultDatePickerPanelContent calendarProps={calendar()} /> : local.children}
    </CalendarRoot>
  )
}
