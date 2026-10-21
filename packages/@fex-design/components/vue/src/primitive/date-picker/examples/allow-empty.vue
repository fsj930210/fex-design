<script setup lang="ts">
import {
  RangePickerRoot,
  RangePickerTrigger,
  RangePickerContent,
  RangePickerPanelGroup,
  DatePickerFooter,
} from '@fex-design/vue/primitive/date-picker'
defineOptions({ name: 'DatePickerAllowEmptyExample' })
</script>
<template>
  <div class="flex w-full min-w-0 flex-col gap-4">
    <section class="flex w-full min-w-0 flex-col gap-2">
      <p class="text-sm font-medium">结束日期可留空</p>
      <RangePickerRoot
        :allow-empty="{ end: true }"
        :need-confirm="true"
        :end-input-props="{ placeholder: '至今' }"
      >
        <RangePickerTrigger />
        <RangePickerContent>
          <RangePickerPanelGroup />
          <DatePickerFooter></DatePickerFooter>
        </RangePickerContent>
      </RangePickerRoot>
    </section>
    <section class="flex w-full min-w-0 flex-col gap-2">
      <p class="text-sm font-medium">开始日期可留空</p>
      <RangePickerRoot
        :allow-empty="{ start: true }"
        :need-confirm="true"
        :start-input-props="{ placeholder: '不限开始' }"
      >
        <RangePickerTrigger />
        <RangePickerContent>
          <RangePickerPanelGroup />
          <DatePickerFooter></DatePickerFooter>
        </RangePickerContent>
      </RangePickerRoot>
    </section>
  </div>
</template>
