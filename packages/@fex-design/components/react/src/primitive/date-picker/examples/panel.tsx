import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter } from '@fex-design/react/primitive/date-picker'
export function DatePickerPanelExample() {
  
  
  return <div className="flex flex-wrap items-start gap-4">
    <DatePickerRoot><DatePickerTrigger /><DatePickerContent><p className="p-2 text-sm">自定义面板容器</p><DatePickerPanel /><DatePickerFooter /></DatePickerContent></DatePickerRoot>
  </div>
}
