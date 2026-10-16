import { DatePicker } from '@fex-design/react/ui/date-picker'

export function DatePickerBasicExample() {
  
  
  return <div className="flex w-full min-w-0 flex-col items-stretch gap-4">
    <DatePicker className="w-full min-w-0" placeholder="请选择日期"  /><DatePicker className="w-full min-w-0" multiple  />
  </div>
}
