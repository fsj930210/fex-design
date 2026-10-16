import { DatePickerTimePanel } from './date-picker-time-panel'
import { usePickerAppearance } from './appearance-context'
import { getVisibleRangePanelViewDates } from '@fex-design/core/date-picker/panel'
import { datePickerPanelsClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { useRangePickerContext } from './context'
import { RangePickerPanel } from './range-picker-panel'

export interface RangePickerPanelGroupProps extends ComponentProps<'div'> {
  panelCount?: 1 | 2 | undefined
}

export function RangePickerPanelGroup({
  panelCount = 2,
  className, style,
  children,
  ...props
}: RangePickerPanelGroupProps) {
  const context = useRangePickerContext('RangePickerPanelGroup')
  const appearance = usePickerAppearance()
  const viewDates = getVisibleRangePanelViewDates(context.viewDate, context.panel, context.showTime ? 1 : panelCount)

  return (
    <div
      {...props}
      style={{ ...appearance.styles?.panelGroup, ...style }}
      onMouseLeave={event => { props.onMouseLeave?.(event); if (!event.defaultPrevented) context.setHoverValue(null) }}
      role={props.role ?? "group"}
      data-slot="range-picker-panel-group"
      className={cn(datePickerPanelsClassName, appearance.classNames?.panelGroup, className)}
    >
      {children === undefined ? (
        <>
          <RangePickerPanel panelViewDate={viewDates[0]} />
          {viewDates[1] ? <RangePickerPanel panelViewDate={viewDates[1]} /> : null}
          {context.showTime ? <DatePickerTimePanel range /> : null}
        </>
      ) : children}
    </div>
  )
}
