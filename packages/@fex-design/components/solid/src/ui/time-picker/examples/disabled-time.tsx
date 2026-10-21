import { TimePicker } from '@fex-design/solid/ui/time-picker'

export function TimePickerDisabledTimeExample() {
  const disabledTime = () => ({
    disabledHours: () => [0, 1, 2],
    disabledMinutes: (hour: number) => (hour === 9 ? [15, 45] : []),
  })
  return (
    <div class="flex w-full min-w-0 flex-col gap-4">
      <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} disabledTime={disabledTime} />
    </div>
  )
}
