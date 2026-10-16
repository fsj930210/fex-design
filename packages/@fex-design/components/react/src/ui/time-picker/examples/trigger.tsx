import { TimePicker } from '@fex-design/react/ui/time-picker'

export function TimePickerTriggerExample() {
  return (<div className="flex w-full min-w-0 flex-col gap-4"><TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }}  triggerRender={({ props, ref }) => <button {...props} ref={ref} type="button" className="rounded-md border border-border px-3 py-2">选择时间</button>} /></div>)
}
