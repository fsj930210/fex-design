import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
} from '@fex-design/react/primitive/date-picker'
export function DatePickerTriggerExample() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <DatePickerRoot>
        <DatePickerTrigger
          children={({ props, ref, state }) => (
            <button {...props} ref={ref} type="button">
              {state.displayValue || '选择日期'}
            </button>
          )}
        />
        <DatePickerContent>
          <DatePickerPanel />
          <DatePickerFooter />
        </DatePickerContent>
      </DatePickerRoot>
    </div>
  )
}
