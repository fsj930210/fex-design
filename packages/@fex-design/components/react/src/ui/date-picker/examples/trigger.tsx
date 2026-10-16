import { DatePicker } from '@fex-design/react/ui/date-picker'

export function DatePickerTriggerExample() {
  
  
  return <div className="flex flex-wrap items-start gap-4">
    <DatePicker  triggerRender={({ props, ref, state }) => <button {...props} ref={ref} type="button">{state.displayValue || '选择日期'}</button>} />
  </div>
}
