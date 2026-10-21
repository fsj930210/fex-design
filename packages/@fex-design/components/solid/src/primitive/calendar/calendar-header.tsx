import { filterControlledSelectProps } from '@fex-design/core/select/component-props'
import { createMemo, splitProps, type ComponentProps, type JSX } from 'solid-js'
import { getCalendarHeaderState, type CalendarHeaderState } from '@fex-design/core/calendar'
import {
  calendarHeaderClassName,
  calendarHeaderControlsClassName,
  calendarHeaderSelectClassName,
} from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { useCalendarContext } from './calendar-context'
import { CalendarNavigationButton } from './calendar-navigation-button'
import { RadioGroup, RadioButton } from '../radio'
import { SelectContent, SelectRoot, SelectTrigger } from '../select'
export type CalendarHeaderProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
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
  children?: JSX.Element | ((state: CalendarHeaderState) => JSX.Element)
}
export function CalendarHeader(props: CalendarHeaderProps) {
  const [local, rest] = splitProps(props, [
    'yearSelectRootProps',
    'monthSelectRootProps',
    'previousButtonProps',
    'nextButtonProps',
    'todayButtonProps',
    'modeGroupProps',
    'dateModeButtonProps',
    'monthModeButtonProps',
    'yearSelectTriggerProps',
    'yearSelectContentProps',
    'monthSelectTriggerProps',
    'monthSelectContentProps',
    'children',
    'class',
  ])
  const context = useCalendarContext('CalendarHeader')
  const header = createMemo(() => getCalendarHeaderState(context.state(), context.controller))
  const setNumber = (
    value: string | number | readonly (string | number)[] | undefined,
    set: (next: number) => void,
  ) => {
    const next = Array.isArray(value) ? value[0] : value
    if (next !== undefined) set(Number(next))
  }
  return (
    <div {...rest} data-slot="calendar-header" class={cn(calendarHeaderClassName, local.class)}>
      {typeof local.children === 'function' ? (
        local.children(header())
      ) : local.children !== undefined ? (
        local.children
      ) : (
        <div class={calendarHeaderControlsClassName}>
          <CalendarNavigationButton
            {...local.previousButtonProps}
            action="previous-panel"
            disabled={!header().canPrevious || local.previousButtonProps?.disabled === true}
            aria-label={header().locale.previous}
          />
          <CalendarNavigationButton
            {...local.nextButtonProps}
            action="next-panel"
            disabled={!header().canNext || local.nextButtonProps?.disabled === true}
            aria-label={header().locale.next}
          />
          <CalendarNavigationButton {...local.todayButtonProps} action="today">
            {header().locale.today}
          </CalendarNavigationButton>
          <SelectRoot
            {...filterControlledSelectProps(local.yearSelectRootProps)}
            multiple={false}
            clearable={false}
            options={header().years}
            value={header().viewDate.year}
            onChange={(value) => setNumber(value, header().setYear)}
          >
            <SelectTrigger
              {...local.yearSelectTriggerProps}
              class={cn(calendarHeaderSelectClassName, local.yearSelectTriggerProps?.class)}
              aria-label={header().locale.year}
            />
            <SelectContent {...local.yearSelectContentProps} />
          </SelectRoot>
          {header().panel === 'date' && (
            <SelectRoot
              {...filterControlledSelectProps(local.monthSelectRootProps)}
              multiple={false}
              clearable={false}
              options={header().months}
              value={header().viewDate.month}
              onChange={(value) => setNumber(value, header().setMonth)}
            >
              <SelectTrigger
                {...local.monthSelectTriggerProps}
                class={cn(calendarHeaderSelectClassName, local.monthSelectTriggerProps?.class)}
                aria-label={header().locale.month}
              />
              <SelectContent {...local.monthSelectContentProps} />
            </SelectRoot>
          )}
          <RadioGroup
            {...local.modeGroupProps}
            class={cn('gap-0', local.modeGroupProps?.class)}
            value={header().panel}
            aria-label={`${header().locale.datePanel}/${header().locale.monthPanel}`}
            onValueChange={(value) => {
              if (value === 'date' || value === 'month') header().setPanel(value)
            }}
          >
            <RadioButton {...local.dateModeButtonProps} value="date">
              {header().locale.datePanel}
            </RadioButton>
            <RadioButton {...local.monthModeButtonProps} value="month">
              {header().locale.monthPanel}
            </RadioButton>
          </RadioGroup>
        </div>
      )}
    </div>
  )
}
