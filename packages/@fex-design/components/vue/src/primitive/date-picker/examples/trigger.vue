<script setup lang="ts">
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter } from '@fex-design/vue/primitive/date-picker'
defineOptions({ name: 'DatePickerTriggerExample' })

</script>
<template>
<div class="flex flex-wrap items-start gap-4">
  <DatePickerRoot >
  <DatePickerTrigger>
  <template #default="{ props, ref, state }">
  <button v-bind="props" :ref="ref" type="button">{{ state.displayValue.value || '选择日期' }}</button>
  </template>
  </DatePickerTrigger>
  <DatePickerContent>
  <DatePickerPanel />
  <DatePickerFooter>
  </DatePickerFooter>
  </DatePickerContent>
  </DatePickerRoot>
</div>
</template>
