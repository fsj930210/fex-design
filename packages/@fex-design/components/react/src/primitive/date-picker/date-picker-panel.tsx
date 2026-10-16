import { usePickerAppearance } from './appearance-context'
import type { DatePickerCalendarProps } from './appearance.types'
import { getPickerCalendarProps } from '@fex-design/core/date-picker/safe-props'
import { type CalendarValue } from '@fex-design/core/calendar'
import { getGranularityByPicker } from '@fex-design/core/date-picker/panel'

import { datePickerPanelClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import type { ComponentProps, ReactNode } from 'react'
import { CalendarRoot } from '../calendar'

import { useDatePickerContext } from './context'
import { DefaultDatePickerPanelContent } from './date-picker-panel-content'

export interface DatePickerPanelProps<TValue extends CalendarValue = CalendarValue> extends Omit<
  ComponentProps<typeof CalendarRoot<TValue>>,
  'value' | 'values' | 'defaultValue' | 'onChange' | 'onSelect' | 'panel' | 'viewDate' | 'granularity' | 'weekStartsOn' | 'min' | 'max' | 'disabledDate' | 'monthSelection'
> {
  calendarProps?: DatePickerCalendarProps | undefined
  children?: ReactNode
}

export function DatePickerPanel<TValue extends CalendarValue = CalendarValue>({
  className, style, calendarProps,
  children,
  ...props
}: DatePickerPanelProps<TValue>) {
  const context = useDatePickerContext('DatePickerPanel')
  const appearance = usePickerAppearance()
  const calendar = getPickerCalendarProps(calendarProps ?? appearance.calendarProps)

  return (
    <CalendarRoot
      {...props}
      monthSelection="drilldown"
      locale={calendar.locale}
      style={{ ...calendar.style, ...style }}
      value={context.calendarValue as TValue | null}
      values={context.calendarValues as readonly TValue[]}
      viewDate={context.viewDate}
      panel={context.panel}
      granularity={getGranularityByPicker(context.picker)}
      weekStartsOn={context.weekStartsOn}
      min={context.minDate}
      max={context.maxDate}
      {...(context.disabledDate ? { disabledDate: context.disabledDate } : {})}
      onSelect={context.select}
      onCellSelect={cell => { props.onCellSelect?.(cell); context.previewCell(cell) }}
      onCellHover={cell => { props.onCellHover?.(cell); context.setHoverValue(cell.value) }}
      onPanelChange={context.setPanel}
      onViewDateChange={context.setViewDate}
      onMouseLeave={event => { props.onMouseLeave?.(event); if (!event.defaultPrevented) context.setHoverValue(null) }}
      className={cn(datePickerPanelClassName, calendar.className, className)}
    >
      {children === undefined ? <DefaultDatePickerPanelContent calendarProps={calendar} /> : children}
    </CalendarRoot>
  )
}
