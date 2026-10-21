import { filterControlledSelectProps } from '@fex-design/core/select/component-props'
import { getCalendarHeaderState, type CalendarHeaderState } from '@fex-design/core/calendar'
import {
  calendarHeaderClassName,
  calendarHeaderControlsClassName,
  calendarHeaderSelectClassName,
} from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import type { ComponentProps, ReactNode } from 'react'
import { useCalendarContext } from './calendar-context'
import { CalendarNavigationButton } from './calendar-navigation-button'
import { RadioGroup, RadioButton } from '@fex-design/react/primitive/radio'
import { SelectContent, SelectRoot, SelectTrigger } from '@fex-design/react/primitive/select'
export type CalendarHeaderProps = Omit<ComponentProps<'div'>, 'children'> & {
  yearSelectRootProps?:
    | Omit<
        ComponentProps<typeof SelectRoot>,
        | 'children'
        | 'options'
        | 'value'
        | 'defaultValue'
        | 'multiple'
        | 'clearable'
        | 'onChange'
        | 'onUpdate:value'
      >
    | undefined
  monthSelectRootProps?:
    | Omit<
        ComponentProps<typeof SelectRoot>,
        | 'children'
        | 'options'
        | 'value'
        | 'defaultValue'
        | 'multiple'
        | 'clearable'
        | 'onChange'
        | 'onUpdate:value'
      >
    | undefined
  previousButtonProps?:
    | Omit<ComponentProps<typeof CalendarNavigationButton>, 'children' | 'action'>
    | undefined
  nextButtonProps?:
    | Omit<ComponentProps<typeof CalendarNavigationButton>, 'children' | 'action'>
    | undefined
  todayButtonProps?:
    | Omit<ComponentProps<typeof CalendarNavigationButton>, 'children' | 'action'>
    | undefined
  modeGroupProps?:
    | Omit<
        ComponentProps<typeof RadioGroup>,
        'children' | 'value' | 'defaultValue' | 'onValueChange' | 'onUpdate:value'
      >
    | undefined
  dateModeButtonProps?: Omit<ComponentProps<typeof RadioButton>, 'children' | 'value'> | undefined
  monthModeButtonProps?: Omit<ComponentProps<typeof RadioButton>, 'children' | 'value'> | undefined
  yearSelectTriggerProps?: Omit<ComponentProps<typeof SelectTrigger>, 'children'> | undefined
  yearSelectContentProps?: ComponentProps<typeof SelectContent> | undefined
  monthSelectTriggerProps?: Omit<ComponentProps<typeof SelectTrigger>, 'children'> | undefined
  monthSelectContentProps?: ComponentProps<typeof SelectContent> | undefined
  children?: ReactNode | ((state: CalendarHeaderState) => ReactNode)
}
export function CalendarHeader({
  yearSelectRootProps,
  monthSelectRootProps,
  previousButtonProps,
  nextButtonProps,
  todayButtonProps,
  modeGroupProps,
  dateModeButtonProps,
  monthModeButtonProps,
  yearSelectTriggerProps,
  yearSelectContentProps,
  monthSelectTriggerProps,
  monthSelectContentProps,
  children,
  className,
  ...props
}: CalendarHeaderProps) {
  const context = useCalendarContext('CalendarHeader')
  const header = getCalendarHeaderState(context.state, context.controller)
  const setNumber = (
    value: string | number | readonly (string | number)[] | undefined,
    set: (next: number) => void,
  ) => {
    const next = Array.isArray(value) ? value[0] : value
    if (next !== undefined) set(Number(next))
  }
  return (
    <div {...props} data-slot="calendar-header" className={cn(calendarHeaderClassName, className)}>
      {typeof children === 'function' ? (
        children(header)
      ) : children !== undefined ? (
        children
      ) : (
        <div className={calendarHeaderControlsClassName}>
          <CalendarNavigationButton
            {...previousButtonProps}
            action="previous-panel"
            disabled={!header.canPrevious || previousButtonProps?.disabled === true}
            aria-label={header.locale.previous}
          />
          <CalendarNavigationButton
            {...nextButtonProps}
            action="next-panel"
            disabled={!header.canNext || nextButtonProps?.disabled === true}
            aria-label={header.locale.next}
          />
          <CalendarNavigationButton {...todayButtonProps} action="today">
            {header.locale.today}
          </CalendarNavigationButton>
          <SelectRoot
            {...filterControlledSelectProps(yearSelectRootProps)}
            multiple={false}
            clearable={false}
            options={header.years}
            value={header.viewDate.year}
            onChange={(value) => setNumber(value, header.setYear)}
          >
            <SelectTrigger
              {...yearSelectTriggerProps}
              className={cn(calendarHeaderSelectClassName, yearSelectTriggerProps?.className)}
              aria-label={header.locale.year}
            />
            <SelectContent {...yearSelectContentProps} />
          </SelectRoot>
          {header.panel === 'date' && (
            <SelectRoot
              {...filterControlledSelectProps(monthSelectRootProps)}
              multiple={false}
              clearable={false}
              options={header.months}
              value={header.viewDate.month}
              onChange={(value) => setNumber(value, header.setMonth)}
            >
              <SelectTrigger
                {...monthSelectTriggerProps}
                className={cn(calendarHeaderSelectClassName, monthSelectTriggerProps?.className)}
                aria-label={header.locale.month}
              />
              <SelectContent {...monthSelectContentProps} />
            </SelectRoot>
          )}
          <RadioGroup
            {...modeGroupProps}
            className={cn('gap-0', modeGroupProps?.className)}
            value={header.panel}
            aria-label={`${header.locale.datePanel}/${header.locale.monthPanel}`}
            onValueChange={(value) => {
              if (value === 'date' || value === 'month') header.setPanel(value)
            }}
          >
            <RadioButton {...dateModeButtonProps} value="date">
              {header.locale.datePanel}
            </RadioButton>
            <RadioButton {...monthModeButtonProps} value="month">
              {header.locale.monthPanel}
            </RadioButton>
          </RadioGroup>
        </div>
      )}
    </div>
  )
}
