import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
  createDatePickerDateTime,
} from '@fex-design/solid/primitive/date-picker'
import type { DatePickerSelectionValue } from '@fex-design/solid/primitive/date-picker'
import { Button } from '@fex-design/solid/ui/button'
import { createSignal } from 'solid-js'

export function DatePickerDateTimeControlledExample() {
  const initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
  const [value, setValue] = createSignal<DatePickerSelectionValue>(initial)
  const [open, setOpen] = createSignal(false)
  return (
    <div class="flex w-full min-w-0 flex-col gap-6">
      <div class="flex flex-wrap gap-2">
        <Button onClick={() => setValue(createDatePickerDateTime(2026, 10, 16, 14, 45, 30))}>
          外部设置 10-16 14:45:30
        </Button>
        <Button onClick={() => setValue(null)}>清空</Button>
        <Button onClick={() => setOpen(true)}>打开</Button>
        <Button onClick={() => setOpen(false)}>关闭</Button>
      </div>
      <DatePickerRoot
        showTime
        value={value()}
        open={open()}
        onChange={setValue}
        onOpenChange={setOpen}
      >
        <DatePickerTrigger />
        <DatePickerContent>
          <DatePickerPanel />
          <DatePickerFooter />
        </DatePickerContent>
      </DatePickerRoot>
      <output class="text-sm text-muted-foreground">
        已提交值：{value()?.toString() ?? '未选择'}
      </output>
    </div>
  )
}
