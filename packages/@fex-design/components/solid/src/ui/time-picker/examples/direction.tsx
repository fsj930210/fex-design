import { TimePicker } from '@fex-design/solid/ui/time-picker'

export function TimePickerDirectionExample() {
  return (
    <div class="flex w-full min-w-0 flex-col gap-4">
      <div class="grid gap-4">
        <div dir="ltr">
          <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} />
        </div>
        <div dir="rtl">
          <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} />
        </div>
      </div>
    </div>
  )
}
