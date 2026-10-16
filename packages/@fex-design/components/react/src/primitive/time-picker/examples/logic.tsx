import { useTimePicker } from '@fex-design/react/primitive/time-picker'

export function TimePickerLogicExample() {
  const { controller, snapshot } = useTimePicker({ defaultValue: { hour: 9, minute: 30, second: 0 } })
  return (<div className="flex w-full min-w-0 flex-col gap-4"><div className="flex items-center gap-3"><button type="button" onClick={() => controller.selectHour(12)}>选择 12 时</button><output>{snapshot.inputValue}</output></div></div>)
}
