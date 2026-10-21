import { TimePicker } from '@fex-design/solid/ui/time-picker'

export function TimePickerSizesExample() {
  return (
    <div class="flex w-full min-w-0 flex-col gap-4">
      <section class="flex flex-col gap-2 ">
        <p>小号 sm</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} size="sm" />
      </section>
      <section class="flex flex-col gap-2 ">
        <p>默认 md</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} size="md" />
      </section>
      <section class="flex flex-col gap-2 ">
        <p>大号 lg</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} size="lg" />
      </section>
    </div>
  )
}
