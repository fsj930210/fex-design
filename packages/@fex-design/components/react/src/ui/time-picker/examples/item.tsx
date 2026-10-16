import { TimePicker } from '@fex-design/react/ui/time-picker'
import { TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn } from '@fex-design/react/primitive/time-picker'

export function TimePickerItemExample() {
  return (<div className="flex w-full min-w-0 flex-col gap-4"><TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }}  panelRender={() => <TimePickerPanel><TimePickerHourColumn itemRender={({ item, selected }) => <span>{selected ? "✓ " : ""}{item.label}</span>} /><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel>} /></div>)
}
