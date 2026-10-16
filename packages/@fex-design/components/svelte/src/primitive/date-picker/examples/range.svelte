<script lang="ts">
import { DatePickerFooter, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup } from '@fex-design/svelte/primitive/date-picker'
import { getCalendarToday } from '@fex-design/core/calendar'
const today = getCalendarToday()

</script>
<div class="flex flex-wrap items-start gap-4">
  <RangePickerRoot defaultValue={{ start: today, end: today.add({ days: 7 }) }}>
  <RangePickerTrigger>
  </RangePickerTrigger>
  <RangePickerContent>
  <RangePickerPanelGroup />
  <DatePickerFooter>
  </DatePickerFooter>
  </RangePickerContent>
  </RangePickerRoot>
</div>
