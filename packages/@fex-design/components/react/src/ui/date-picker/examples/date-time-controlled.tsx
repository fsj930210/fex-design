import { DatePicker, createDatePickerDateTime } from '@fex-design/react/ui/date-picker'
import type { DatePickerSelectionValue } from '@fex-design/react/primitive/date-picker'
import { Button } from '@fex-design/react/ui/button'
import { useState } from 'react'

export function DatePickerDateTimeControlledExample() {
  const initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
  const [value, setValue] = useState<DatePickerSelectionValue>(initial)
  const [open, setOpen] = useState(false)
  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setValue(createDatePickerDateTime(2026, 10, 16, 14, 45, 30))}>
          外部设置 10-16 14:45:30
        </Button>
        <Button onClick={() => setValue(null)}>清空</Button>
        <Button onClick={() => setOpen(true)}>打开</Button>
        <Button onClick={() => setOpen(false)}>关闭</Button>
      </div>
      <DatePicker showTime value={value} open={open} onChange={setValue} onOpenChange={setOpen} />
      <output className="text-sm text-muted-foreground">
        已提交值：{value?.toString() ?? '未选择'}
      </output>
    </div>
  )
}
