import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
} from '@fex-design/react/primitive/time-picker'

export function TimePickerAffixesExample() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <section className="grid gap-2">
        <p>默认时钟后缀</p>
        <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}>
          <TimePickerTrigger></TimePickerTrigger>
          <TimePickerPortal>
            <TimePickerContent>
              <TimePickerPanel>
                <TimePickerHourColumn />
                <TimePickerMinuteColumn />
                <TimePickerSecondColumn />
              </TimePickerPanel>
            </TimePickerContent>
          </TimePickerPortal>
        </TimePickerRoot>
      </section>
      <section className="grid gap-2">
        <p>自定义前缀与后缀</p>
        <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}>
          <TimePickerTrigger prefix="预约" suffix="时"></TimePickerTrigger>
          <TimePickerPortal>
            <TimePickerContent>
              <TimePickerPanel>
                <TimePickerHourColumn />
                <TimePickerMinuteColumn />
                <TimePickerSecondColumn />
              </TimePickerPanel>
            </TimePickerContent>
          </TimePickerPortal>
        </TimePickerRoot>
      </section>
      <section className="grid gap-2">
        <p>自定义时区后缀</p>
        <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}>
          <TimePickerTrigger prefix="时间" suffix="UTC"></TimePickerTrigger>
          <TimePickerPortal>
            <TimePickerContent>
              <TimePickerPanel>
                <TimePickerHourColumn />
                <TimePickerMinuteColumn />
                <TimePickerSecondColumn />
              </TimePickerPanel>
            </TimePickerContent>
          </TimePickerPortal>
        </TimePickerRoot>
      </section>
    </div>
  )
}
