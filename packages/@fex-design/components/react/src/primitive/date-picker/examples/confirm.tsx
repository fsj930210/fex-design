import {
  DatePickerFooter,
  RangePickerRoot,
  RangePickerTrigger,
  RangePickerContent,
  RangePickerPanelGroup,
} from '@fex-design/react/primitive/date-picker'
export function DatePickerConfirmExample() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <RangePickerRoot needConfirm>
        <RangePickerTrigger />
        <RangePickerContent>
          <RangePickerPanelGroup />
          <DatePickerFooter />
        </RangePickerContent>
      </RangePickerRoot>
    </div>
  )
}
