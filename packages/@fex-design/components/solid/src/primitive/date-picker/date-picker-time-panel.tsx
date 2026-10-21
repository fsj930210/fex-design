import { For, Match, Show, Switch, splitProps, useContext, type JSX } from 'solid-js'
import { cn } from '@fex-design/utils'
import { getDatePickerTimeColumns } from '@fex-design/core/date-picker/time'
import { datePickerTimePanelClassName } from '@fex-design/components-styles/date-picker'
import {
  TimePickerRoot,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
} from '@fex-design/solid/primitive/time-picker'
import { DatePickerContext, RangePickerContext } from './context'

export interface DatePickerTimePanelProps extends JSX.HTMLAttributes<HTMLDivElement> {
  range?: boolean | undefined
}
export function DatePickerTimePanel(props: DatePickerTimePanelProps) {
  const [local, rest] = splitProps(props, ['range', 'class'])
  const single = useContext(DatePickerContext)
  const interval = useContext(RangePickerContext)
  const owner = () => (local.range ? interval : single)
  const state = owner()
  if (!state) throw new Error('DatePickerTimePanel requires the matching picker root.')
  return (
    <Show when={state.showTime}>
      <div
        {...rest}
        data-slot="date-picker-time-panel"
        class={cn(datePickerTimePanelClassName, local.class)}
      >
        <TimePickerRoot
          value={state.timeValue()}
          format={state.timeOptions.format}
          use12Hours={state.timeOptions.use12Hours}
          disabled={state.disabled}
          disabledTime={state.timeOptions.disabledTime}
          onChange={state.selectTime}
        >
          <TimePickerPanel>
            <For each={getDatePickerTimeColumns(state.timeOptions)}>
              {(column) => (
                <Switch>
                  <Match when={column.unit === 'hour'}>
                    <TimePickerHourColumn step={state.timeOptions.step?.hour} />
                  </Match>
                  <Match when={column.unit === 'minute'}>
                    <TimePickerMinuteColumn step={state.timeOptions.step?.minute} />
                  </Match>
                  <Match when={column.unit === 'second'}>
                    <TimePickerSecondColumn step={state.timeOptions.step?.second} />
                  </Match>
                  <Match when={column.unit === 'period'}>
                    <TimePickerPeriodColumn />
                  </Match>
                </Switch>
              )}
            </For>
          </TimePickerPanel>
        </TimePickerRoot>
      </div>
    </Show>
  )
}
