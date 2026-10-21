import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  RangePickerRoot,
  RangePickerTrigger,
  RangePickerContent,
  RangePickerPanelGroup,
  DatePickerFooter,
} from '@fex-design/solid/primitive/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

export function DatePickerDisabledExample() {
  const date = createCalendarDate(2026, 10, 15)
  const range = { start: date, end: date.add({ days: 7 }) }
  return (
    <div class="flex w-full min-w-0 flex-col gap-4">
      <section class="flex w-full min-w-0 flex-col gap-2">
        <p class="text-sm font-medium">禁用</p>
        <DatePickerRoot disabled={true} defaultValue={date}>
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerPanel />
            <DatePickerFooter></DatePickerFooter>
          </DatePickerContent>
        </DatePickerRoot>
        <RangePickerRoot disabled={true} defaultValue={range}>
          <RangePickerTrigger />
          <RangePickerContent>
            <RangePickerPanelGroup />
            <DatePickerFooter></DatePickerFooter>
          </RangePickerContent>
        </RangePickerRoot>
      </section>
      <section class="flex w-full min-w-0 flex-col gap-2">
        <p class="text-sm font-medium">默认（只读输入，可选择）</p>
        <DatePickerRoot defaultValue={date}>
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerPanel />
            <DatePickerFooter></DatePickerFooter>
          </DatePickerContent>
        </DatePickerRoot>
        <RangePickerRoot defaultValue={range}>
          <RangePickerTrigger />
          <RangePickerContent>
            <RangePickerPanelGroup />
            <DatePickerFooter></DatePickerFooter>
          </RangePickerContent>
        </RangePickerRoot>
      </section>
    </div>
  )
}
