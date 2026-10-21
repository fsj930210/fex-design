import { TimePicker } from '@fex-design/solid/ui/time-picker'

export function TimePickerAppearanceExample() {
  return (
    <div class="flex w-full min-w-0 flex-col gap-4">
      <section class="flex flex-col gap-2 ">
        <p>outlined</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} variant="outlined" />
      </section>
      <section class="flex flex-col gap-2 ">
        <p>filled</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} variant="filled" />
      </section>
      <section class="flex flex-col gap-2 ">
        <p>borderless</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} variant="borderless" />
      </section>
      <section class="flex flex-col gap-2 ">
        <p>underlined</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} variant="underlined" />
      </section>
    </div>
  )
}
