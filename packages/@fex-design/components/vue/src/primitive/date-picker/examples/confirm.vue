<script setup lang="ts">
import {
  DatePickerFooter,
  RangePickerRoot,
  RangePickerTrigger,
  RangePickerContent,
  RangePickerPanelGroup,
} from '@fex-design/vue/primitive/date-picker'
defineOptions({ name: 'DatePickerConfirmExample' })
</script>
<template>
  <div class="flex flex-wrap items-start gap-4">
    <RangePickerRoot :need-confirm="true">
      <RangePickerTrigger> </RangePickerTrigger>
      <RangePickerContent>
        <RangePickerPanelGroup />
        <DatePickerFooter> </DatePickerFooter>
      </RangePickerContent>
    </RangePickerRoot>
  </div>
</template>
