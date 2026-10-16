import { DatePicker } from '@fex-design/solid/ui/date-picker'

export function DatePickerBasicExample() {
  
  
  return <div class="flex w-full min-w-0 flex-col items-stretch gap-4">
    <DatePicker class="w-full min-w-0" placeholder="请选择日期"  /><DatePicker class="w-full min-w-0" multiple  />
  </div>
}
