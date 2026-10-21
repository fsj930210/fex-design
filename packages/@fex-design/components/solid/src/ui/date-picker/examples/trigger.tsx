import { DatePicker } from '@fex-design/solid/ui/date-picker'

export function DatePickerTriggerExample() {
  return (
    <div class="flex flex-wrap items-start gap-4">
      <DatePicker
        triggerRender={({ props, ref, state }) => (
          <button {...props} ref={ref} type="button">
            {state.displayValue() || '选择日期'}
          </button>
        )}
      />
    </div>
  )
}
