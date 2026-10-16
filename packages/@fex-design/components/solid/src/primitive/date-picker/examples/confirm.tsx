import { DatePickerFooter, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup } from '@fex-design/solid/primitive/date-picker'
export function DatePickerConfirmExample() {
  
  
  return <div class="flex flex-wrap items-start gap-4">
    <RangePickerRoot needConfirm><RangePickerTrigger  /><RangePickerContent><RangePickerPanelGroup /><DatePickerFooter /></RangePickerContent></RangePickerRoot>
  </div>
}
