import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter, DatePickerConfirm, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup } from '@fex-design/react/primitive/date-picker'
export function DatePickerFooterExample() {
  
  
  return <div className="flex flex-wrap items-start gap-4">
    <DatePickerRoot ><DatePickerTrigger  /><DatePickerContent><DatePickerPanel /></DatePickerContent></DatePickerRoot><DatePickerRoot ><DatePickerTrigger  /><DatePickerContent><DatePickerPanel /><DatePickerFooter><span>自定义底部</span></DatePickerFooter></DatePickerContent></DatePickerRoot><RangePickerRoot needConfirm><RangePickerTrigger  /><RangePickerContent><RangePickerPanelGroup /><DatePickerFooter><DatePickerConfirm>提交范围</DatePickerConfirm></DatePickerFooter></RangePickerContent></RangePickerRoot>
  </div>
}
