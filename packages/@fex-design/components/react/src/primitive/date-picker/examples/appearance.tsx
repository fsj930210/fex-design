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

export function DatePickerAppearanceExample() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">outlined</p>
        <DatePickerRoot inputProps={{ variant: 'outlined' }}>
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerPanel />
            <DatePickerFooter></DatePickerFooter>
          </DatePickerContent>
        </DatePickerRoot>
        <RangePickerRoot inputProps={{ variant: 'outlined' }}>
          <RangePickerTrigger />
          <RangePickerContent>
            <RangePickerPanelGroup />
            <DatePickerFooter></DatePickerFooter>
          </RangePickerContent>
        </RangePickerRoot>
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">filled</p>
        <DatePickerRoot inputProps={{ variant: 'filled' }}>
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerPanel />
            <DatePickerFooter></DatePickerFooter>
          </DatePickerContent>
        </DatePickerRoot>
        <RangePickerRoot inputProps={{ variant: 'filled' }}>
          <RangePickerTrigger />
          <RangePickerContent>
            <RangePickerPanelGroup />
            <DatePickerFooter></DatePickerFooter>
          </RangePickerContent>
        </RangePickerRoot>
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">borderless</p>
        <DatePickerRoot inputProps={{ variant: 'borderless' }}>
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerPanel />
            <DatePickerFooter></DatePickerFooter>
          </DatePickerContent>
        </DatePickerRoot>
        <RangePickerRoot inputProps={{ variant: 'borderless' }}>
          <RangePickerTrigger />
          <RangePickerContent>
            <RangePickerPanelGroup />
            <DatePickerFooter></DatePickerFooter>
          </RangePickerContent>
        </RangePickerRoot>
      </section>
      <section className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-medium">underlined</p>
        <DatePickerRoot inputProps={{ variant: 'underlined' }}>
          <DatePickerTrigger />
          <DatePickerContent>
            <DatePickerPanel />
            <DatePickerFooter></DatePickerFooter>
          </DatePickerContent>
        </DatePickerRoot>
        <RangePickerRoot inputProps={{ variant: 'underlined' }}>
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
