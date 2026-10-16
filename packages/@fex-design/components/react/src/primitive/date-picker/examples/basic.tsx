import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter } from '@fex-design/react/primitive/date-picker'
export function DatePickerBasicExample() {
  
  
  return <div className="flex w-full min-w-0 flex-col items-stretch gap-4">
    <DatePickerRoot><DatePickerTrigger className="w-full min-w-0" placeholder="请选择日期"  /><DatePickerContent><DatePickerPanel /><DatePickerFooter /></DatePickerContent></DatePickerRoot><DatePickerRoot multiple><DatePickerTrigger className="w-full min-w-0"  /><DatePickerContent><DatePickerPanel /><DatePickerFooter /></DatePickerContent></DatePickerRoot>
  </div>
}
