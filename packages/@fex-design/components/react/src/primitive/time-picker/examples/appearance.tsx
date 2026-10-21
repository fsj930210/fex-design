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

export function TimePickerAppearanceExample() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <section className="flex flex-col gap-2 ">
        <p>outlined</p>
        <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}>
          <TimePickerTrigger variant="outlined"></TimePickerTrigger>
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
      <section className="flex flex-col gap-2 ">
        <p>filled</p>
        <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}>
          <TimePickerTrigger variant="filled"></TimePickerTrigger>
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
      <section className="flex flex-col gap-2 ">
        <p>borderless</p>
        <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}>
          <TimePickerTrigger variant="borderless"></TimePickerTrigger>
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
      <section className="flex flex-col gap-2 ">
        <p>underlined</p>
        <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}>
          <TimePickerTrigger variant="underlined"></TimePickerTrigger>
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
