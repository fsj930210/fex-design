import { TimePicker } from '@fex-design/solid/ui/time-picker'

export function TimePickerBasicExample() {
  return (<div class="flex w-full min-w-0 flex-col gap-4"><TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }}  /></div>)
}
