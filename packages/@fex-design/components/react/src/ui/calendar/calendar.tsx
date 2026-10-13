import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import {
  getCalendarUIOptions,
  type CalendarUIOptions,
  type CalendarRenderContext,
  type CalendarCellRenderContext,
  type CalendarSemanticPart,
  type CalendarSemanticValue,
} from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { CalendarRoot } from '../../primitive/calendar'
import { CalendarContent } from './calendar-content'
export type CalendarProps = Omit<
  ComponentProps<'div'>,
  'children' | 'defaultValue' | 'onChange' | 'onSelect'
> &
  CalendarUIOptions & {
    headerRender?: false | ((context: CalendarRenderContext) => ReactNode) | undefined
    cellRender?: ((context: CalendarCellRenderContext) => ReactNode) | undefined
    fullCellRender?: ((context: CalendarCellRenderContext) => ReactNode) | undefined
    footerRender?: ((context: CalendarRenderContext) => ReactNode) | undefined
    classNames?: CalendarSemanticValue<Partial<Record<CalendarSemanticPart, string>>> | undefined
    styles?: CalendarSemanticValue<Partial<Record<CalendarSemanticPart, CSSProperties>>> | undefined
  }
export function Calendar({
  value,
  defaultValue,
  values,
  range,
  viewDate,
  defaultViewDate,
  panel,
  defaultPanel,
  min,
  max,
  today,
  disabledDate,
  weekStartsOn,
  onChange,
  onSelect,
  onPanelChange,
  onViewDateChange,
  onCellSelect,
  onCellHover,
  fullscreen,
  showWeek,
  locale,
  headerRender,
  cellRender,
  fullCellRender,
  footerRender,
  classNames,
  styles,
  className,
  ...attrs
}: CalendarProps) {
  const options = {
    value,
    defaultValue,
    values,
    range,
    viewDate,
    defaultViewDate,
    panel,
    defaultPanel,
    min,
    max,
    today,
    disabledDate,
    weekStartsOn,
    onChange,
    onSelect,
    onPanelChange,
    onViewDateChange,
    onCellSelect,
    onCellHover,
    fullscreen,
    showWeek,
    locale,
  }
  return (
    <CalendarRoot
      {...attrs}
      {...getCalendarUIOptions(options)}
      className={cn(calendarUIRootClassName, className)}
      data-fullscreen={fullscreen !== false}
    >
      <CalendarContent
        options={options}
        headerRender={headerRender}
        cellRender={cellRender}
        fullCellRender={fullCellRender}
        footerRender={footerRender}
        classNames={classNames}
        styles={styles}
      />
    </CalendarRoot>
  )
}
