import { DatePickerFooter, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup } from '@fex-design/solid/primitive/date-picker'
import { getCalendarToday } from '@fex-design/core/calendar'
export function DatePickerRangeExample() {
  const today = getCalendarToday()
  
  return <div class="flex flex-wrap items-start gap-4">
    <RangePickerRoot defaultValue={{ start: today, end: today.add({ days: 7 }) }}><RangePickerTrigger  /><RangePickerContent><RangePickerPanelGroup /><DatePickerFooter /></RangePickerContent></RangePickerRoot>
  </div>
}
