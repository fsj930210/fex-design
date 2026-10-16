import { DatePickerFooter, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup } from '@fex-design/react/primitive/date-picker'
import { getCalendarToday } from '@fex-design/core/calendar'
export function DatePickerRangeExample() {
  const today = getCalendarToday()
  
  return <div className="flex flex-wrap items-start gap-4">
    <RangePickerRoot defaultValue={{ start: today, end: today.add({ days: 7 }) }}><RangePickerTrigger  /><RangePickerContent><RangePickerPanelGroup /><DatePickerFooter /></RangePickerContent></RangePickerRoot>
  </div>
}
