import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
} from '@fex-design/react/primitive/date-picker'
export function DatePickerContainerExample() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <DatePickerRoot
        defaultOpen
        containerRender={(content, state) => (
          <div
            className="flex flex-col items-start gap-2 data-[open=false]:[&_[data-slot=date-picker-content]]:hidden"
            data-open={state.open ? 'true' : 'false'}
          >
            {content}
          </div>
        )}
      >
        <DatePickerTrigger />
        <DatePickerContent>
          <DatePickerPanel />
          <DatePickerFooter />
        </DatePickerContent>
      </DatePickerRoot>
    </div>
  )
}
