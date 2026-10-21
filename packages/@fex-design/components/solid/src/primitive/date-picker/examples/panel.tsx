import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
} from '@fex-design/solid/primitive/date-picker'
export function DatePickerPanelExample() {
  return (
    <div class="flex flex-wrap items-start gap-4">
      <DatePickerRoot>
        <DatePickerTrigger />
        <DatePickerContent>
          <p class="p-2 text-sm">自定义面板容器</p>
          <DatePickerPanel />
          <DatePickerFooter />
        </DatePickerContent>
      </DatePickerRoot>
    </div>
  )
}
