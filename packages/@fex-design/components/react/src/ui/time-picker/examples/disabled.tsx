import { TimePicker } from '@fex-design/react/ui/time-picker'

export function TimePickerDisabledExample() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <div className="grid gap-4">
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} disabled />
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} readOnly />
      </div>
    </div>
  )
}
