import { usePickerAppearance } from './appearance-context'
import type { DatePickerCalendarProps } from './appearance.types'
import { getPickerCalendarProps } from '@fex-design/core/date-picker/safe-props'
import { type CalendarDate, type CalendarValue } from '@fex-design/core/calendar'
import { getGranularityByPicker } from '@fex-design/core/date-picker/panel'

import { datePickerPanelClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import type { ComponentProps, ReactNode } from 'react'
import { CalendarRoot } from '@fex-design/react/primitive/calendar'

import { useRangePickerContext } from './context'
import { DefaultDatePickerPanelContent } from './date-picker-panel-content'

export interface RangePickerPanelProps<TValue extends CalendarValue = CalendarValue> extends Omit<
  ComponentProps<typeof CalendarRoot<TValue>>,
  | 'value'
  | 'values'
  | 'range'
  | 'defaultValue'
  | 'onChange'
  | 'onSelect'
  | 'panel'
  | 'viewDate'
  | 'granularity'
  | 'weekStartsOn'
  | 'min'
  | 'max'
  | 'disabledDate'
  | 'monthSelection'
> {
  children?: ReactNode
  calendarProps?: DatePickerCalendarProps | undefined
  panelViewDate?: CalendarDate | undefined
}

export function RangePickerPanel<TValue extends CalendarValue = CalendarValue>({
  className,
  style,
  calendarProps,
  children,
  panelViewDate,
  ...props
}: RangePickerPanelProps<TValue>) {
  const context = useRangePickerContext('RangePickerPanel')
  const appearance = usePickerAppearance()
  const calendar = getPickerCalendarProps(calendarProps ?? appearance.calendarProps)
  const viewDate = panelViewDate ?? context.viewDate
  const displayRange = context.displayRange

  return (
    <CalendarRoot
      {...props}
      monthSelection="drilldown"
      locale={calendar.locale}
      style={{ ...calendar.style, ...style }}
      value={null}
      values={undefined}
      range={displayRange as never}
      viewDate={viewDate}
      panel={context.panel}
      granularity={getGranularityByPicker(context.picker)}
      weekStartsOn={context.weekStartsOn}
      min={context.minDate}
      max={context.maxDate}
      disabledDate={(date) => context.disabledDate?.(date, context.activePart) ?? false}
      onSelect={context.select}
      onCellSelect={(cell) => {
        props.onCellSelect?.(cell)
        context.previewCell(cell)
      }}
      onCellHover={(cell) => {
        props.onCellHover?.(cell)
        context.setHoverValue(cell.value)
      }}
      onPanelChange={context.setPanel}
      onViewDateChange={context.setViewDate}
      onMouseLeave={(event) => {
        props.onMouseLeave?.(event)
        if (!event.defaultPrevented) context.setHoverValue(null)
      }}
      className={cn(datePickerPanelClassName, calendar.className, className)}
    >
      {children === undefined ? (
        <DefaultDatePickerPanelContent calendarProps={calendar} />
      ) : (
        children
      )}
    </CalendarRoot>
  )
}
