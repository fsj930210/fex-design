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
} from '@fex-design/react/primitive/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

export function DatePickerFormatExample() {
  const date = createCalendarDate(2026, 10, 15)
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">YYYY/MM/DD</p>
        <DatePickerRoot format={'YYYY/MM/DD'} defaultValue={date}>
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerPanel />
            <DatePickerFooter></DatePickerFooter>
          </DatePickerContent>
        </DatePickerRoot>
        <RangePickerRoot
          format={'YYYY/MM/DD'}
          defaultValue={{ start: date, end: date.add({ days: 7 }) }}
        >
          <RangePickerTrigger />
          <RangePickerContent>
            <RangePickerPanelGroup />
            <DatePickerFooter></DatePickerFooter>
          </RangePickerContent>
        </RangePickerRoot>
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">YYYY/MM</p>
        <DatePickerRoot picker={'month'} format={'YYYY/MM'}>
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerPanel />
            <DatePickerFooter></DatePickerFooter>
          </DatePickerContent>
        </DatePickerRoot>
      </section>
    </div>
  )
}
