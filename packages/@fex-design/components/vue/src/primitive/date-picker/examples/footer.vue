<script setup lang="ts">
import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
  DatePickerConfirm,
  RangePickerRoot,
  RangePickerTrigger,
  RangePickerContent,
  RangePickerPanelGroup,
} from '@fex-design/vue/primitive/date-picker'
defineOptions({ name: 'DatePickerFooterExample' })
</script>
<template>
  <div class="flex flex-wrap items-start gap-4">
    <DatePickerRoot>
      <DatePickerTrigger> </DatePickerTrigger>
      <DatePickerContent>
        <DatePickerPanel />
      </DatePickerContent>
    </DatePickerRoot>
    <DatePickerRoot>
      <DatePickerTrigger> </DatePickerTrigger>
      <DatePickerContent>
        <DatePickerPanel />
        <DatePickerFooter>
          <span>自定义底部</span>
        </DatePickerFooter>
      </DatePickerContent>
    </DatePickerRoot>
    <RangePickerRoot :need-confirm="true">
      <RangePickerTrigger> </RangePickerTrigger>
      <RangePickerContent>
        <RangePickerPanelGroup />
        <DatePickerFooter>
          <DatePickerConfirm>提交范围</DatePickerConfirm>
        </DatePickerFooter>
      </RangePickerContent>
    </RangePickerRoot>
  </div>
</template>
