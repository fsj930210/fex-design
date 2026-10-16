import { DatePicker, RangePicker } from '@fex-design/react/ui/date-picker'
import { DatePickerConfirm } from '@fex-design/react/primitive/date-picker'
export function DatePickerFooterExample() {
  
  
  return <div className="flex flex-wrap items-start gap-4">
    <DatePicker  footer={null} /><DatePicker  footer={<span>自定义底部</span>} /><RangePicker needConfirm footer={<DatePickerConfirm>提交范围</DatePickerConfirm>} />
  </div>
}
