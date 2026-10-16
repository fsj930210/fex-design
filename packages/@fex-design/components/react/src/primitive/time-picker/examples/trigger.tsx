import { TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn, TimePickerPeriodColumn } from '@fex-design/react/primitive/time-picker'

export function TimePickerTriggerExample() {
  return (<div className="flex w-full min-w-0 flex-col gap-4"><TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }} ><TimePickerTrigger>{({ props, ref }) => <button {...props} ref={ref} type="button" className="rounded-md border border-border px-3 py-2">选择时间</button>}</TimePickerTrigger><TimePickerPortal><TimePickerContent><TimePickerPanel><TimePickerHourColumn /><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal></TimePickerRoot></div>)
}
