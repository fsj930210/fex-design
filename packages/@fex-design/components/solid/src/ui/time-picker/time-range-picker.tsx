import type { TimePickerProps } from './time-picker'
import type { ComponentProps } from 'solid-js'
import { analyzeTimeFormat } from '@fex-design/core/date/utils'
import {
  TimeRangePickerRoot,
  TimeRangePickerTrigger,
  TimeRangePickerFooter,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
  type TimeRangePickerRootProps,
  type TimeRangePickerTriggerProps,
} from '@fex-design/solid/primitive/time-picker'
import { createMemo, For, Switch, Match, splitProps } from 'solid-js'

export type TimeRangePickerProps = Omit<TimeRangePickerRootProps, 'children'> &
  TimeRangePickerTriggerProps &
  Pick<
    TimePickerProps,
    | 'contentProps'
    | 'panelProps'
    | 'hourColumnProps'
    | 'minuteColumnProps'
    | 'secondColumnProps'
    | 'periodColumnProps'
  > & {
    footerProps?: ComponentProps<typeof TimeRangePickerFooter> | undefined
    step?: { hour?: number; minute?: number; second?: number } | undefined
  }
export function TimeRangePicker(props: TimeRangePickerProps) {
  const [local, rest] = splitProps(props, [
    'contentProps',
    'panelProps',
    'hourColumnProps',
    'minuteColumnProps',
    'secondColumnProps',
    'periodColumnProps',
    'footerProps',
  ])
  const columns = createMemo(
    () =>
      analyzeTimeFormat(
        props.format ?? (props.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'),
        props.use12Hours,
      ).columns,
  )
  return (
    <TimeRangePickerRoot {...rest}>
      <TimeRangePickerTrigger {...rest} />
      <TimePickerPortal>
        <TimePickerContent {...local.contentProps}>
          <TimePickerPanel {...local.panelProps}>
            <For each={columns()}>
              {(column) => (
                <Switch>
                  <Match when={column.unit === 'hour'}>
                    <TimePickerHourColumn step={props.step?.hour} {...local.hourColumnProps} />
                  </Match>
                  <Match when={column.unit === 'minute'}>
                    <TimePickerMinuteColumn
                      step={props.step?.minute}
                      {...local.minuteColumnProps}
                    />
                  </Match>
                  <Match when={column.unit === 'second'}>
                    <TimePickerSecondColumn
                      step={props.step?.second}
                      {...local.secondColumnProps}
                    />
                  </Match>
                  <Match when={column.unit === 'period'}>
                    <TimePickerPeriodColumn {...local.periodColumnProps} />
                  </Match>
                </Switch>
              )}
            </For>
          </TimePickerPanel>
          <TimeRangePickerFooter {...local.footerProps} />
        </TimePickerContent>
      </TimePickerPortal>
    </TimeRangePickerRoot>
  )
}
