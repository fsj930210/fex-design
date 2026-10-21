<script setup lang="ts">
import { DatePicker, RangePicker } from '@fex-design/vue/ui/date-picker'
import { DatePickerConfirm } from '@fex-design/vue/primitive/date-picker'
defineOptions({ name: 'DatePickerFooterExample' })
</script>
<template>
  <div class="flex flex-wrap items-start gap-4">
    <DatePicker :footer="null"> </DatePicker>
    <DatePicker>
      <template #footer>
        <span>自定义底部</span>
      </template>
    </DatePicker>
    <RangePicker :need-confirm="true">
      <template #footer>
        <DatePickerConfirm>提交范围</DatePickerConfirm>
      </template>
    </RangePicker>
  </div>
</template>
