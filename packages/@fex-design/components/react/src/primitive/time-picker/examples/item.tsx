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

export function TimePickerItemExample() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}>
        <TimePickerTrigger></TimePickerTrigger>
        <TimePickerPortal>
          <TimePickerContent>
            <TimePickerPanel>
              <TimePickerHourColumn
                itemRender={({ item, selected }) => (
                  <span>
                    {selected ? '✓ ' : ''}
                    {item.label}
                  </span>
                )}
              />
              <TimePickerMinuteColumn />
              <TimePickerSecondColumn />
            </TimePickerPanel>
          </TimePickerContent>
        </TimePickerPortal>
      </TimePickerRoot>
    </div>
  )
}
