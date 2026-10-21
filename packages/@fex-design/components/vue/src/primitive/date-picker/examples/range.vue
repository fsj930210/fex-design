<script setup lang="ts">
import {
  DatePickerFooter,
  RangePickerRoot,
  RangePickerTrigger,
  RangePickerContent,
  RangePickerPanelGroup,
} from '@fex-design/vue/primitive/date-picker'
import { getCalendarToday } from '@fex-design/core/calendar'
const today = getCalendarToday()
defineOptions({ name: 'DatePickerRangeExample' })
</script>
<template>
  <div class="flex flex-wrap items-start gap-4">
    <RangePickerRoot :default-value="{ start: today, end: today.add({ days: 7 }) }">
      <RangePickerTrigger> </RangePickerTrigger>
      <RangePickerContent>
        <RangePickerPanelGroup />
        <DatePickerFooter> </DatePickerFooter>
      </RangePickerContent>
    </RangePickerRoot>
  </div>
</template>
