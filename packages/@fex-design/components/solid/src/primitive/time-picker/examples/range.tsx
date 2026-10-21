import { createSignal } from 'solid-js'
import { format } from '@fex-design/core/date/utils'
import type { TimeRangeValue } from '@fex-design/solid/primitive/time-picker'
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
} from '@fex-design/solid/primitive/time-picker'
const initial: TimeRangeValue = [
  { hour: 9, minute: 30, second: 0 },
  { hour: 17, minute: 30, second: 0 },
]
const display = (value: TimeRangeValue | null) =>
  value ? `${format(value[0], 'HH:mm:ss')} → ${format(value[1], 'HH:mm:ss')}` : '未选择'

export function TimePickerRangeExample() {
  const [confirmed, setConfirmed] = createSignal<TimeRangeValue | null>(initial)
  const [immediate, setImmediate] = createSignal<TimeRangeValue | null>(initial)
  return (
    <div class="grid w-full gap-6">
      <section class="grid gap-2">
        <p>默认确认后提交</p>
        <TimeRangePickerRoot defaultValue={initial} onChange={setConfirmed}>
          <TimeRangePickerTrigger />
          <TimePickerPortal>
            <TimePickerContent>
              <TimePickerPanel>
                <TimePickerHourColumn />
                <TimePickerMinuteColumn />
                <TimePickerSecondColumn />
              </TimePickerPanel>
              <TimeRangePickerFooter />
            </TimePickerContent>
          </TimePickerPortal>
        </TimeRangePickerRoot>
        <output aria-live="polite">已提交：{display(confirmed())}</output>
      </section>
      <section class="grid gap-2">
        <p>关闭确认，完整有效区间即时提交</p>
        <TimeRangePickerRoot defaultValue={initial} needConfirm={false} onChange={setImmediate}>
          <TimeRangePickerTrigger />
          <TimePickerPortal>
            <TimePickerContent>
              <TimePickerPanel>
                <TimePickerHourColumn />
                <TimePickerMinuteColumn />
                <TimePickerSecondColumn />
              </TimePickerPanel>
              <TimeRangePickerFooter />
            </TimePickerContent>
          </TimePickerPortal>
        </TimeRangePickerRoot>
        <output aria-live="polite">已提交：{display(immediate())}</output>
      </section>
    </div>
  )
}
