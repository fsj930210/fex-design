import {
  RangePickerRoot,
  RangePickerTrigger,
  RangePickerContent,
  RangePickerPanelGroup,
  DatePickerFooter,
} from '@fex-design/react/primitive/date-picker'

export function DatePickerAllowEmptyExample() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">结束日期可留空</p>
        <RangePickerRoot
          allowEmpty={{ end: true }}
          needConfirm={true}
          endInputProps={{ placeholder: '至今' }}
        >
          <RangePickerTrigger />
          <RangePickerContent>
            <RangePickerPanelGroup />
            <DatePickerFooter></DatePickerFooter>
          </RangePickerContent>
        </RangePickerRoot>
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">开始日期可留空</p>
        <RangePickerRoot
          allowEmpty={{ start: true }}
          needConfirm={true}
          startInputProps={{ placeholder: '不限开始' }}
        >
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
