import { DatePickerTimePanel } from './date-picker-time-panel'
import { datePickerDateTimeLayoutClassName } from '@fex-design/components-styles/date-picker'
import { usePickerAppearance } from './appearance-context'
import type { DatePickerCalendarProps } from './appearance.types'
import { getPickerCalendarProps } from '@fex-design/core/date-picker/safe-props'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { type CalendarValue } from '@fex-design/core/calendar'
import { getGranularityByPicker } from '@fex-design/core/date-picker/panel'

import { datePickerPanelClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { Show, splitProps, type ParentProps } from 'solid-js'
import { CalendarRoot, type CalendarRootProps } from '../calendar'

import { useDatePickerContext } from './context'

import { DefaultDatePickerPanelContent } from './date-picker-panel-content'

export interface DatePickerPanelProps<
  TValue extends CalendarValue = CalendarValue,
> extends ParentProps<
  Omit<
    CalendarRootProps<TValue>,
    | 'value'
    | 'values'
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
  >
> {
  calendarProps?: DatePickerCalendarProps | undefined
}

export function DatePickerPanel<TValue extends CalendarValue = CalendarValue>(
  props: DatePickerPanelProps<TValue>,
) {
  const [local, rest] = splitProps(props, ['class', 'style', 'calendarProps', 'children'])
  const context = useDatePickerContext('DatePickerPanel')
  const appearance = usePickerAppearance()
  const calendar = () => getPickerCalendarProps(local.calendarProps ?? appearance().calendarProps)

  const calendarElement = (
    <CalendarRoot
      {...rest}
      monthSelection="drilldown"
      locale={calendar().locale}
      style={mergeStyle(calendar().style, local.style)}
      value={context.calendarValue() as TValue | null}
      values={context.calendarValues() as readonly TValue[]}
      viewDate={context.viewDate()}
      panel={context.panel()}
      granularity={getGranularityByPicker(context.picker)}
      weekStartsOn={context.weekStartsOn}
      min={context.minDate}
      max={context.maxDate}
      disabledDate={context.disabledDate}
      onSelect={context.select}
      onCellSelect={(cell) => {
        rest.onCellSelect?.(cell)
        context.previewCell(cell)
      }}
      onCellHover={(cell) => {
        rest.onCellHover?.(cell)
        context.setHoverValue(cell.value)
      }}
      onPanelChange={context.setPanel}
      onViewDateChange={context.setViewDate}
      onMouseLeave={(event) => {
        callEventHandler(rest.onMouseLeave, event)
        if (!event.defaultPrevented) context.setHoverValue(null)
      }}
      class={cn(datePickerPanelClassName, calendar().class, local.class)}
    >
      {local.children === undefined ? (
        <DefaultDatePickerPanelContent calendarProps={calendar()} />
      ) : (
        local.children
      )}
    </CalendarRoot>
  )
  return (
    <Show when={context.showTime} fallback={calendarElement}>
      <div class={datePickerDateTimeLayoutClassName}>
        {calendarElement}
        <DatePickerTimePanel />
      </div>
    </Show>
  )
}
